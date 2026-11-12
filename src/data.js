import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { boards } from "./boards.js";
import { loadCandles } from "./market.js";
const require = createRequire(import.meta.url);
export const mcpRoot = dirname(require.resolve("@caidazi/mcp/package.json"));
// Resolve the published executable without relying on an ambient npx or global install.
export const bridgePath = join(mcpRoot, "bin/caidazi-mcp.js");
export class DataError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
export function resultText(result) {
  return (result?.content || [])
    .filter((x) => x.type === "text")
    .map((x) => x.text)
    .join("\n");
}
export function decode(result) {
  const text = resultText(result);
  if (result?.isError) {
    if (/401|API_KEY_INVALID|UNAUTHORIZED/i.test(text))
      throw new DataError("auth", "Key 无效或已失效，请重新连接财搭子");
    if (/403|quota|额度|402|429/i.test(text))
      throw new DataError(
        "quota",
        "当前服务权限或额度不足，请在财搭子核对后重试",
      );
    throw new DataError("upstream", "数据服务暂未完成请求，请稍后刷新");
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
export async function withMcp(key, run, signal) {
  if (!key) throw new DataError("auth", "请先连接财搭子");
  const client = new Client(
    { name: "caidazi-dsh-boards", version: "0.3.0" },
    { capabilities: {} },
  );
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [bridgePath],
    env: {
      CAIDAZI_API_KEY: key,
      CAIDAZI_TIMEOUT_MS: "90000",
      CAIDAZI_MCP_NO_UPDATE_NOTIFIER: "1",
      ...(process.versions.electron ? { ELECTRON_RUN_AS_NODE: "1" } : {}),
    },
    stderr: "pipe",
  });
  transport.stderr?.on("data", () => {});
  const stop = () => {
    void client.close().catch(() => {});
  };
  signal?.addEventListener("abort", stop, { once: true });
  try {
    signal?.throwIfAborted();
    await client.connect(transport);
    return await run(async (name, args) =>
      decode(
        await client.callTool({ name, arguments: args }, undefined, {
          timeout: 100000,
          signal,
        }),
      ),
    );
  } finally {
    signal?.removeEventListener("abort", stop);
    await client.close().catch(() => {});
  }
}
export function quoteFrom(text, symbol) {
  if (typeof text !== "string")
    throw new DataError("format", "行情格式发生变化，请稍后刷新");
  const rows = text
    .split("\n")
    .filter((x) => x.trim().startsWith("|"))
    .map((x) =>
      x
        .trim()
        .split("|")
        .slice(1, -1)
        .map((v) => v.trim()),
    );
  const headers = rows.find(
    (r) => r.includes("股票代码") && r.includes("最新价"),
  );
  const values = rows.find(
    (r) => headers && r[headers.indexOf("股票代码")] === symbol,
  );
  if (!headers || !values)
    throw new DataError("format", "暂未获得可识别的行情数据");
  const get = (k) => values[headers.indexOf(k)];
  let price = get("最新价");
  const stamp = get("交易时间"),
    change = get("涨跌幅");
  if (/\.(SH|SZ)$/.test(symbol) && /^\d[\d,.]*$/.test(price || ""))
    price += "元";
  if (
    !/^-?\d[\d,.]*\s*(美元|港元|港币|元|人民币)$/.test(price || "") ||
    !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(stamp || "")
  )
    throw new DataError("format", "行情缺少有效价格或时点");
  return {
    symbol,
    name: get("股票名称"),
    price,
    change: /^-?\d+(\.\d+)?%$/.test(change) ? change : null,
    asOf: stamp,
    timezone: /\.(SH|SZ)$/.test(symbol)
      ? "北京时间"
      : /\.HK$/.test(symbol)
        ? "香港时间"
        : "交易时间（接口未标时区）",
  };
}
export function historyFrom(value, symbol) {
  const data = value?.data,
    item = data?.items?.find((x) => x.symbol === symbol);
  if (!item?.days?.length) throw new DataError("format", "暂未获得分钟行情");
  const days = item.days.map((d) => ({
    date: d.trade_date,
    status: d.data_status,
    synthetic: 0,
    bars: (d.bars || [])
      .map((b) => ({
        time: b.bar_time,
        close:
          Number.isFinite(b.close) &&
          b.close > 0 &&
          !b.is_synthetic &&
          b.is_complete !== false
            ? b.close
            : null,
        synthetic: !!b.is_synthetic,
      }))
      .filter((b) => /^\d{4}-\d{2}-\d{2}T/.test(b.time)),
  }));
  for (const d of days) d.synthetic = d.bars.filter((b) => b.synthetic).length;
  if (!days.some((d) => d.bars.some((b) => b.close !== null)))
    throw new DataError("format", "分钟行情尚未形成有效价格");
  return {
    symbol,
    timezone: data.timezone || "Asia/Shanghai",
    days: days.filter((d) => d.bars.some((b) => b.close !== null)),
  };
}
export function citationsFrom(value, board, now = new Date()) {
  const rows = value?.search_result;
  if (!Array.isArray(rows))
    throw new DataError("format", "检索结果格式发生变化");
  const cutoff = new Date(now);
  cutoff.setUTCDate(cutoff.getUTCDate() - 31);
  const seen = new Set();
  let withheld = 0;
  const items = [];
  for (const r of rows) {
    if (!["authorized", "citation_only"].includes(r.usageRights)) {
      withheld++;
      continue;
    }
    if (
      typeof r.title !== "string" ||
      !board.terms.some((t) => r.title.toLowerCase().includes(t.toLowerCase()))
    )
      continue;
    if (/行情走势|^[^（）()]+\((?:sz|sh)\d{6}\)$/i.test(r.title)) continue;
    let url;
    try {
      url = new URL(r.url);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password
      )
        continue;
    } catch {
      continue;
    }
    let date =
      typeof r.publishTime === "string" ? r.publishTime.slice(0, 10) : "";
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) ||
      new Date(date) < cutoff ||
      new Date(date) > now
    )
      continue;
    // A full publication timestamp in the article header outranks search indexing time.
    const explicit = String(r.content || "").slice(0,180).match(/(20\d{2}-\d{2}-\d{2})[ T]\d{2}:\d{2}/)?.[1];
    if (explicit && Number.isFinite(Date.parse(explicit)) && new Date(explicit) <= now && new Date(explicit) >= cutoff) date = explicit;
    // A bare conflicting date is ambiguous; do not infer its meaning.
    const leadingDate = String(r.content || "")
      .slice(0, 180)
      .match(/20\d{2}-\d{2}-\d{2}/)?.[0];
    if (leadingDate && leadingDate !== date) continue;
    const canonical = url.origin + url.pathname;
    if (seen.has(canonical)) continue;
    seen.add(canonical);
    items.push({
      title: r.title.slice(0, 200),
      source: String(r.source || url.hostname).slice(0, 80),
      date,
      url: url.href,
      rights: r.usageRights,
    });
  }
  return {
    items: items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8),
    withheld,
  };
}
export function safeError(e) {
  return {
    code: e instanceof DataError ? e.code : "service",
    message: e instanceof DataError ? e.message : "请求未完成，请稍后重试",
  };
}
export async function loadBoard(id, key, signal) {
  const board = boards.find((b) => b.id === id);
  if (!board) throw new DataError("input", "找不到这个看板");
  return withMcp(key, async (call) => {
    const requestedAt = new Date().toISOString();
    const symbols = [[board.symbol, board.asset], ...board.peers];
    const tasks = [
      ...symbols.map(([symbol]) => call("get_real_time_record", {symbol}).then(v=>quoteFrom(v,symbol))),
      ...board.searches.map(async ([topic, query]) => {
        const raw = await call("investment_search_pro", {query});
        const result = citationsFrom(raw, board);
        return {topic, query, ...result, items:result.items.map(item=>({
          ...item,
          excerpt: item.rights === "authorized" ? String(raw.search_result.find(r=>r.url===item.url)?.content || "").replace(/<[^>]*>/g, "").replace(/[#*_]+/g, "").trim().slice(0,600) : "",
        }))};
      }),
      ...symbols.map(([symbol])=>loadCandles(symbol, signal)),
    ];
    const parts = await Promise.allSettled(tasks);
    const auth = parts.find(p=>p.status === "rejected" && p.reason?.code === "auth");
    if (auth) throw auth.reason;
    const part = i => parts[i].status === "fulfilled" ? {ok:true,value:parts[i].value} : {ok:false,error:safeError(parts[i].reason)};
    const tracks = board.searches.map(([topic],i)=>({topic,...part(symbols.length+i)}));
    const items = [...new Map(tracks.flatMap(t=>t.ok?t.value.items:[]).map(n=>[n.url,n])).values()].sort((a,b)=>b.date.localeCompare(a.date));
    return {
      id, requestedAt, quote:part(0),
      peers:board.peers.map(([symbol,name],i)=>({symbol,name,...part(i+1)})),
      tracks,
      news:{ok:tracks.some(t=>t.ok),value:{items}},
      candles:symbols.map(([symbol,name],i)=>({symbol,name,...part(symbols.length+board.searches.length+i)})),
    };
  }, signal);
}
export async function verifyKey(key, signal) {
  return withMcp(
    key,
    async (call) =>
      quoteFrom(
        await call("get_real_time_record", { symbol: "600183.SH" }),
        "600183.SH",
      ),
    signal,
  );
}
