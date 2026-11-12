import React from "react";
export function SourceLine({ ids, sources }) {
  return <div className="source-line">{ids.map((id) => {
    const s = sources[id];
    return <span key={id}>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" title={s.locator}>{s.title} · {s.date} ↗</a> : `${s.title} · ${s.date}`}<small>{s.locator}</small></span>;
  })}</div>;
}
export function EvidenceChart({ chart, sources }) {
  const values=chart.series.flatMap(s=>s.values);
  const bound=v=>{const step=10**Math.floor(Math.log10(Math.max(1,v)))/5;return Math.ceil(v*1.1/step)*step};
  const max=bound(Math.max(1,...values)), min=-bound(Math.abs(Math.min(0,...values)));
  const y=v=>190-(v-min)/(max-min)*162, zero=y(0);
  const group=510/chart.periods.length, barWidth=Math.min(65,group/(chart.series.length+2));
  const colors=["#3e62ed","#697892","#47a69d","#bc8a28"];
  const format=v=>Number(v.toFixed(2)).toLocaleString("zh-CN");
  return <figure className="research-chart">
    <h3>{chart.title}</h3>
    <figcaption><span>{chart.unit}</span><span className="chart-legend">{chart.series.map((s,j)=><span key={s.name}><i style={{background:colors[j%colors.length]}}/>{s.name}</span>)}</span></figcaption>
    <svg viewBox="0 0 600 230" role="img" aria-label={`${chart.title}，单位${chart.unit}。${chart.periods.map((p,i)=>`${p}：${chart.series.map(s=>`${s.name}${format(s.values[i])}`).join('、')}`).join('；')}`}>
      {[min,(max+min)/2,max].map(v=><g key={v}><line x1="52" x2="580" y1={y(v)} y2={y(v)}/><text x="44" y={y(v)+4} textAnchor="end">{format(v)}</text></g>)}
      {chart.periods.map((p,i)=><g key={p}>{chart.series.map((s,j)=>{const v=s.values[i],x=62+i*group+group/2+(j-chart.series.length/2)*barWidth;return <g key={s.name}><rect x={x} y={Math.min(y(v),zero)} width={barWidth-8} height={Math.abs(y(v)-zero)} rx="2" fill={colors[j%colors.length]}><title>{p} {s.name} {format(v)} {chart.unit}</title></rect><text x={x+(barWidth-8)/2} y={v>=0?y(v)-7:y(v)+14} textAnchor="middle" className="bar-value">{format(v)}</text></g>})}<text x={62+i*group+group/2-4} y="217" textAnchor="middle">{p}</text></g>)}
    </svg><p className="sub">{chart.note}</p><SourceLine ids={chart.sources} sources={sources}/>
  </figure>;
}
export function ResearchBrief({ id, section, connected, ask, research:r, sources, publishedAt, version, tracks }) {
  const date=publishedAt.slice(0,10);
  return <section className="research-brief" aria-label={section==='research'?'核心判断':section==='evidence'?'产业证据':'经营数据'}>
    <div className="research-date"><span>{date}</span><span>{version ? `公共研究 ${version}` : '内置研究快照'}</span></div>
    {section==='research' && <>
      <h2 className="thesis">{r.headline}</h2><p className="thesis-summary">{r.summary}</p>
      <p className="research-change">本版变化 · {r.change}</p>
      <div className="research-facts">{r.facts.map(f=><div key={f.label}><span>{f.label}</span><strong>{f.value}</strong><p>{f.detail}</p><SourceLine ids={f.sources} sources={sources}/></div>)}</div>
      <section className="reassess"><h3>什么变化会改变判断</h3><p>{r.reassess}</p></section>
      <section className="research-watch"><h3>接下来验证</h3><ul>{r.watch.map(w=><li key={w}>{w}</li>)}</ul>{connected&&<button onClick={()=>ask(`核对${date}判断：${r.headline}。重点：${r.watch.join('；')}。给出新增事实、反证和未决问题。`)}>继续验证 ↗</button>}</section>
    </>}
    {section==='evidence' && <>
      <div className="dimension-grid">{r.dimensions.map(d=><section key={d.title}><h3>{d.title}</h3><p className="dimension-signal">{d.signal}</p><p>{d.body}</p><p className="dimension-watch">观察：{d.watch}</p><SourceLine ids={d.sources} sources={sources}/></section>)}</div>
      <div className="research-logic">{r.logic.map(l=><section key={l.title}><span className="logic-kind">{l.kind}</span><h3>{l.title}</h3><p>{l.body}</p><SourceLine ids={l.sources} sources={sources}/></section>)}</div>
      {connected&&<section className="research-watch"><h3>最新证据线索</h3><p className="sub">新检索资料用于核对上方判断；经审阅发布后才进入公共研究版本。</p>{tracks?.map(t=><section className="track" key={t.topic}><h3>{t.topic}</h3>{t.ok&&t.value.items.length?t.value.items.map(n=><a className="evidence" key={n.url} href={n.url} target="_blank" rel="noopener noreferrer"><strong>{n.title} ↗</strong>{n.excerpt&&<p>{n.excerpt}</p>}<small>{n.source} · {n.date}{n.dateConflict?' · 原文时间待核对':''}</small></a>):<p className="sub">{t.ok?'暂无可公开展示的新证据，原判断待持续验证。':'本轮检索未完成，可再次更新。'}</p>}</section>) || <p className="empty">更新后按研究主题显示新证据。</p>}</section>}
    </>}
    {section==='financial' && <div className="financial-grid">{r.charts.map(c=><EvidenceChart key={c.title} chart={c} sources={sources}/>)}
      {r.funding&&<section className="funding"><h3>CoreWeave · 资金与承诺分层</h3><p className="sub">2026Q3 披露 / 11月10日电话会 · 不同资金口径不能直接相加</p><dl>{r.funding.map(f=><div key={f.name}><dt>{f.name}<small>{f.note}</small></dt><dd><strong>{f.value}</strong><span>{f.status}</span></dd></div>)}</dl><SourceLine ids={['crwv','crwvcall']} sources={sources}/></section>}
    </div>}
  </section>;
}
