// Shared research definitions contain methods, not stale investment conclusions.
export const boards = [
  {
    id: "memory",
    title: "存储产业跟踪",
    subtitle: "涨价，能否变成利润？",
    description:
      "分开看产品价格、供给调整和利润兑现，避免用一段行情替代整个产业判断。",
    symbol: "603986.SH",
    asset: "兆易创新",
    role: "存储设计",
    peers: [["MU", "美光科技"]],
    query: "存储 DRAM NAND 企业级SSD 合约价格 供给 美光 兆易创新 最新公告",
    terms: ["存储", "DRAM", "NAND", "SSD", "美光", "兆易", "HBM"],
    checks: [
      [
        "产品价格",
        "DRAM、NAND 与企业级 SSD 分开看；渠道报价不等于已签合同价格。",
        "存储 DRAM NAND 企业级SSD 合约价格 最新",
      ],
      [
        "供给变化",
        "扩产、产品切换与合格出货是否改变供需；规划产能不等于可售产能。",
        "美光 存储 扩产 HBM 供给 产能 最新",
      ],
      [
        "利润兑现",
        "收入、毛利率和经营现金流是否同步；存货涨价收益能否持续。",
        "兆易创新 美光 毛利率 存货 经营现金流 最新财报",
      ],
    ],
    question:
      "存储涨价主要发生在哪些产品？请用最新财搭子数据区分供给变化和利润兑现，列出会推翻判断的证据。",
  },
  {
    id: "ai",
    title: "AI 基建 · 成本与回报",
    subtitle: "投得多，还要赚得回来",
    description:
      "把投入资本、利润率和回报要求放在同一张表里。情景测算与经营事实分别呈现。",
    symbol: "300308.SZ",
    asset: "中际旭创",
    role: "光互联",
    peers: [
      ["MSFT", "微软"],
      ["NVDA", "英伟达"],
    ],
    query: "AI 基建 云计算 资本开支 现金流 微软 最新财报",
    terms: [
      "AI",
      "基建",
      "微软",
      "Microsoft",
      "Azure",
      "资本开支",
      "云计算",
      "英伟达",
    ],
    checks: [
      [
        "投入与投产",
        "资本开支何时形成可用产能？付款、交付与投产不能混成同一时点。",
        "微软 AI 数据中心 资本开支 投产 交付 最新财报",
      ],
      [
        "收入与成本",
        "验证利用率、价格、折旧和电力成本。云毛利率不能替代项目净利率。",
        "微软 Azure 云计算 收入 毛利率 折旧 最新财报",
      ],
      [
        "资本回报",
        "只用同范围、同期间的收入与净利润验证模型，不拿集团收入替代 AI 项目收入。",
        "AI 基建 资本回报 经营现金流 折旧 最新",
      ],
    ],
    question:
      "AI 基建投入能否带来足够回报？请从财搭子获取最新披露，分别说明资本投入、收入兑现和现金流，区分事实与假设。",
  },
  {
    id: "pcb",
    title: "PCB／CCL · 升级兑现",
    subtitle: "规格升级，订单兑现了吗？",
    description:
      "沿着材料认证、产能交付到盈利质量逐项跟踪，不把技术路线传闻当成业绩。",
    symbol: "600183.SH",
    asset: "生益科技",
    role: "覆铜板",
    peers: [
      ["002463.SZ", "沪电股份"],
      ["002916.SZ", "深南电路"],
    ],
    query: "PCB CCL 覆铜板 生益科技 沪电股份 高速材料 认证 订单 最新公告",
    terms: ["PCB", "CCL", "覆铜板", "生益", "沪电", "深南", "高速材料"],
    checks: [
      [
        "材料与认证",
        "M8／M9／M10 是规格线索。客户认证、材料路线与实际用量需要分别核对。",
        "PCB CCL M9 M10 高速材料 客户认证 最新",
      ],
      [
        "产能与交付",
        "扩产能否按期达到合格良率？区分计划、试产、量产和出货。",
        "生益科技 沪电股份 深南电路 扩产 良率 出货 最新公告",
      ],
      [
        "盈利与现金",
        "收入增长是否伴随毛利改善和回款；公司总收入不等于高端产品收入。",
        "生益科技 沪电股份 毛利率 应收账款 现金流 最新财报",
      ],
    ],
    question:
      "PCB/CCL 升级是否已经兑现？请通过财搭子工具核对材料认证、量产交付、毛利和现金流，逐项给证据，不足处保留未判定。",
  },
];
export function revenueThreshold(capital, roi, margin) {
  if (
    ![capital, roi, margin].every(Number.isFinite) ||
    capital <= 0 ||
    roi <= 0 ||
    margin <= 0
  )
    throw new Error("invalid scenario");
  return (capital * roi) / margin;
}
