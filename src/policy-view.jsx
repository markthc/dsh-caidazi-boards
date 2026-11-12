import React, { useState } from 'react';
import geometry from './us-map.json';
import { SourceLine } from './research-view.jsx';
const parties={D:'民主党',R:'共和党',I:'独立派'};
const fills={D:'#c7d4fb',R:'#efc6c3',I:'#e8dfbe',U:'#e4e8ed'};
const number=v=>v==null?'—':v.toLocaleString('zh-CN');
export function PolicyMap({data:g,sources}){
  const [selected,setSelected]=useState('TX'),[metric,setMetric]=useState('capacity');
  const state=g.states.find(s=>s.code===selected)||g.states[0];
  const party=s=>s.status==='called'?s.winner.party:s.status==='not-contested'?s.incumbent.party:'U';
  const value=s=>metric==='capacity'?s.capacity?.construction:s.buildings.construction;
  const max=Math.max(1,...g.states.map(s=>value(s)||0));
  const title=metric==='capacity'?`在建市场容量 · ${g.capacityPeriod}`:`在建楼栋 · ${g.asOf}`;
  const unit=metric==='capacity'?'GW，约数':'栋';
  return <section className="policy-geography" aria-label="美国州级分布">
    <div className="map-heading"><div><h2>州长当选人与在建规模</h2><p className="sub">先选州，再对照现任、当选人和建设规模。</p></div><div className="map-metrics" aria-label="地图指标">
      <button aria-pressed={metric==='capacity'} onClick={()=>setMetric('capacity')}>在建容量</button><button aria-pressed={metric==='buildings'} onClick={()=>setMetric('buildings')}>在建楼栋</button>
    </div></div>
    <div className="policy-map-layout">
      <figure className="state-map">
        <figcaption><strong>{title}</strong><span>{unit} · 圆面积表示规模</span></figcaption>
        <svg viewBox={geometry.viewBox.join(' ')} role="group" aria-label="州长当选结果与数据中心在建规模；可点选州，也可使用下方州选择器">
          {geometry.features.map(f=>{const s=g.states.find(x=>x.code===f.code);if(!s)return null;const v=value(s),active=s.code===state.code;return <g key={s.code} role="button" tabIndex={-1} aria-label={`${s.nameZh}，${parties[party(s)]||'未判定或不适用'}，${v==null?'本图无容量记录':number(v)+unit}`} onClick={()=>setSelected(s.code)}>
            <path d={f.path} fill={fills[party(s)]} stroke={active?'#202731':'#fff'} strokeWidth={active?2.5:1} vectorEffect="non-scaling-stroke"><title>{s.nameZh} · {parties[party(s)]||'未判定／不适用'} · {v==null?'本图未列':number(v)+unit}</title></path>
            {v>0&&<circle cx={f.cx} cy={f.cy} r={Math.sqrt(v/max)*37} fill="#31445c" fillOpacity=".72" stroke="#fff" strokeWidth="1.5" pointerEvents="none"/>}
            {['TX','VA','GA','CA','LA','OH','AZ'].includes(s.code)&&<text x={f.cx} y={f.cy+(v>0?4:0)} fill={v>0?'#fff':'#313e53'} pointerEvents="none">{s.code}</text>}
          </g>})}
        </svg>
        <div className="map-legend"><span><i style={{background:fills.D}}/>民主党</span><span><i style={{background:fills.R}}/>共和党</span><span><i style={{background:fills.U}}/>未判定／不适用</span><span>州色：当选人／非竞选州现任</span></div>
        <p className="sub">{metric==='capacity'?'JLL图覆盖8个单州；无圆不代表零容量。跨州区域未拆分。':'Cleanview追踪楼栋；不代表全量普查。'} 党派不等于审批态度。</p>
      </figure>
      <section className="state-detail" aria-live="polite" aria-label="所选州详情">
        <label className="state-select">查看州<select aria-label="查看州" value={state.code} onChange={e=>setSelected(e.target.value)}>{g.states.map(s=><option key={s.code} value={s.code}>{s.nameZh} · {s.code}</option>)}</select></label>
        <div className="state-shortcuts">{['TX','VA','GA','CA'].map(code=><button key={code} aria-pressed={state.code===code} onClick={()=>setSelected(code)}>{g.states.find(s=>s.code===code).nameZh}</button>)}</div>
        <h3>{state.nameZh}<span>{state.name}</span></h3>
        <dl className="governors">
          <div><dt>现任</dt><dd>{state.incumbent?`${state.incumbent.name} · ${parties[state.incumbent.party]}`:'不设州长'}</dd></div>
          {state.status==='called'?<div><dt>当选</dt><dd>{state.winner.name} · {parties[state.winner.party]}<small>媒体已判 · 尚未核官方认证</small></dd></div>:<div><dt>2026选举</dt><dd>{state.status==='pending'?'尚未判定胜者':state.status==='not-contested'?'本年无州长选举':'不适用'}</dd></div>}
        </dl>
        <p className="map-date">选举结果 {state.reportedAt} · 现任资料 {g.incumbentAsOf}</p>
        <h4>市场容量 <span>{g.capacityPeriod} · GW，约数</span></h4>
        {state.capacity?<dl className="state-numbers"><div><dt>在运</dt><dd>{number(state.capacity.existing)}</dd></div><div><dt>在建</dt><dd>{number(state.capacity.construction)}</dd></div></dl>:<p className="sub">JLL本图未列本州；下方有楼栋阶段。</p>}
        {state.code==='TX'&&<p className="map-date">图表9＋18 GW；报告正文合计26 GW，保留来源舍入差异。</p>}
        <h4>楼栋阶段 <span>{g.asOf} · 栋</span></h4>
        <dl className="state-numbers"><div><dt>已投运</dt><dd>{number(state.buildings.operating)}</dd></div><div><dt>在建</dt><dd>{number(state.buildings.construction)}</dd></div><div><dt>规划</dt><dd>{number(state.buildings.planned)}</dd></div></dl>
        {Object.values(state.buildings).every(v=>v===0)&&<p className="sub">Cleanview尚未收录本州项目，不表示现实中不存在数据中心。</p>}
        <a className="state-source" href={state.url} target="_blank" rel="noopener noreferrer">查看本州项目来源 ↗</a>
      </section>
    </div>
    <details className="map-method"><summary>来源与统计口径</summary>{g.notes.map(n=><p key={n}>{n}</p>)}<SourceLine ids={g.sources} sources={sources}/></details>
  </section>;
}
