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
export const inject = ["connection", "credentials", "skills", "tools"];
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
  const mcpConfig = {
    transport: "stdio",
    command: process.execPath,
    args: [bridgePath],
    env: {
      CAIDAZI_API_KEY: "${credential:CAIDAZI_API_KEY}",
      CAIDAZI_TIMEOUT_MS: "90000",
      CAIDAZI_MCP_NO_UPDATE_NOTIFIER: "1",
      ...(process.versions.electron ? { ELECTRON_RUN_AS_NODE: "1" } : {}),
    },
    toolCallTimeoutMs: 100000,
    startupTimeoutMs: 30000,
  };
  const manager = ctx.get("mcpManager");
  if (manager) {
    ctx.effect(() => manager.register("caidazi-boards", mcpConfig), "caidazi MCP");
  } else {
    // rc.1 has the official MCP client but no manager. Use the host's own
    // package to keep Cordis and service versions aligned with the runtime.
    const client = await ctx.get("loader").import("@deepseek-ai/dsh-mcp-client");
    let child;
    let stopped = false;
    let tail = Promise.resolve();
    const sync = () => {
      tail = tail.catch(() => {}).then(async () => {
        if (stopped) return;
        if (child) {
          await child.dispose();
          child = undefined;
        }
        const key = await ctx.credentials.resolve("CAIDAZI_API_KEY");
        if (stopped || !key?.value) return;
        // Runtime-only config; no resolved secret is written to cordis.yml.
        child = ctx.plugin(client, {
          ...mcpConfig,
          serverName: "caidazi-boards",
          env: { ...mcpConfig.env, CAIDAZI_API_KEY: key.value },
        });
        await child.await();
      });
      return tail;
    };
    ctx.on("credentials/reference-updated", (ref) => {
      if (ref === "CAIDAZI_API_KEY")
        return sync().catch(() => ctx.logger.warn("财搭子 MCP 连接失败，请重新连接"));
    });
    ctx.effect(() => async () => {
      stopped = true;
      await tail.catch(() => {});
      await child?.dispose();
    }, "caidazi MCP cleanup");
    await sync();
  }
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
            if (raw.length > 4096) return new Response("too large", { status: 413 });
            body = JSON.parse(raw);
          } catch {
            return new Response("invalid json", { status: 400 });
          }
          if (body?.type !== "client-request" || body.method !== "caidazi-boards" ||
              typeof body.rpcId !== "string" || body.rpcId.length > 128)
            return new Response("invalid request", { status: 400 });
          const result = await handle(body.payload?.action, body.payload?.payload, request.signal);
          return Response.json({ type: "server-response", rpcId: body.rpcId, result }, {
            headers: { "Cache-Control": "no-store" },
          });
        },
      }),
    "caidazi board API",
  );
}
