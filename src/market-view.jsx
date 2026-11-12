import React, {useMemo, useState} from 'react';
import {weeklyCandles} from './market.js';
export function CandleChart({series}) {
  const [range,setRange]=useState(120),[period,setPeriod]=useState('day'),[hover,setHover]=useState(null);
  const all=useMemo(()=>period==='week'?weeklyCandles(series.bars):series.bars,[series,period]);
  const bars=all.slice(-(period==='week'?Math.ceil(range/5):range));
  const selected=bars[hover===null?bars.length-1:Math.min(hover,bars.length-1)];
  const low=Math.min(...bars.map(b=>b.low)),high=Math.max(...bars.map(b=>b.high)),pad=(high-low)*.08||1;
  const y=v=>20+(high+pad-v)/(high-low+2*pad)*218;
  const x=i=>52+(i+.5)*650/bars.length;
  const bw=Math.max(1,Math.min(10,650/bars.length*.65));
  const maxVolume=Math.max(1,...bars.map(b=>b.volume||0));
  const fmt=n=>n.toLocaleString('zh-CN',{maximumFractionDigits:2});
  const ma=bars.map((b,i)=>{
    const index=all.indexOf(b);if(index<19)return null;
    return [x(i),y(all.slice(index-19,index+1).reduce((s,v)=>s+v.close,0)/20)];
  }).filter(Boolean);
  return <figure className="candle-figure">
    <div className="chart-controls"><div role="group" aria-label="K线周期">{[['day','日K'],['week','周K']].map(([v,l])=><button key={v} aria-pressed={period===v} onClick={()=>{setPeriod(v);setHover(null)}}>{l}</button>)}</div><div role="group" aria-label="查看范围">{[[60,'3个月'],[120,'6个月'],[250,'1年']].map(([v,l])=><button key={v} aria-pressed={range===v} onClick={()=>{setRange(v);setHover(null)}}>{l}</button>)}</div></div>
    <figcaption><span>{series.currency} · {series.timezone}</span><span>{series.adjustment}</span></figcaption>
    <div className="ohlc" aria-live="polite"><b>{selected.date}{period==='week'?' 当周':''}</b><span>开 {fmt(selected.open)}</span><span>高 {fmt(selected.high)}</span><span>低 {fmt(selected.low)}</span><span>收 {fmt(selected.close)}</span><span>量 {selected.volume===null?'—':fmt(selected.volume/10000)+'万股'}</span></div>
    <svg viewBox="0 0 760 350" role="img" aria-label={`${series.symbol} ${period==='week'?'周':'日'}K线，价格及成交量，${bars[0].date}至${bars.at(-1).date}`} onPointerLeave={()=>setHover(null)}>
      {[low,(low+high)/2,high].map(v=><g key={v}><line x1="50" x2="710" y1={y(v)} y2={y(v)} stroke="#e4e8ef"/><text x="42" y={y(v)+4} textAnchor="end">{fmt(v)}</text></g>)}
      {bars.map((b,i)=>{const color=b.close>=b.open?'#c73d49':'#16846b';return <g key={b.date}>
        <line x1={x(i)} x2={x(i)} y1={y(b.high)} y2={y(b.low)} stroke={color}/>
        <rect x={x(i)-bw/2} y={y(Math.max(b.open,b.close))} width={bw} height={Math.max(1,Math.abs(y(b.open)-y(b.close)))} fill={color}/>
        {b.volume!==null&&<rect x={x(i)-bw/2} y={308-b.volume/maxVolume*48} width={bw} height={b.volume/maxVolume*48} fill={color} opacity=".55"/>}
        <rect x={x(i)-325/bars.length} y="14" width={650/bars.length} height="300" fill="transparent" onPointerMove={()=>setHover(i)}><title>{b.date} 开{fmt(b.open)} 高{fmt(b.high)} 低{fmt(b.low)} 收{fmt(b.close)}</title></rect>
      </g>})}
      {ma.length>1&&<path d={ma.map(([a,b],i)=>`${i?'L':'M'}${a},${b}`).join(' ')} stroke="#bc8a28" strokeWidth="1.5" fill="none" pointerEvents="none"/>}
      {hover!==null&&<line x1={x(hover)} x2={x(hover)} y1="14" y2="310" stroke="#627084" strokeDasharray="3 3" pointerEvents="none"/>}
      <text x="50" y="258">成交量 · 股</text><text x="710" y="258" textAnchor="end">{period==='week'?'20周均线':'20日均线'}</text>
      {[0,Math.floor(bars.length/2),bars.length-1].map(i=><text key={i} x={x(i)} y="336" textAnchor={i===0?'start':i===bars.length-1?'end':'middle'}>{bars[i].date}</text>)}
    </svg>
    <a className="source-line" href={series.sourceUrl} target="_blank" rel="noopener noreferrer">{series.source} · 历史行情 ↗</a>
  </figure>;
}
export function MarketPanel({board,data,connected}) {
  const [selected,setSelected]=useState(board.symbol);
  const chosen=data?.candles?.find(s=>s.symbol===selected)||data?.candles?.[0];
  const symbols=[[board.symbol,board.asset],...board.peers];
  const quotes=[{symbol:board.symbol,name:board.asset,...data?.quote},...(data?.peers||[])];
  const quote=quotes.find(q=>q.symbol===chosen?.symbol);
  return <section className="market-panel"><div className="company-switch" role="group" aria-label="选择公司">{symbols.map(([symbol,name])=><button key={symbol} aria-pressed={(chosen?.symbol||selected)===symbol} onClick={()=>setSelected(symbol)}>{name}<small>{symbol}</small></button>)}</div>
    {quote?.ok&&<div className="market-quote"><h2>{quote.name}</h2><strong>{quote.value.price}</strong><span className={Number.parseFloat(quote.value.change)>=0?'up':'down'}>{quote.value.change}</span><small>{quote.value.asOf} · {quote.value.timezone} · 财搭子行情</small></div>}
    {chosen?.ok?<CandleChart key={chosen.symbol} series={chosen.value}/>:<p className="empty">{connected?'日K正在获取；如果数据源暂不可用，可稍后更新。':'连接后查看各公司的日K、周K、成交量和历史区间。'}</p>}
  </section>;
}
