import test from 'node:test';
import assert from 'node:assert/strict';
import {bundledSnapshot,validateSnapshot,createPublicationReader,digest} from '../src/publication.js';
import {draftResearch} from '../src/synthesis.js';
const copy=()=>structuredClone(bundledSnapshot);
test('snapshot validates source IDs, schema, URLs and chart alignment',()=>{
  assert.ok(validateSnapshot(copy()));
  for(const edit of [s=>s.boards.memory.facts[0].sources=['fake'],s=>s.sources.hynix.url='javascript:alert(1)',s=>s.boards.ai.charts[0].series[0].values=[3],s=>s.boards.ai.html='<script/>',s=>s.sources.hynix.date='2026-02-31']){const s=copy();edit(s);assert.throws(()=>validateSnapshot(s))}
});
test('two consumers receive same immutable snapshot; corruption/offline keeps last good version',async()=>{
  const s=copy();s.version='2026-11-12.4';s.publishedAt=new Date().toISOString();s.boards.memory.change='测试：增加供给验证维度';const body=JSON.stringify(s);
  let broken=false,offline=false;
  const fetcher=async url=>{if(offline)throw new Error();return new Response(url.endsWith('latest.json')?JSON.stringify({schemaVersion:1,version:s.version,path:`snapshots/${s.version}.json`,sha256:broken?'0'.repeat(64):digest(body)}):body)};
  const a=createPublicationReader(fetcher),b=createPublicationReader(fetcher);
  assert.equal((await a()).snapshot.version,s.version);assert.deepEqual((await a()).snapshot,(await b()).snapshot);
  broken=true;assert.equal((await a()).snapshot.boards.memory.change,s.boards.memory.change);assert.ok((await a()).warning);
  offline=true;assert.equal((await a()).snapshot.version,s.version);
});
test('model draft does not silently publish; unauthorized evidence cannot enter model context',async()=>{
  let called=false,content='';
  const ctx={get:name=>name==='agentDefaultModel'?{currentSelection:()=>({provider:'test',model:'test'})}:{stream:async function*(o){called=true;content=o.messages[0].content[0].text;yield{type:'text-delta',text:JSON.stringify({changed:false,reason:'无实质新证据',review:[],board:copy().boards.memory})};yield{type:'finish',reason:{kind:'stop'}}}}};
  const item={url:'https://example.com/a',title:'DRAM价格',date:'2026-11-11',excerpt:'许可正文',rights:'authorized'};
  const r=await draftResearch({ctx,id:'memory',data:{news:{value:{items:[item,{...item,excerpt:'禁止正文',rights:'prohibited'}]}}},snapshot:copy()});
  assert.equal(r.status,'unchanged');assert.ok(called);assert.ok(!content.includes('禁止正文'));assert.equal(r.snapshot,undefined);
  called=false;await draftResearch({ctx,id:'memory',data:{news:{value:{items:[]}}},snapshot:copy()});assert.equal(called,false);
});
test('a sourced patch becomes review-required and cannot mutate the active baseline',async()=>{
  const original=copy();
  const make=(bad=false,incomplete=false)=>({get:name=>name==='agentDefaultModel'?{currentSelection:()=>({provider:'test',model:'test'})}:{stream:async function*(){yield{type:'text-delta',text:JSON.stringify({changed:true,reason:'新增证据',patch:{change:'增加价格观察'},review:[{field:'change',before:'旧',after:'新',basis:'原文',sourceIds:[bad?'missing':'hynix']}]})};yield{type:'finish',reason:{kind:incomplete?'max-tokens':'stop'}}}}});
  const data={news:{value:{items:[{url:'https://example.com/a',title:'存储',date:'2026-11-11',excerpt:'价格观察',rights:'authorized'}]}}};
  const r=await draftResearch({ctx:make(),id:'memory',data,snapshot:original});
  assert.equal(r.status,'review-required');assert.equal(r.snapshot.boards.memory.change,'增加价格观察');assert.notEqual(original.boards.memory.change,r.snapshot.boards.memory.change);
  await assert.rejects(()=>draftResearch({ctx:make(true),id:'memory',data,snapshot:original}));
  await assert.rejects(()=>draftResearch({ctx:make(false,true),id:'memory',data,snapshot:original}),/未采纳/);
});
