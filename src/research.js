// Dated editorial research. Never relabel this as live MCP output.
export const researchDate = "2026-11-12";
export const sources = {
  "hynix": {
    "title": "SK hynix 2026Q3 公告",
    "date": "2026-10-28",
    "url": "https://news.skhynix.com/en/q3-2026-business-results/",
    "locator": "LTA 与扩产段"
  },
  "samsung": {
    "title": "三星 2026Q3 公告",
    "date": "2026-10-29",
    "url": "https://news.samsung.com/global/samsung-electronics-announces-third-quarter-2026-results",
    "locator": "Capital Expenditures"
  },
  "niche": {
    "title": "Morgan Stanley · Old Memory: Peak Pricing Power?",
    "date": "2026-11-10",
    "locator": "用户提供报告，p1、p3；机构观点，非行业定论"
  },
  "pipeline": {
    "title": "Bernstein · Gigawatts versus Bragawatts",
    "date": "2026-11-10",
    "locator": "用户提供报告，p1、p3—4；项目概率模型，非已建容量"
  },
  "crwv": {
    "title": "CoreWeave 2026Q3 业绩公告",
    "date": "2026-11-10",
    "url": "https://www.sec.gov/Archives/edgar/data/1769628/000176962826000461/coreweave3q26earningspress.htm",
    "locator": "GAAP / Non-GAAP 财务摘要、资产负债表、展望"
  },
  "crwvcall": {
    "title": "CoreWeave 2026Q3 官方电话会",
    "date": "2026-11-10",
    "url": "https://investors.coreweave.com/",
    "locator": "知识库留存官方逐字稿 p2、p5—6；链接为 IR 入口"
  },
  "shprospectus": {
    "title": "胜宏科技 H 股招股书",
    "date": "2026-04-13",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300006_c.pdf",
    "locator": "物理 p209—211；2024/2025 实绩"
  },
  "shq3": {
    "title": "胜宏科技 2026 三季报",
    "date": "2026-10-30",
    "url": "https://static.cninfo.com.cn/finalpage/2026-10-30/1225644765.PDF",
    "locator": "p2、p13；2026/2025 年初至9月末"
  },
  "shupdate": {
    "title": "胜宏科技近期经营公告",
    "date": "2026-11-06",
    "url": "https://disc.static.szse.cn/download/disc/disk03/finalpage/2026-11-06/b1fd9238-ef02-4223-aeae-837d3fa53e3b.pdf",
    "locator": "p2；订单能见度与分阶段投产"
  }
};
export const research = {
  "memory": {
    "headline": "近端长约更稳，远期利润仍要分品类看",
    "summary": "不能把 NOR／DDR4 的定价风险外推到整个存储行业；也不能把 HBM 长约，套成兆易创新的利润保障。研究重心从“还涨多少”转向“高利润能维持多久”。",
    "change": "加入旧制程与主流存储分化、长约价带和供给响应。",
    "facts": [
      {
        "label": "SK hynix 已签 LTA 覆盖",
        "value": ">50%",
        "detail": "2027—2028 总产能；锁量、价格随约定价带调整",
        "sources": [
          "hynix"
        ]
      },
      {
        "label": "三星 2026Q3 集团资本开支",
        "value": "29 万亿韩元",
        "detail": "同比 +215.2%；包含 DS、显示等，非纯存储投入",
        "sources": [
          "samsung"
        ]
      }
    ],
    "charts": [
      {
        "title": "三星集团资本开支",
        "unit": "万亿韩元",
        "periods": [
          "2025Q3",
          "2026Q3"
        ],
        "series": [
          {
            "name": "季度资本开支",
            "values": [
              9.2,
              29
            ]
          }
        ],
        "note": "2025Q3 = 29 − 19.8；均为季度实绩。集团投入不能直接换算成存储新增 bit。",
        "sources": [
          "samsung"
        ]
      }
    ],
    "logic": [
      {
        "title": "先分产品，再判断涨价是否可持续",
        "body": "11月10日利基存储报告覆盖 DDR3/4、SLC/MLC NAND、NOR，明确不覆盖主流 DDR5 与 TLC/QLC NAND。其担忧是订单前置、消费需求走弱和供给恢复，不是“所有存储已经反转”。",
        "kind": "机构观点",
        "sources": [
          "niche"
        ]
      },
      {
        "title": "长约提高能见度，也让厂商更敢扩产",
        "body": "SK hynix 已签长约的数量覆盖2027—2028年逾半产能，价格仍在约定区间随市场变化。近端锁量与更远期新增供给可以同时发生；未披露的年份不能视作利润已受保护。",
        "kind": "事实与推论",
        "sources": [
          "hynix"
        ]
      },
      {
        "title": "涨幅放缓、价格下跌、利润见顶是三件事",
        "body": "先核合同价、出货 bit、库存及毛利率；再看制程迁移、良率和认证何时形成有效供给。若价格仍高而增速下降，不能只凭涨幅减速认定利润已下滑。",
        "kind": "研究判断",
        "sources": [
          "niche",
          "hynix"
        ]
      }
    ],
    "reassess": "主流产品也出现合同价下调、取消订单或库存持续累积，应下调判断；若扩产延后且实际出货保持强劲，则收窄供给宽松的假设。",
    "watch": [
      "按产品核对合同价与取消／重定价条款",
      "跟踪新增合格 bit，而不是只看厂房或资本开支",
      "把毛利率、存货和经营现金流放在同一期比较"
    ]
  },
  "ai": {
    "headline": "收入兑现更快，资金与履约的压力仍要逐笔拆开",
    "summary": "CoreWeave 新财报增强了近端交付与融资能见度，但高增长没有自动消除利息负担。看建设进度，更要看何时收款、哪些资金可用、旧设备能否续租。",
    "change": "纳入11月10日财报、客户预付款与项目可信度的新材料。",
    "facts": [
      {
        "label": "CoreWeave 2026Q3 收入",
        "value": "36.61 亿美元",
        "detail": "同比 +168.2%；公司季度实绩",
        "sources": [
          "crwv"
        ]
      },
      {
        "label": "调整后经营利润 / 净利息费用",
        "value": "3.79 / 8.46 亿美元",
        "detail": "同一季度；前者 Non-GAAP，后者 GAAP，不能当偿债覆盖率",
        "sources": [
          "crwv"
        ]
      }
    ],
    "charts": [
      {
        "title": "CoreWeave 季度收入",
        "unit": "亿美元",
        "periods": [
          "2025Q3",
          "2026Q3"
        ],
        "series": [
          {
            "name": "收入",
            "values": [
              13.65,
              36.61
            ]
          }
        ],
        "note": "季度收入并非 ARR、合同额或现金回款。",
        "sources": [
          "crwv"
        ]
      }
    ],
    "funding": [
      {
        "name": "现金及现金等价物＋有价证券",
        "value": "41.84 亿美元",
        "status": "9月末存量",
        "note": "41.22＋0.62；受限现金另列，不混入可用资金"
      },
      {
        "name": "已承诺但未提款的 DDTL",
        "value": "近50 亿美元",
        "status": "公司披露",
        "note": "按合同及设备条件提款，不是账上现金"
      },
      {
        "name": "未来三个月预付款与押金",
        "value": "约90 亿美元",
        "status": "公司预期",
        "note": "需要实际到账，并核对退款、使用限制和履约义务"
      },
      {
        "name": "在建资产",
        "value": "约93 亿美元",
        "status": "9月末资产",
        "note": "已投入、待转运营，不是新增流动性，不能再加作现金"
      }
    ],
    "logic": [
      {
        "title": "预付款改善资金时点，不等于提高经济利润",
        "body": "客户提前出钱能减少外部融资需要，但后续服务仍须交付。比较经营现金流时，要拆出预付款变动；旧设备续约收入还取决于价格、利用率与维护成本。",
        "kind": "研究判断",
        "sources": [
          "crwvcall"
        ]
      },
      {
        "title": "从“公布多少 GW”转向“哪些项目能交付”",
        "body": "逐项核对施工阶段、租户信用、开发商融资和当地审批。项目延期、永久取消和已通电产能不同；同一瓶颈可能利好存量算力租金，却拖慢新增硬件订单。",
        "kind": "研究判断",
        "sources": [
          "pipeline"
        ]
      },
      {
        "title": "把需求、交付和利润放在三只时钟上",
        "body": "收入增长支持交付进展；利息费用仍需由后续利润和现金覆盖。供给一旦宽松、预付条件转弱或旧 GPU 续租降价，应重算回报，而非沿用当前高租金。",
        "kind": "研究判断",
        "sources": [
          "crwv",
          "crwvcall"
        ]
      }
    ],
    "reassess": "预付款如期到账、授信完成提款且交付提速，可提高近端资金判断；延期、融资成本上升或旧设备续租价回落，则重新评估现金缺口与回报。",
    "watch": [
      "核对约90亿美元预付款是否到账及用途限制",
      "区分签约电力、已通电、客户验收与开始计费",
      "对照2026全年370—390亿美元资本开支指引与实际现金支付"
    ]
  },
  "pcb": {
    "headline": "高阶化已带来价值，下一关是合格交付与现金回报",
    "summary": "胜宏的历史实绩支持产品组合升级能提高价值量；新排单支持需求能见度。持续领先仍取决于良率、客户认证和现金兑现，不能由层数纪录直接推出长期独占。",
    "change": "补入 HDI 实绩、11月6日排单与投产进展，以及三季报现金压力。",
    "facts": [
      {
        "label": "胜宏 HDI 毛利率",
        "value": "22.5% → 43.5%",
        "detail": "2024 → 2025；产品组合与价格共同变化",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "label": "胜宏简化自由现金流",
        "value": "−82.03 亿元",
        "detail": "2026年前三季度；经营现金流 − 购建长期资产现金",
        "sources": [
          "shq3"
        ]
      }
    ],
    "charts": [
      {
        "title": "胜宏 HDI 收入与毛利",
        "unit": "亿元人民币",
        "periods": [
          "2024",
          "2025"
        ],
        "series": [
          {
            "name": "收入",
            "values": [
              15.20773,
              74.24728
            ]
          },
          {
            "name": "毛利",
            "values": [
              3.42598,
              32.3168
            ]
          }
        ],
        "note": "历史实绩。HDI 销售面积同期64.7→55.1万平方米；不是同型号板件单纯提价。",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "title": "胜宏扩张支出与经营现金流",
        "unit": "亿元人民币",
        "periods": [
          "2025前三季度",
          "2026前三季度"
        ],
        "series": [
          {
            "name": "经营现金流",
            "values": [
              23.83398963,
              35.2061733505
            ]
          },
          {
            "name": "购建长期资产现金",
            "values": [
              36.536925768,
              117.2385444325
            ]
          }
        ],
        "note": "合并累计口径；两项相减为简化自由现金流，不等同账面现金余额。",
        "sources": [
          "shq3"
        ]
      }
    ],
    "logic": [
      {
        "title": "价值量来自工艺组合，不只是层数",
        "body": "高阶 HDI 需要更复杂的压合、钻孔、对位与可靠性控制。售价上涨还要覆盖材料、工时、报废和折旧；普通面积扩产不等于高端合格产出增加。",
        "kind": "研究判断",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "title": "排单到2028年，不等于收入已锁定",
        "body": "11月6日公司披露高端产品排单延续至2028年，2027年起多地在建产能分阶段投产。排单与不可取消金额、首产与满产必须分开，新增产能仍要通过客户验收。",
        "kind": "公司披露",
        "sources": [
          "shupdate"
        ]
      },
      {
        "title": "看利润，也看扩产占用的现金",
        "body": "前三季度经营现金流35.21亿元，购建长期资产支付117.24亿元。现金支出领先回款并不自动否定成长，但需求或良率低于预期时，库存、折旧与融资会放大压力。",
        "kind": "事实与推论",
        "sources": [
          "shq3"
        ]
      }
    ],
    "reassess": "新规格认证、量产良率或客户验收延后，应下调兑现节奏；若高端占比提高且回款改善，可增强判断。CPO 或设计变化若降低板上电连接需求，也要重算单柜价值量。",
    "watch": [
      "分别核对材料认证、板件良率、验收与回款",
      "对照新产线进度与存货、应收、现金资本开支",
      "将高端子类增长与集团收入、净利润及摊薄 EPS 分开"
    ]
  }
};
