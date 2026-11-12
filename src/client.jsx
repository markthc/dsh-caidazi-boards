/* THESIS: Three research instruments, one calm working surface.
 OWN-WORLD: Existing Caidazi white/blue system; DSH owns navigation and conversation.
 STORY: Connect once, read current evidence, change assumptions, ask a focused follow-up.
 FIRST VIEWPORT: Compact title, three text tabs; price evidence left, research conditions right.
 FORM: Native main panel extending the established visual system; no new app shell. */
import React, { useState, useEffect } from "react";
import { boards, revenueThreshold } from "./boards.js";
import { css } from "./style.js";
import { logo, dafa } from "./brand.js";
import { ResearchBrief } from "./research-view.jsx";
import { research, researchDate, sources } from "./research.js";
import { MarketPanel } from "./market-view.jsx";
export const inject = ["slots", "connection", "uiWorkspace"];
function BoardIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M8 15v-4m4 4V8m4 7v-6" />
    </svg>
  );
}
const time = (s) =>
  s
    ? new Date(s).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";
function Scenario({ params, setParams, disabled = false }) {
  const { capital, roi, margin } = params;
  const value = revenueThreshold(capital, roi, margin);
  const max = (capital * roi) / 10;
  return (
    <section className="scenario">
      <h2>需要多少收入，才能达到回报要求？</h2>
      <p className="sub">
        {disabled ? "静态测算预览 · 连接后可调整假设。" : "假设测算 · 可修改，不代表公司预测。"}以净利润／已投产资本为静态目标，不含建设期、杠杆及追加投入，不是项目 IRR。
      </p>
      <div className="layout">
        <fieldset disabled={disabled}>
          <label>
            <span>已投产资本 · 亿元</span>
            <input
              aria-label="已投产资本（亿元）"
              type="number"
              min="1"
              max="100000"
              step="1"
              value={capital}
              onChange={(e) =>
                setParams({
                  ...params,
                  capital: Math.min(
                    100000,
                    Math.max(1, Number(e.target.value) || 1),
                  ),
                })
              }
            />
          </label>
          <label>
            <span>
              净利润 / 投产资本目标<output>{roi}%</output>
            </span>
            <input
              aria-label="净利润与投产资本目标比率"
              type="range"
              min="5"
              max="25"
              step="1"
              value={roi}
              onChange={(e) => setParams({ ...params, roi: +e.target.value })}
            />
          </label>
          <label>
            <span>
              净利率<output>{margin}%</output>
            </span>
            <input
              aria-label="净利率"
              type="range"
              min="10"
              max="40"
              step="1"
              value={margin}
              onChange={(e) =>
                setParams({ ...params, margin: +e.target.value })
              }
            />
          </label>
        </fieldset>
        <div>
          <p className="calculation">
            年收入门槛 <strong>{value.toFixed(1)}</strong> 亿元
          </p>
          <figure>
            <figcaption>
              <span>年收入门槛 · 亿元</span>
              <span>横轴：净利率</span>
            </figcaption>
            <svg
              className="chart"
              viewBox="0 0 440 190"
              role="img"
              aria-label={`不同净利率下的年收入门槛；当前${value.toFixed(1)}亿元`}
            >
              {[0, max / 2, max].map((v) => (
                <g key={v}>
                  <line
                    x1="45"
                    x2="420"
                    y1={155 - (v / max) * 130}
                    y2={155 - (v / max) * 130}
                  />
                  <text x="37" y={159 - (v / max) * 130} textAnchor="end">
                    {v.toFixed(0)}
                  </text>
                </g>
              ))}
              <path
                d={Array.from(
                  { length: 31 },
                  (_, i) =>
                    `${i ? "L" : "M"}${45 + i * 12.5},${155 - (revenueThreshold(capital, roi, 10 + i) / max) * 130}`,
                ).join(" ")}
              />
              <circle
                cx={45 + (margin - 10) * 12.5}
                cy={155 - (value / max) * 130}
                r="4"
                fill="#3e62ed"
              />
              {[10, 20, 30, 40].map((m) => (
                <text
                  key={m}
                  x={45 + (m - 10) * 12.5}
                  y="180"
                  textAnchor="middle"
                >
                  {m}%
                </text>
              ))}
            </svg>
          </figure>
          <p className="sub">
            {capital} × {roi}% ÷ {margin}% = {value.toFixed(1)} 亿元／年
          </p>
        </div>
      </div>
    </section>
  );
}
export function BoardApp({ rpc, ask, view = {} }) {
  view.store ??= {};
  view.pending ??= {};
  view.errors ??= {};
  const [id, setId] = useState(view.id || "memory"),
    [mode, setMode] = useState(view.mode || "research"),
    [connected, setConnected] = useState(false),
    [ready, setReady] = useState(false),
    [settings, setSettings] = useState(false),
    [key, setKey] = useState(""),
    [connecting, setConnecting] = useState(false),
    [store, setStore] = useState(view.store || {}),
    [busy, setBusy] = useState(
      Object.fromEntries(Object.keys(view.pending).map((k) => [k, true])),
    ),
    [errors, setErrors] = useState({ ...view.errors }),
    [connectionError, setConnectionError] = useState("");
  const [params, setParams] = useState(
    view.params || { capital: 100, roi: 15, margin: 24 },
  );
  const board = boards.find((b) => b.id === id),
    data = connected ? store[id] : undefined;
  useEffect(() => {
    view.id = id;
    view.params = params;
    view.mode = mode;
  }, [id, store, params, mode]);
  useEffect(() => {
    if (!ready || !connected) return;
    setStore({ ...view.store });
    setErrors({ ...view.errors });
    setBusy(Object.fromEntries(Object.keys(view.pending).map((key) => [key, true])));
    for (const target of Object.keys(view.pending)) void refresh(target);
    if (!view.pending[id] && !view.store[id] && !view.errors[id]) void refresh(id);
  }, [ready, connected, id]);
  const request = async (action, payload) => {
    const r = await rpc(action, payload);
    if (!r.ok) {
      const e = new Error(r.error.message);
      e.code = r.error.code;
      throw e;
    }
    return r.value;
  };
  useEffect(() => {
    let alive = true;
    request("status", {})
      .then((r) => {
        if (alive) {
          setConnected(r.configured);
          setSettings(!r.configured);
          setReady(true);
        }
      })
      .catch(() => {
        if (alive) {
          setConnectionError("无法连接 DSH 服务，请重新打开页面");
          setReady(true);
        }
      });
    return () => {
      alive = false;
    };
  }, []);
  async function refresh(target = id) {
    setBusy((s) => ({ ...s, [target]: true }));
    setErrors((s) => ({ ...s, [target]: "" }));
    if (!view.pending[target]) {
      view.errors[target] = "";
      view.pending[target] = request("refresh", { id: target })
        .then((value) => {
          view.store = { ...view.store, [target]: value };
          return { ok: true };
        })
        .catch((e) => {
          view.errors[target] = e.message;
          if (e.code === "auth") view.store = {};
          return { ok: false, code: e.code };
        })
        .finally(() => {
          delete view.pending[target];
        });
    }
    const result = await view.pending[target];
    setStore({ ...view.store });
    setErrors({ ...view.errors });
    setBusy((s) => ({ ...s, [target]: false }));
    if (!result.ok && result.code === "auth") {
      setConnected(false);
      setSettings(true);
    }
  }

  async function connect(e) {
    e.preventDefault();
    if (connecting) return;
    setConnecting(true);
    setConnectionError("");
    try {
      await request("connect", { key: key.trim() });
      setKey("");
      view.store = {};
      view.errors = {};
      setStore({});
      setErrors({});
      setConnected(true);
      setSettings(false);
      await refresh();
    } catch (e) {
      setConnectionError(e.message);
    } finally {
      setConnecting(false);
    }
  }
  function followup(question = board.question) {
    let prompt = `使用财搭子 Skills 和已连接的财搭子 MCP，继续「${board.title}」研究。\n${question}\n只读研究，不创建定时任务、不修改自选或持仓。写清数据时点、原始来源、事实与假设；缺少证据不判定通过。`;
    const editorial = data?.publication?.snapshot?.boards[id] || research[id];
    prompt += `\n看板研究版本：${data?.publication?.snapshot?.publishedAt?.slice(0,10) || researchDate}（已发布研究；新资料仍需核验）。当前判断：${editorial.headline}。重评条件：${editorial.reassess}请先核对是否出现更新，不能将上述判断当作已验证结论。`;
    if (data)
      prompt += `\n用户已查看的看板获取时间：${data.requestedAt}。参考标的：${[board.symbol, ...board.peers.map(p => p[0])].join("、")}。请重新核对最新数据。`;
    if (id === "ai")
      prompt += `\n用户情景假设（非公司实绩）：投产资本${params.capital}亿元，净利润／投产资本目标${params.roi}%，净利率${params.margin}%，收入门槛${revenueThreshold(params.capital, params.roi, params.margin).toFixed(1)}亿元/年。`;
    ask(prompt);
  }
  const publication = data?.publication;
  const snapshot = publication?.snapshot;
  const editorial = snapshot?.boards[id] || research[id];
  const sourceMap = snapshot?.sources || sources;
  return (
    <div className="cdz">
      <style>{css}</style>
      <header className="top">
        <div className="brand">
          <img className="brand-logo" src={logo} alt="财搭子 Logo" />
          财搭子 <span className="brand-title">研究看板</span>
        </div>
        <button className="connected" onClick={() => connected ? setSettings(!settings) : document.getElementById("caidazi-key")?.focus()}>
          {connected ? (
            <>
              <i />
              已连接财搭子
            </>
          ) : (
            "连接财搭子"
          )}
        </button>
      </header>
      <nav className="tabs" role="tablist" aria-label="研究看板">
        {boards.map((b) => (
          <button
            role="tab"
            key={b.id}
            aria-selected={id === b.id}
            onClick={() => setId(b.id)}
          >
            {b.title}
          </button>
        ))}
      </nav>
      <main>
        {(settings || (ready && !connected)) && (
          <section className="connect">
            <div className="connect-heading">
              <img src={dafa} alt="大发" width="44" height="44" />
              <div><h2>{connected ? "更换财搭子连接" : "让大发帮你跟踪最新变化"}</h2>
              <p>{connected ? "粘贴新的 API Key，验证后切换连接。" : "当前为静态预览。连接后，获取真实行情与研究资料。"}</p></div>
            </div>
            <ol className="key-steps" aria-label="在财搭子 App 获取 Key">
              <li>打开财搭子 App <b>大发页</b></li>
              <li>打开左侧菜单，进入 <b>我的skill</b></li>
              <li><b>领取 API Key</b>，或在 <b>我的API KEY管理</b> 中复制</li>
            </ol>
            <form onSubmit={connect}>
              <input
                id="caidazi-key"
                type="password"
                aria-label="财搭子 API Key"
                placeholder="粘贴 API Key"
                autoComplete="off"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                disabled={connecting}
              />
              <button
                className="primary"
                disabled={
                  connecting ||
                  !key.trim() ||
                  Object.keys(view.pending).length > 0
                }
              >
                {connecting ? "正在验证…" : "连接财搭子"}
              </button>
            </form>
            <div className="row">
              <a
                href="https://zhicepilot.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                还没有财搭子？前往下载 ↗
              </a>
              <span className="sub">Key 保存在 DSH 凭据区</span>
            </div>
          </section>
        )}
        {connectionError && (
          <div className="error" role="alert">
            {connectionError}
          </div>
        )}
        <div className="intro">
          <div>
            <h1>{board.subtitle}</h1>
            <p>{board.description}</p>
          </div>
          {connected && <div className="toolbar">
            {<button
              className="primary"
              disabled={!ready || !connected || busy[id]}
              onClick={() => refresh()}
            >
              {busy[id] ? "正在更新…" : "更新看板"}
            </button>}
            <button disabled={!connected} onClick={() => followup()}>
              继续研究 ↗
            </button>
          </div>}
        </div>
        <div className="content-switch" aria-label="看板内容">
          {[["research","核心判断"],["evidence","产业证据"],["financial","经营数据"],["market","市场定价"]].map(([value,label])=><button key={value} aria-pressed={mode===value} onClick={()=>setMode(value)}>{label}</button>)}
        </div>
        {errors[id] && <div className="error" role="alert">{errors[id]}{data ? "，保留上次成功结果。" : ""}</div>}
        {busy[id] && <div role="status"><p className="loading-copy">正在同步已发布研究、公司行情和最新证据…</p><div className="progress" /></div>}
        {publication?.warning && <p className="publication-note" role="status">{publication.warning}</p>}
        {mode !== "market" && <ResearchBrief id={id} section={mode} connected={connected} ask={followup} research={editorial} sources={sourceMap} publishedAt={snapshot?.publishedAt || researchDate} version={snapshot?.version} tracks={data?.tracks} />}
        {mode === "financial" && id === "ai" && <Scenario params={connected ? params : { capital: 100, roi: 15, margin: 24 }} setParams={setParams} disabled={!connected} />}
        {mode === "market" && <MarketPanel key={id} board={board} data={data} connected={connected} />}
        <footer className="foot">
          <span>
            {data
              ? `本次获取 ${time(data.requestedAt)} · 行情以各自交易时点为准`
              : "研究内容静态预览 · 连接后按需更新"}
          </span>
          <a
            href="https://zhicepilot.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            在财搭子继续投资研究 ↗
          </a>
        </footer>
      </main>
    </div>
  );
}
export function apply(ctx) {
  const view = {};
  const props = {
    view,
    rpc: (action, payload) =>
      ctx.connection.rpc.call("/api", "caidazi-boards", { action, payload }),
    ask: (prompt) =>
      ctx.uiWorkspace.startSession(undefined, {
        prompt,
        whenDraftExists: "append",
      }),
  };
  ctx.effect(function* () {
    yield ctx.slots.inject("main", () =>
      ctx.slots.register(
        { name: "main", key: "caidazi-boards", inject: () => props },
        BoardApp,
      ),
    );
    yield ctx.slots.inject("sidebar.panellist", () =>
      ctx.slots.register(
        {
          name: "sidebar.panellist",
          id: "caidazi-boards",
          order: 5,
          label: () => "财搭子看板",
        },
        BoardIcon,
      ),
    );
  });
}
