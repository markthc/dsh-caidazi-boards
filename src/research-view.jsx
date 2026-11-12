import React from "react";
import { research, researchDate, sources } from "./research.js";
function SourceLine({ ids }) {
  return <div className="source-line">{ids.map((id) => {
    const s = sources[id];
    const label = `${s.title} · ${s.date}`;
    return <span key={id}>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" title={s.locator}>{label} ↗</a> : label}<small>{s.locator}</small></span>;
  })}</div>;
}
export function EvidenceChart({ chart }) {
  const largest = Math.max(...chart.series.flatMap(s => s.values));
  const max = Math.ceil(largest / 10) * 10;
  const bottom = 190, top = 28, width = 510;
  const group = width / chart.periods.length;
  const barWidth = Math.min(65, group / (chart.series.length + 2));
  const colors = ["#3e62ed", "#697892"];
  const format = v => Number(v.toFixed(2)).toLocaleString("zh-CN");
  return <figure className="research-chart">
    <h3>{chart.title}</h3>
    <figcaption><span>{chart.unit} · 实绩</span><span className="chart-legend">{chart.series.map((s, j) => <span key={s.name}><i style={{background: colors[j]}} />{s.name}</span>)}</span></figcaption>
    <svg viewBox="0 0 600 230" role="img" aria-label={`${chart.title}，单位${chart.unit}。${chart.periods.map((p,i)=>`${p}：${chart.series.map(s=>`${s.name}${format(s.values[i])}`).join('、')}`).join('；')}`}>
      {[0, max / 2, max].map(v => <g key={v}><line x1="52" x2="580" y1={bottom - v/max*(bottom-top)} y2={bottom - v/max*(bottom-top)} /><text x="44" y={bottom - v/max*(bottom-top)+4} textAnchor="end">{format(v)}</text></g>)}
      {chart.periods.map((p,i)=><g key={p}>
        {chart.series.map((s,j)=>{
          const v=s.values[i], h=v/max*(bottom-top),x=62+i*group+group/2+(j-chart.series.length/2)*barWidth;
          return <g key={s.name}><rect x={x} y={bottom-h} width={barWidth-8} height={h} rx="3" fill={colors[j]}><title>{p} {s.name} {format(v)} {chart.unit}</title></rect><text x={x+(barWidth-8)/2} y={bottom-h-7} textAnchor="middle" className="bar-value">{format(v)}</text></g>;
        })}
        <text x={62+i*group+group/2-4} y="217" textAnchor="middle">{p}</text>
      </g>)}
    </svg>
    <p className="sub">{chart.note}</p>
    <SourceLine ids={chart.sources}/>
  </figure>;
}
export function ResearchBrief({ id, connected, ask }) {
  const r = research[id];
  return <section className="research-brief" aria-label="研究判断">
    <div className="research-date"><span>研究判断 · {researchDate}</span><span>行情刷新不会改写本段研究</span></div>
    <h2 className="thesis">{r.headline}</h2>
    <p className="thesis-summary">{r.summary}</p>
    <p className="research-change">本版新增：{r.change}</p>
    <div className="research-facts">{r.facts.map(f=><div key={f.label}><span>{f.label}</span><strong>{f.value}</strong><p>{f.detail}</p><SourceLine ids={f.sources}/></div>)}</div>
    <div className="research-body">
      <div className="research-evidence">
        {r.charts.map(c=><EvidenceChart key={c.title} chart={c}/>)}
        {r.funding && <section className="funding"><h3>资金不能直接相加</h3><p className="sub">CoreWeave · 2026Q3 披露 / 11月10日电话会</p><dl>{r.funding.map(f=><div key={f.name}><dt>{f.name}<small>{f.note}</small></dt><dd><strong>{f.value}</strong><span>{f.status}</span></dd></div>)}</dl><SourceLine ids={['crwv','crwvcall']}/></section>}
      </div>
      <div className="research-logic">{r.logic.map(l=><section key={l.title}><span className="logic-kind">{l.kind}</span><h3>{l.title}</h3><p>{l.body}</p><SourceLine ids={l.sources}/></section>)}
        <section className="reassess"><h3>什么变化会改变判断</h3><p>{r.reassess}</p></section>
      </div>
    </div>
    <section className="research-watch"><h3>接下来验证</h3><ul>{r.watch.map(w=><li key={w}>{w}</li>)}</ul>{connected && <button onClick={()=>ask(`围绕以下当前判断核对新证据：${r.headline}。重点检查：${r.watch.join('；')}。指出与${researchDate}研究相比有哪些新增事实、反证或仍未解决的问题。`)}>让大发核对这些变化 ↗</button>}</section>
  </section>;
}
