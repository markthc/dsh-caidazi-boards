// Shared research definitions contain methods, not stale investment conclusions.
export const boards = [
  {
    id: "memory",
    title: "存储产业跟踪",
    subtitle: "涨价，能否变成利润？",
    description:
      "分开看利基存储、主流 DRAM 与 HBM：价格、长约和新增供给分别跟踪。",
    symbol: "603986.SH",
    asset: "兆易创新",
    role: "NOR／利基存储，不代表 HBM",
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
      "请分别核对 NOR/DDR4、主流DDR5、HBM与企业级SSD的合同价、出货、库存、长约价带和新增有效供给。哪些证据支持高利润延续，哪些已经削弱判断？不要以兆易创新代表全部存储。",
  },
  {
    id: "ai",
    title: "AI 基建 · 成本与回报",
    subtitle: "投得多，还要赚得回来",
    description:
      "沿着项目交付、客户预付款与资本回报，核对增长如何变成可用现金。",
    symbol: "300308.SZ",
    asset: "中际旭创",
    role: "光互联",
    peers: [
      ["MSFT", "微软"],
      ["NVDA", "英伟达"],
      ["CRWV", "CoreWeave"],
    ],
    query: "AI 基建 CoreWeave CRWV 客户预付款 融资 交付 资本开支 最新财报",
    terms: [
      "AI",
      "基建",
      "微软",
      "Microsoft",
      "Azure",
      "资本开支",
      "云计算",
      "英伟达",
      "CoreWeave",
      "CRWV",
      "预付款",
    ],
    checks: [
      [
        "投入与投产",
        "资本开支何时形成可用产能？付款、交付与投产不能混成同一时点。",
        "CoreWeave AI 数据中心 通电 验收 交付 最新财报",
      ],
      [
        "收入与成本",
        "验证利用率、续租价格、折旧和利息。客户预付款不等于经济利润。",
        "CoreWeave 预付款 经营利润 净利息 GPU续租 最新财报",
      ],
      [
        "资本回报",
        "只用同范围、同期间的收入与净利润验证模型，不拿集团收入替代 AI 项目收入。",
        "AI 基建 资本回报 经营现金流 折旧 最新",
      ],
    ],
    question:
      "核对CoreWeave最新预付款到账、DDTL提款、通电验收及旧GPU续租进展。现金、未提款授信、预计预付款、在建资产分别列示，不直接相加为可用资金；比较经营利润、利息与真实现金支付。",
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
      ["300476.SZ", "胜宏科技"],
    ],
    query: "PCB CCL 胜宏科技 沪电股份 生益科技 HDI 良率 交付 现金流 最新公告",
    terms: ["PCB", "CCL", "覆铜板", "生益", "沪电", "深南", "胜宏", "HDI", "高速材料"],
    checks: [
      [
        "材料与认证",
        "M8／M9／M10 是规格线索。客户认证、材料路线与实际用量需要分别核对。",
        "PCB CCL M9 M10 高速材料 客户认证 最新",
      ],
      [
        "产能与交付",
        "扩产能否按期达到合格良率？区分计划、试产、量产和出货。",
        "胜宏科技 沪电股份 深南电路 扩产 良率 验收 最新公告",
      ],
      [
        "盈利与现金",
        "收入增长是否伴随毛利改善和回款；公司总收入不等于高端产品收入。",
        "胜宏科技 生益科技 沪电股份 毛利率 应收账款 资本开支 现金流 最新财报",
      ],
    ],
    question:
      "核对胜宏、沪电与生益的高端认证、合格产出、验收与回款。把HDI/数据通讯/集团口径分开，比较新增资本开支、经营现金流、库存及摊薄EPS；检查CPO和客户第二供应源的反证。",
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
