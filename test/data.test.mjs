import test from "node:test";
import assert from "node:assert/strict";
import {
  decode,
  quoteFrom,
  historyFrom,
  citationsFrom,
  safeError,
} from "../src/data.js";
import { boards, revenueThreshold } from "../src/boards.js";
test("invalid key is rejected, not treated as empty data", () =>
  assert.throws(
    () =>
      decode({
        isError: true,
        content: [{ type: "text", text: "401 API_KEY_INVALID" }],
      }),
    (e) => e.code === "auth",
  ));
test("untrusted errors do not expose credentials", () =>
  assert.equal(
    safeError(new Error("secret credential")).message,
    "请求未完成，请稍后重试",
  ));
test("quote parser preserves the source timestamp and rejects unknown shapes", () => {
  const q = quoteFrom(
    "| 股票代码 | 股票名称 | 交易时间 | 最新价 | 涨跌幅 |\n| MU | 美光 | 2026-11-11 16:00:00 | 811.30美元 | 11.89% |",
    "MU",
  );
  assert.equal(q.asOf, "2026-11-11 16:00:00");
  assert.throws(() => quoteFrom("up 10%", "MU"));
});
test("synthetic and incomplete prices become gaps, never invented prices", () => {
  const v = historyFrom(
    {
      data: {
        items: [
          {
            symbol: "x",
            days: [
              {
                trade_date: "20261111",
                data_status: "partial",
                bars: [
                  {
                    bar_time: "2026-11-11T09:31:00+08:00",
                    close: 10,
                    is_synthetic: true,
                  },
                  {
                    bar_time: "2026-11-11T09:32:00+08:00",
                    close: 11,
                    is_complete: true,
                  },
                  {
                    bar_time: "2026-11-11T09:33:00+08:00",
                    close: 12,
                    is_complete: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    "x",
  );
  assert.deepEqual(
    v.days[0].bars.map((x) => x.close),
    [null, 11, null],
  );
});
test("citations exclude forbidden, irrelevant, conflicting dates and unsafe links", () => {
  const base = {
    title: "存储企业公告",
    source: "example.com",
    publishTime: "2026-11-10",
    url: "https://example.com/a",
    usageRights: "citation_only",
  };
  const v = citationsFrom(
    {
      search_result: [
        base,
        { ...base, url: "https://example.com/b", usageRights: "prohibited" },
        { ...base, url: "javascript:alert(1)" },
        { ...base, url: "https://example.com/c", content: "2026-11-11 公告" },
        { ...base, url: "https://example.com/d", title: "无关消息" },
        { ...base, url: "https://example.com/e", publishTime: "2027-01-01" },
      ],
    },
    boards[0],
    new Date("2026-11-12T00:00:00Z"),
  );
  assert.equal(v.items.length, 1);
  assert.equal(v.items[0].title, base.title);
  assert.equal(v.items[0].content, undefined);
});
test("revenue model is consistent and rejects invalid assumptions", () => {
  assert.equal(revenueThreshold(100, 15, 24), 62.5);
  assert.throws(() => revenueThreshold(100, 15, 0));
});

test("latest day without real bars does not become an invalid chart", () => {
  const v = historyFrom(
    {
      data: {
        items: [
          {
            symbol: "x",
            days: [
              {
                trade_date: "20261110",
                bars: [{ bar_time: "2026-11-10T09:31:00+08:00", close: 10 }],
              },
              {
                trade_date: "20261111",
                bars: [
                  {
                    bar_time: "2026-11-11T09:31:00+08:00",
                    close: 10,
                    is_synthetic: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    "x",
  );
  assert.deepEqual(
    v.days.map((x) => x.date),
    ["20261110"],
  );
});
