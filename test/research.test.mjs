import test from 'node:test';
import assert from 'node:assert/strict';
import { research, researchDate, sources } from '../src/research.js';

test('financial charts preserve source units and derived cash-flow figure', () => {
  const [hdi, cash] = research.pcb.charts;
  assert.deepEqual(hdi.series[0].values, [1520773, 7424728].map(v => v / 100000));
  assert.deepEqual(hdi.series[1].values, [342598, 3231680].map(v => v / 100000));
  assert.deepEqual(cash.series[0].values, [2383398963, 3520617335.05].map(v => v / 1e8));
  assert.deepEqual(cash.series[1].values, [3653692576.8, 11723854443.25].map(v => v / 1e8));
  const fcf = cash.series[0].values[1] - cash.series[1].values[1];
  assert.equal(fcf.toFixed(2), '-82.03');
  assert.equal(research.pcb.facts.find(f=>f.label.includes('现金流')).value, '−82.03 亿元');
  assert.deepEqual(research.ai.charts[0].series[0].values, [1365, 3661].map(v => v / 100));
  assert.equal(((29 / 9.2 - 1) * 100).toFixed(1), '215.2');
});

test('all research evidence has valid dated sources and chart periods align', () => {
  assert.ok(Date.parse(researchDate) <= Date.now());
  const check = ids => ids.forEach(id => {
    assert.ok(sources[id], `missing source ${id}`);
    assert.ok(sources[id].date <= researchDate);
    if (sources[id].url) assert.equal(new URL(sources[id].url).protocol, 'https:');
  });
  for (const r of Object.values(research)) {
    [...r.facts, ...r.logic, ...r.charts].forEach(v => check(v.sources));
    for (const c of r.charts) {
      assert.ok(c.unit);
      c.series.forEach(s => {
        assert.equal(s.values.length, c.periods.length);
        assert.ok(s.values.every(v => Number.isFinite(v) && v >= 0));
      });
    }
  }
});

test('policy snapshot keeps election, building and capacity scopes separate',()=>{
  const r=research.policy,g=r.geography,tx=g.states.find(s=>s.code==='TX'),la=g.states.find(s=>s.code==='LA');
  assert.equal(g.states.length,51);assert.equal(g.states.filter(s=>s.capacity).length,8);
  assert.deepEqual(['operating','construction','planned'].map(k=>g.states.reduce((n,s)=>n+s.buildings[k],0)),[1426,537,2675]);
  assert.deepEqual(tx.buildings,{operating:172,construction:116,planned:533});
  assert.deepEqual(tx.capacity,{existing:9,construction:18});assert.equal(la.capacity.existing,null);
  assert.equal(g.states.find(s=>s.code==='CA').capacity,null);
  assert.equal(tx.incumbent.party,'R');assert.equal(tx.winner.party,'D');
  for(const code of ['AK','KS']){const s=g.states.find(s=>s.code===code);assert.equal(s.status,'pending');assert.equal(s.winner,null)}
  assert.equal(g.asOf,'2026-11-11');assert.equal(g.capacityPeriod,'2026 H1');
  assert.deepEqual(r.charts[1].series[0].values,[4216,4306,4371]);assert.deepEqual(r.charts[1].periods,['2025','2026F','2027F']);
});
