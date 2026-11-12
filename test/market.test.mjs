import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCandles,weeklyCandles} from '../src/market.js';
test('daily OHLCV rejects missing/corrupt candles rather than fabricating them',()=>{
 const ts=Array.from({length:12},(_,i)=>1760000000+i*86400);
 const q={open:ts.map(()=>10),high:ts.map(()=>12),low:ts.map(()=>9),close:ts.map(()=>11),volume:ts.map(()=>100)};
 q.open[0]=null;q.high[1]=8;
 const input={chart:{result:[{meta:{symbol:'603986.SS',currency:'CNY',exchangeTimezoneName:'Asia/Shanghai'},timestamp:ts,indicators:{quote:[q]}}]}};
 assert.equal(parseCandles(input,'603986.SH').bars.length,10);
 assert.throws(()=>parseCandles(input,'MU'));
});
test('weekly candles preserve first open, last close, extrema and summed volume',()=>{
 const bars=[{date:'2026-11-09',open:10,high:12,low:9,close:11,volume:100},{date:'2026-11-10',open:11,high:14,low:8,close:13,volume:200},{date:'2026-11-16',open:13,high:15,low:12,close:14,volume:null}];
 assert.deepEqual(weeklyCandles(bars),[{date:'2026-11-09',open:10,high:14,low:8,close:13,volume:300},bars[2]]);
});
