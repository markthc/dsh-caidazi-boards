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
import { research, researchDate } from "./research.js";
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
const changeClass = (s) =>
  Number.parseFloat(s) > 0 ? "up" : Number.parseFloat(s) < 0 ? "down" : "";
function PriceChart({ history, asset }) {
  const [selected, setSelected] = useState(-1);
  const days = history.days;
  const day =
    days[selected < 0 || selected >= days.length ? days.length - 1 : selected];
  const vals = day.bars.map((b) => b.close).filter((x) => x !== null),
    low = Math.min(...vals),
    high = Math.max(...vals),
    pad = Math.max((high - low) * 0.15, low * 0.001),
    lo = low - pad,
    hi = high + pad;
  const x = (i) => 48 + (i * 520) / Math.max(1, day.bars.length - 1),
    y = (v) => 18 + ((hi - v) / (hi - lo)) * 155;
  let open = false;
  const path = day.bars
    .map((b, i) => {
      if (b.close === null) {
        open = false;
        return "";
      }
      const p = `${open ? "L" : "M"}${x(i).toFixed(1)},${y(b.close).toFixed(1)}`;
      open = true;
      return p;
    })
    .join(" ");
  return (
    <>
      <div className="row">
        <span className="sub">{asset} · 分钟收盘价</span>
        <div className="date-switch">
          {days.map((d, i) => (
            <button
              key={d.date}
              aria-pressed={d === day}
              onClick={() => setSelected(i)}
            >
              {d.date.slice(4, 6)}/{d.date.slice(6)}
            </button>
          ))}
        </div>
      </div>
      <figure>
        <figcaption>
          <span>人民币元 · 不复权</span>
          <span>
            {day.date.slice(0, 4)}.{day.date.slice(4, 6)}.{day.date.slice(6)} ·
            北京时间
          </span>
        </figcaption>
        <svg
          className="chart"
          viewBox="0 0 590 210"
          role="img"
          aria-label={`${asset} ${day.date} 分钟收盘价，最低${low.toFixed(2)}元，最高${high.toFixed(2)}元`}
        >
          {[lo, (lo + hi) / 2, hi].map((v) => (
            <g key={v}>
              <line x1="48" x2="568" y1={y(v)} y2={y(v)} />
              <text x="40" y={y(v) + 4} textAnchor="end">
                {v.toFixed(2)}
              </text>
            </g>
          ))}
          <path d={path} />
          {[0, Math.floor((day.bars.length - 1) / 2), day.bars.length - 1].map(
            (i) => (
              <text key={i} x={x(i)} y="198" textAnchor="middle">
                {day.bars[i]?.time.slice(11, 16)}
              </text>
            ),
          )}
        </svg>
      </figure>
      {(day.synthetic > 0 || day.status !== "complete") && (
        <p className="sub">
          {day.synthetic > 0
            ? `${day.synthetic} 个补点已留空`
            : "分钟序列不完整"}
          ，不连接缺口。
        </p>
      )}
    </>
  );
}
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
function Observation({ board, data }) {
  const q = data.quote?.ok ? data.quote.value : null;
  const h = data.history?.ok ? data.history.value.days.at(-1) : null;
  const real = h?.bars.filter((b) => b.close !== null) || [];
  const high = real.length ? Math.max(...real.map((b) => b.close)) : null;
  const quotePrice = q ? Number.parseFloat(q.price.replaceAll(",", "")) : null;
  const day = h?.date;
  const quoteDate = q?.asOf.slice(0, 10).replaceAll("-", "");
  const above =
    high && quotePrice && quoteDate > day
      ? (quotePrice / high - 1) * 100
      : null;
  const headline = q
    ? `${board.asset} 最新报价 ${q.price}，涨跌幅 ${q.change || "未提供"}`
    : "本次行情尚未完整返回";
  const detail =
    above !== null
      ? `相较 ${day.slice(4, 6)}/${day.slice(6)} 可用分钟收盘价最高点 ${high.toFixed(2)} 元，${above >= 0 ? "高出" : "低于"} ${Math.abs(above).toFixed(2)}%。`
      : h
        ? `可回看 ${h.date.slice(4, 6)}/${h.date.slice(6)} 的分钟价格。`
        : "";
  return (
    <div className="observation">
      <strong>{headline}</strong>
      <p>
        {detail}{" "}
        {board.id === "memory"
          ? "股价变化仍需对照产品价格和利润兑现。"
          : board.id === "ai"
            ? "供应链定价与项目回报需要分开验证。"
            : "行情热度仍需对照认证、交付和盈利。"}
      </p>
    </div>
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
    const editorial = research[id];
    prompt += `\n看板研究版本：${researchDate}（静态研究，不是最新工具结果）。当前判断：${editorial.headline}。重评条件：${editorial.reassess}请先核对是否出现更新，不能将上述判断当作已验证结论。`;
    if (data)
      prompt += `\n用户已查看的看板获取时间：${data.requestedAt}。参考标的：${[board.symbol, ...board.peers.map(p => p[0])].join("、")}。请重新核对最新数据。`;
    if (id === "ai")
      prompt += `\n用户情景假设（非公司实绩）：投产资本${params.capital}亿元，净利润／投产资本目标${params.roi}%，净利率${params.margin}%，收入门槛${revenueThreshold(params.capital, params.roi, params.margin).toFixed(1)}亿元/年。`;
    ask(prompt);
  }
  const quote = data?.quote?.ok ? data.quote.value : null;
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
            {mode === "market" && <button
              className="primary"
              disabled={!ready || !connected || busy[id]}
              onClick={() => refresh()}
            >
              {busy[id] ? "正在更新…" : data ? "刷新行情与资料" : "获取行情与资料"}
            </button>}
            <button disabled={!connected} onClick={() => followup()}>
              继续研究 ↗
            </button>
          </div>}
        </div>
        <div className="content-switch" aria-label="看板内容">
          <button aria-pressed={mode === "research"} onClick={() => setMode("research")}>研究判断</button>
          <button aria-pressed={mode === "market"} onClick={() => setMode("market")}>行情与线索</button>
        </div>
        {mode === "research" && <ResearchBrief id={id} connected={connected} ask={followup} />}
        {mode === "market" && data && <Observation board={board} data={data} />}
        {errors[id] && (
          <div className="error" role="alert">
            {errors[id]}
            {data ? "，下面保留上次成功结果。" : ""}
          </div>
        )}
        {busy[id] && (
          <div role="status">
            <p className="loading-copy">
              正在读取行情与资料，完成后可在「行情与线索」查看…
            </p>
            <div className="progress" />
          </div>
        )}
        {mode === "research" && id === "ai" && <Scenario params={connected ? params : { capital: 100, roi: 15, margin: 24 }} setParams={setParams} disabled={!connected} />}
        {mode === "market" && <div className="grid">
          <div>
            <section className="section">
              {!connected ? <div className="static-preview">
                <div className="row"><h2>这张看板跟踪什么</h2><span className="preview-label">静态预览</span></div>
                <div className="research-chain">{board.checks.map(([title], i) => <React.Fragment key={title}><strong>{title}</strong>{i < 2 && <span aria-hidden="true">→</span>}</React.Fragment>)}</div>
                <h3>关注公司</h3>
                <div className="preview-companies">{[[board.symbol, board.asset], ...board.peers].map(([symbol, name]) => <div key={symbol}><b>{name}</b><span>{symbol}</span></div>)}</div>
                <p className="preview-delivery">连接后显示公司报价、分钟价格图与近期资料；继续研究时，大发会带上当前问题和假设。</p>
              </div> : <>
              <div className="row">
                <h2>市场正在怎样定价</h2>
                <span className="sub">参考公司，不代表行业指数</span>
              </div>
              <div className="row">
                <span>
                  {board.asset}{" "}
                  <span className="sub">
                    {board.symbol} · {board.role}
                  </span>
                </span>
              </div>
              {quote ? (
                <>
                  <div className="quote">
                    <strong className="price">{quote.price}</strong>
                    {quote.change && (
                      <span className={`change ${changeClass(quote.change)}`}>
                        {Number.parseFloat(quote.change) > 0 ? "+" : ""}
                        {quote.change}
                      </span>
                    )}
                  </div>
                  <p className="sub">
                    {quote.asOf} · {quote.timezone} · 财搭子行情
                  </p>
                </>
              ) : (
                <p className="empty">
                  {data?.quote?.error?.message ||
                    "连接后获取公司行情，先从下面的研究条件开始。"}
                </p>
              )}
              {data?.history?.ok ? (
                <PriceChart
                  key={id}
                  history={data.history.value}
                  asset={board.asset}
                />
              ) : (
                <div className="empty" style={{ marginTop: 16 }}>
                  {data?.history?.error?.message ||
                    "最近两个交易日的分钟价格将在这里展示。"}
                </div>
              )}
              {data?.peers && (
                <div className="peers">
                  {data.peers.map((p) => (
                    <div className="peer" key={p.symbol}>
                      <b>
                        {p.name} <span className="sub">{p.symbol}</span>
                      </b>
                      <span>
                        {p.ok ? p.value.price : "—"}{" "}
                        <span className={changeClass(p.value?.change)}>
                          {p.value?.change}
                        </span>
                      </span>
                      <small>
                        {p.ok
                          ? `${p.value.asOf} · ${p.value.timezone}`
                          : p.error.message}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </>}
            </section>
            {connected && <section className="section">
              <h2>
                近期研究线索 <span className="sub">近30天</span>
              </h2>
              {data?.news?.ok && data.news.value.items.length ? (
                data.news.value.items.map((n) => (
                  <a
                    className="evidence"
                    key={n.url}
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{n.title} ↗</strong>
                    <small>
                      {n.source} · {n.date}
                    </small>
                  </a>
                ))
              ) : (
                <p className="empty">
                  {data?.news?.error?.message ||
                    (data
                      ? "本轮没有适合展示的新资料。可继续研究，核对原始公告。"
                      : "更新后显示有来源、日期明确的研究线索。")}
                </p>
              )}
            </section>}
          </div>
          <aside className="aside">
            <h2>判断要经过这三关</h2>
            {board.checks.map(([title, body, query]) => (
              <section className="check" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
                {connected && <button
                  disabled={!connected}
                  onClick={() =>
                    followup(
                      `请核对「${title}」：${query}。结合最新证据给出判断和反证，不将行情走势当作基本面兑现。`,
                    )
                  }
                >
                  围绕这一点研究 ↗
                </button>}
              </section>
            ))}
            <p className="sub" style={{ marginTop: 16 }}>
              这是研究框架；最新证据与判断在会话中继续交付。
            </p>
          </aside>
        </div>}
        <footer className="foot">
          <span>
            {data
              ? `本次获取 ${time(data.requestedAt)} · 行情以各自交易时点为准`
              : "数据来自财搭子 MCP · 按需更新"}
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
    rpc: async (action, payload) => {
      const r = await fetch("api/caidazi-boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, payload }),
      });
      if (!r.ok) throw new Error("连接已失效，请重新打开 DSH");
      return r.json();
    },
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
