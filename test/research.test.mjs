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
  assert.equal(research.pcb.facts[1].value, '−82.03 亿元');
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
