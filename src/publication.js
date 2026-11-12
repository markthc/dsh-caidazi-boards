import { createHash } from 'node:crypto';
import { research, researchDate, sources } from './research.js';
export const publicationRoot='https://raw.githubusercontent.com/markthc/dsh-caidazi-boards/main/research/';
export const bundledSnapshot={schemaVersion:1,version:'2026-11-12.3',publishedAt:'2026-11-12T08:45:47.076Z',boards:research,sources};
const fail=()=>{throw new Error('Invalid research snapshot')};
const obj=v=>{if(!v||typeof v!=='object'||Array.isArray(v))fail();return v};
const keys=(v,allowed)=>{obj(v);if(Object.keys(v).some(k=>!allowed.includes(k)))fail()};
const str=(v,max=4000)=>{if(typeof v!=='string'||!v.trim()||v.length>max)fail()};
const arr=(v,min,max)=>{if(!Array.isArray(v)||v.length<min||v.length>max)fail();return v};
const date=v=>{if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(Date.parse(v))||new Date(v).toISOString().slice(0,10)!==v||Date.parse(v)>Date.now()+86400000)fail()};
export function safePublicUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&!/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|\[|172\.(1[6-9]|2\d|3[01])\.)/.test(u.hostname)}catch{return false}}
export function validateSnapshot(s) {
  keys(s,['schemaVersion','version','publishedAt','boards','sources']);
  if(s.schemaVersion!==1||!/^\d{4}-\d{2}-\d{2}\.\d+$/.test(s.version))fail();
  if(typeof s.publishedAt!=='string'||!Number.isFinite(Date.parse(s.publishedAt))||Date.parse(s.publishedAt)>Date.now()+300000)fail();
  obj(s.sources);if(Object.keys(s.sources).length>100)fail();
  for(const [id,v] of Object.entries(s.sources)){if(!/^[a-zA-Z0-9_-]{1,60}$/.test(id))fail();keys(v,['title','date','url','locator']);str(v.title,300);date(v.date);str(v.locator,1000);if(v.url&&!safePublicUrl(v.url))fail()}
  const refs=v=>arr(v,1,12).forEach(id=>{if(!Object.hasOwn(s.sources,id))fail()});
  keys(s.boards,['memory','ai','pcb']);
  for(const id of ['memory','ai','pcb']){
    const r=s.boards[id];keys(r,['headline','summary','change','facts','charts','logic','reassess','watch','dimensions','funding']);
    for(const key of ['headline','summary','change','reassess'])str(r[key],2000);
    arr(r.watch,1,8).forEach(v=>str(v,500));
    for(const f of arr(r.facts,1,6)){keys(f,['label','value','detail','sources']);for(const k of ['label','value','detail'])str(f[k],1000);refs(f.sources)}
    for(const d of arr(r.dimensions,1,8)){keys(d,['title','signal','body','watch','sources']);for(const k of ['title','signal','body','watch'])str(d[k],1500);refs(d.sources)}
    for(const l of arr(r.logic,1,8)){keys(l,['title','kind','body','sources']);for(const k of ['title','kind','body'])str(l[k],1800);refs(l.sources)}
    for(const c of arr(r.charts,1,8)){keys(c,['title','unit','periods','series','note','sources']);for(const k of ['title','unit','note'])str(c[k],1500);arr(c.periods,1,16).forEach(v=>str(v,60));refs(c.sources);for(const t of arr(c.series,1,4)){keys(t,['name','values']);str(t.name,80);arr(t.values,c.periods.length,c.periods.length).forEach(v=>{if(!Number.isFinite(v))fail()})}}
    if(r.funding)for(const f of arr(r.funding,1,15)){keys(f,['name','note','value','status']);for(const k of ['name','note','value','status'])str(f[k],1000)}
  }
  return s;
}
export const digest=text=>createHash('sha256').update(text).digest('hex');
export function createPublicationReader(fetcher=fetch) {
  let current=validateSnapshot(structuredClone(bundledSnapshot));
  return async function read(signal){
    try{
      const get=async path=>{const r=await fetcher(publicationRoot+path,{signal:AbortSignal.any([AbortSignal.timeout(15000),...(signal?[signal]:[])]),redirect:'error',headers:{'Cache-Control':'no-cache'}});if(!r.ok)throw new Error('Publication unavailable');const t=await r.text();if(t.length>600000)fail();return t};
      const m=JSON.parse(await get('latest.json'));keys(m,['schemaVersion','version','path','sha256']);
      if(m.schemaVersion!==1||!/^\d{4}-\d{2}-\d{2}\.\d+$/.test(m.version)||m.path!==`snapshots/${m.version}.json`||! /^[a-f0-9]{64}$/.test(m.sha256))fail();
      const text=await get(m.path);if(digest(text)!==m.sha256)fail();
      const next=validateSnapshot(JSON.parse(text));if(next.version!==m.version)fail();
      if(Date.parse(next.publishedAt)<Date.parse(current.publishedAt))throw new Error('Older publication');
      const changed=current.version!==next.version;current=next;
      return {snapshot:current,changed,checkedAt:new Date().toISOString()};
    }catch{return {snapshot:current,changed:false,warning:'公共研究暂未同步，保留当前版本；公司行情和证据独立更新。'}}
  };
}
