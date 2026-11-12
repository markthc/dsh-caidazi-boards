// Daily OHLCV comes from Yahoo's public chart endpoint; it is not MCP minute data.
export function yahooSymbol(symbol) {
  if (/^\d{6}\.SH$/.test(symbol)) return symbol.replace('.SH', '.SS');
  if (/^\d{6}\.SZ$/.test(symbol) || /^[A-Z][A-Z0-9.-]{0,12}$/.test(symbol)) return symbol;
  throw new Error('Unsupported chart symbol');
}
export function parseCandles(payload, symbol) {
  const r = payload?.chart?.result?.[0];
  if (!r || r.meta?.symbol !== yahooSymbol(symbol)) throw new Error('Chart symbol mismatch');
  const quote = r.indicators?.quote?.[0];
  const bars = (r.timestamp || []).flatMap((stamp, i) => {
    const values = ['open', 'high', 'low', 'close'].map(k => quote?.[k]?.[i]);
    if (!Number.isFinite(stamp) || !values.every(v => Number.isFinite(v) && v > 0)) return [];
    const [open, high, low, close] = values;
    if (high < Math.max(open, close) || low > Math.min(open, close) || high < low) return [];
    const date = new Intl.DateTimeFormat('en-CA', {timeZone:r.meta.exchangeTimezoneName || 'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(stamp * 1000));
    return [{date, open, high, low, close, volume: Number.isFinite(quote.volume?.[i]) && quote.volume[i] >= 0 ? quote.volume[i] : null}];
  });
  if (bars.length < 10) throw new Error('Insufficient daily candles');
  return {symbol, currency:r.meta.currency, timezone:r.meta.exchangeTimezoneName, source:'Yahoo Finance', sourceUrl:`https://finance.yahoo.com/quote/${encodeURIComponent(yahooSymbol(symbol))}/history/`, adjustment:'未按股息复权；历史价格按数据源拆股口径', bars};
}
export async function loadCandles(symbol, signal) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol(symbol))}?interval=1d&range=1y`;
  const response = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0'}, signal:AbortSignal.any([AbortSignal.timeout(20000), ...(signal ? [signal] : [])])});
  if (!response.ok) throw new Error('Daily chart temporarily unavailable');
  return parseCandles(await response.json(), symbol);
}
export function weeklyCandles(bars) {
  const groups = new Map();
  for (const bar of bars) {
    const d = new Date(bar.date+'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - (d.getUTCDay()+6)%7);
    const key = d.toISOString().slice(0,10), prev = groups.get(key);
    if (!prev) groups.set(key, {...bar, date:key});
    else {prev.high=Math.max(prev.high,bar.high);prev.low=Math.min(prev.low,bar.low);prev.close=bar.close;prev.volume=prev.volume===null||bar.volume===null?null:prev.volume+bar.volume;}
  }
  return [...groups.values()];
}
