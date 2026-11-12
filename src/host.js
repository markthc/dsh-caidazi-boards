import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { boards } from "./boards.js";
import {
  mcpRoot,
  bridgePath,
  loadBoard,
  verifyKey,
  safeError,
  DataError,
} from "./data.js";
export const name = "caidazi-boards";
export const inject = ["connection", "credentials", "skills", "mcpManager"];
export async function apply(ctx) {
  for (const folder of (await readdir(mcpRoot)).filter((n) =>
    n.startsWith("caidazi-"),
  )) {
    const path = join(mcpRoot, folder);
    const text = await readFile(join(path, "SKILL.md"), "utf8");
    if (await ctx.skills.get(folder)) continue;
    ctx.skills.register({
      name: folder,
      description: text.match(/^description: (.+)$/m)?.[1] || folder,
      content: text.replace(/^---\n[\s\S]*?\n---\n/, ""),
      source: "runtime",
      resourceBase: { kind: "directory", path },
    });
  }
  ctx.effect(
    () =>
      ctx.mcpManager.register("caidazi-boards", {
        transport: "stdio",
        command: process.execPath,
        args: [bridgePath],
        env: {
          CAIDAZI_API_KEY: "${credential:CAIDAZI_API_KEY}",
          CAIDAZI_TIMEOUT_MS: "90000",
          CAIDAZI_MCP_NO_UPDATE_NOTIFIER: "1",
        },
        toolCallTimeoutMs: 100000,
        startupTimeoutMs: 30000,
      }),
    "caidazi MCP",
  );
  // Only owner peers may connect a personal key or invoke this fixed public-data surface.
  let connecting = false;
  const running = new Map();
  const handle = async (endpoint, payload, signal) => {
    try {
      const action = endpoint;
      if (action === "status") {
        const key = await ctx.credentials.resolve("CAIDAZI_API_KEY");
        return { ok: true, value: { configured: !!key?.value, boards } };
      }
      if (action === "connect") {
        const key = payload?.key;
        if (
          typeof key !== "string" ||
          key.length < 8 ||
          key.length > 512 ||
          /\s/.test(key)
        )
          throw new DataError("input", "请粘贴完整的 API Key");
        if (connecting) throw new DataError("busy", "正在验证连接，请稍候");
        connecting = true;
        try {
          await verifyKey(key, signal);
          await ctx.credentials.set("CAIDAZI_API_KEY", key);
          return { ok: true, value: { connected: true } };
        } finally {
          connecting = false;
        }
      }
      if (action === "refresh") {
        const id = payload?.id;
        if (!boards.some((b) => b.id === id))
          throw new DataError("input", "找不到这个看板");
        if (running.has(id))
          throw new DataError("busy", "这个看板正在更新，请稍候");
        const key = await ctx.credentials.resolve("CAIDAZI_API_KEY");
        const task = loadBoard(id, key?.value, signal);
        running.set(id, task);
        try {
          return { ok: true, value: await task };
        } finally {
          running.delete(id);
        }
      }
      throw new DataError("input", "此操作不可用");
    } catch (e) {
      return { ok: false, error: { ...safeError(e), details: {} } };
    }
  };
  ctx.effect(
    () =>
      ctx.connection.fetch.register({
        path: "/api/caidazi-boards",
        methods: ["POST"],
        requestBody: "buffered",
        fetch: async (request) => {
          let body;
          try {
            const raw = await request.text();
            if (raw.length > 2048)
              return new Response("too large", { status: 413 });
            body = JSON.parse(raw);
          } catch {
            return new Response("invalid json", { status: 400 });
          }
          const result = await handle(
            body?.action,
            body?.payload,
            request.signal,
          );
          return Response.json(result, {
            headers: { "Cache-Control": "no-store" },
          });
        },
      }),
    "caidazi board API",
  );
}
