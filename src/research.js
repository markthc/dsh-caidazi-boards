// Source-backed fallback; public snapshots update content without a plugin upgrade.
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
  },
  "crwvdeck": {
    "title": "CoreWeave 2026Q3 业绩演示",
    "date": "2026-11-10",
    "url": "https://investors.coreweave.com/",
    "locator": "官方演示 p13、15、16；RPO与资本开支定义"
  },
  "search_ab33cec54bd6": {
    "title": "存储又在酝酿新一轮涨价",
    "date": "2026-11-11",
    "url": "https://www.jwview.com/jingwei/html/11-11/696593.shtml",
    "locator": "已核对中新经纬转载蓝鲸新闻原文；DRAM续创新高段，转引DRAMeXchange。原文未明确DDR代际，不能外推DDR5或HBM。"
  },
  "cleanview": {
    "title": "Cleanview · 美国楼栋阶段",
    "date": "2026-11-11",
    "url": "https://www.cleanview.co/data-centers/us",
    "locator": "全国州表：1,426已投运／537在建／2,675规划；楼栋而非园区或MW。11/12读取。"
  },
  "cleanview-old": {
    "title": "Cleanview · 11月4日留存快照",
    "date": "2026-11-04",
    "url": "https://www.cleanview.co/data-centers/us",
    "locator": "旧版来源留存：1,418／564／2,555栋；现链接已更新。两期差异可能含样本及分类调整，不直接归因于项目开停工。"
  },
  "elections": {
    "title": "ABC / AP · 州长选举结果",
    "date": "2026-11-12",
    "url": "https://abcnews.com/Elections/2026-us-governor-election-results-live-map/",
    "locator": "36场选举内嵌AP数据：34已判、AK/KS未判；按winner标志，不按领先自行判定。媒体判定非官方认证。"
  },
  "governors": {
    "title": "NGA · 现任州长",
    "date": "2026-11-05",
    "url": "https://www.nga.org/Governors/",
    "locator": "沿用11/5已核现任信息；本轮主站连接失败，未改核验日期。非竞选州用现任，DC无州长。"
  },
  "jll": {
    "title": "JLL · 北美数据中心 2026H1",
    "date": "2026-08-11",
    "url": "https://www.jll.com/en-us/newsroom/data-center-demand-exceeds-expectations-in-h1-2026",
    "locator": "市场容量图（整数GW约数），8个单州和2个跨州区域；TX正文合计26GW。11/12复核，非11月新统计。"
  },
  "jll-chart": {
    "title": "JLL · 在运与在建容量图",
    "date": "2026-08-10",
    "url": "https://public.flourish.studio/visualisation/29927476/",
    "locator": "公开嵌入图底表：Texas 9/18、Virginia 9/4、Ohio 4/3、Louisiana空/7、Georgia3/4、Arizona2/2、Indiana1/3、Wyoming1/3（GW）。"
  },
  "congress2026": {
    "title": "AP / MPR · 国会选举结果",
    "date": "2026-11-04",
    "url": "https://www.mprnews.org/story/2026/11/04/democrats-win-the-us-house-and-take-unified-control-of-congress",
    "locator": "民主党赢得众院与参院控制权的选举报道；胜选不等于新国会已就任。"
  },
  "s4214": {
    "title": "GovInfo · S.4214 状态",
    "date": "2026-03-25",
    "url": "https://www.govinfo.gov/bulkdata/BILLSTATUS/119/s/BILLSTATUS-119s4214.xml",
    "locator": "11/12读取；最新行动仍是3/25两读后转商务、科学和运输委员会；未成为全国禁令。"
  },
  "ratepayer": {
    "title": "Husted · 电费保护法案进展",
    "date": "2026-09-17",
    "url": "https://www.husted.senate.gov/media/press-releases/husted-bill-to-protect-americans-from-footing-the-bill-for-new-data-centers-blocked-from-passage/",
    "locator": "9/16众院417–3通过；9/17参院一致同意程序受阻。本条仅说明该已核动作，不推定11月最终状态。"
  },
  "eia-survey": {
    "title": "EIA · 数据中心用能调查回函",
    "date": "2026-04-09",
    "url": "https://www.warren.senate.gov/imo/media/doc/sen_elizabeth_warren_-_eia.pdf",
    "locator": "正式回函：调查开发、PRA程序与自愿试点；不等于全国强制调查已经实施。"
  },
  "warren-hawley": {
    "title": "Warren / Hawley · 用能透明度",
    "date": "2026-04-15",
    "url": "https://www.warren.senate.gov/newsroom/press-releases/warren-hawley-secure-mandatory-energy-use-reporting-requirements-for-data-centers/",
    "locator": "民主党Warren与共和党Hawley共同推动，结合EIA正式回函理解实施阶段。"
  },
  "steo": {
    "title": "EIA · 11月短期能源展望",
    "date": "2026-11-10",
    "url": "https://www.eia.gov/outlooks/steo/pdf/steo_full.pdf",
    "locator": "Table 7a；模型截止11/5；2026/2027为预测。总用电量4,216/4,306/4,371 TWh；居民电价17.24/18.17/18.68美分/kWh。动态链接以后可能换版。"
  },
  "local-news": {
    "title": "澎湃 · 地方数据中心限制",
    "date": "2026-11-11",
    "url": "https://www.thepaper.cn/newsDetail_forward_34453611",
    "locator": "地方案例转述：Oakland延长、Brownsville 90天、San Marcos禁新建；非全州禁令。报道中未拆口径的全国400项未采用。"
  },
  "doe-load": {
    "title": "DOE / LBNL · 数据中心用电研究",
    "date": "2024-12-20",
    "url": "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers",
    "locator": "2023年176 TWh实绩估计，2028年325–580 TWh预测区间；保留原报告版本，不改写为最新预测。"
  },
  "trump-eo": {
    "title": "白宫 · EO14318",
    "date": "2025-07-23",
    "url": "https://www.whitehouse.gov/presidential-actions/2025/07/accelerating-federal-permitting-of-data-center-infrastructure/",
    "locator": "加速联邦数据中心基础设施许可；FAST-41、环境审查、联邦土地与融资支持；不是所有项目自动获批。"
  },
  "oakland": {
    "title": "Oakland · 暂停延期条例",
    "date": "2026-11-10",
    "url": "https://oakland.legistar1.com/oakland/attachments/a4d83bd8-7902-494e-a4bb-93142612a96f.pdf",
    "locator": "27-0178；第2、4、11节：现有暂停至11/20，随后衔接至2027-10-05；如提前通过新规则可提前结束。"
  },
  "oakland-vote": {
    "title": "Oakland · 官方会议结果",
    "date": "2026-11-10",
    "url": "https://webapi.legistar.com/v1/oakland/events/9609/eventitems?AgendaNote=1&MinutesNote=1&Attachments=1",
    "locator": "27-0178：Approved for Final Passage，Passed，8票同意；会议纪要当前标DRAFT。"
  }
};
export const research = {
  "memory": {
    "headline": "近端长约更稳，远期利润仍要分品类看",
    "summary": "10月DDR 8Gb合约价仍在上涨，支持近端价格韧性；但这一规格不能代表全部DRAM，更不能代表NAND或HBM。结合长约与供给投入，判断重点仍是高利润能维持多久。",
    "change": "新增9—10月DDR 8Gb合约价对比及产品口径约束；保留近端长约更稳、远期利润分品类验证的判断。",
    "facts": [
      {
        "label": "DDR 8Gb 平均合约价",
        "value": "27.5 美元",
        "detail": "2026年10月；9月26美元，环比+5.77%。媒体转引DRAMeXchange，原文未明确DDR代际。",
        "sources": [
          "search_ab33cec54bd6"
        ]
      },
      {
        "label": "SK hynix 长约锁量",
        "value": ">50%",
        "detail": "覆盖2027—2028总产能；价格在约定价带内调整",
        "sources": [
          "hynix"
        ]
      },
      {
        "label": "三星集团资本开支",
        "value": "29 万亿韩元",
        "detail": "2026Q3；同比+215.2%，不等同于新增存储产能",
        "sources": [
          "samsung"
        ]
      }
    ],
    "charts": [
      {
        "title": "DDR 8Gb（1G×8）平均合约价",
        "unit": "美元",
        "periods": [
          "2026年9月",
          "2026年10月"
        ],
        "series": [
          {
            "name": "平均合约价",
            "values": [
              26,
              27.5
            ]
          }
        ],
        "note": "中新经纬转载蓝鲸新闻，转引DRAMeXchange；仅两个月披露点，非连续行情。原文未明确DDR代际，不能映射为DDR5或HBM。",
        "sources": [
          "search_ab33cec54bd6"
        ]
      },
      {
        "title": "SK hynix：收入、经营利润与净利润",
        "unit": "万亿韩元",
        "periods": [
          "2025Q3",
          "2026Q3"
        ],
        "series": [
          {
            "name": "收入",
            "values": [
              24.4489,
              104.6155
            ]
          },
          {
            "name": "经营利润",
            "values": [
              11.3834,
              83.3338
            ]
          },
          {
            "name": "净利润",
            "values": [
              12.5975,
              39.7756
            ]
          }
        ],
        "note": "K-IFRS季度初步实绩；经营利润与净利润差异不能忽略。",
        "sources": [
          "hynix"
        ]
      },
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
        "body": "这次合约价数据支持单品近端价格韧性，但不直接证明行业毛利率、现金流或利润持续期。继续对照各品类的出货、库存、制程迁移与供给兑现；不能把涨幅放缓等同于价格下跌。",
        "kind": "研究判断",
        "sources": [
          "search_ab33cec54bd6",
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
    ],
    "dimensions": [
      {
        "title": "利基存储",
        "signal": "消费端需求、备货和供给恢复共同定价",
        "body": "NOR、DDR3/4与SLC/MLC NAND单独跟踪。渠道涨价不等于所有客户接受新的合同价格；订单前置也可能透支下一期采购。",
        "watch": "合同价下调、取消订单、终端库存继续增加",
        "sources": [
          "niche"
        ]
      },
      {
        "title": "主流 DRAM / NAND",
        "signal": "单品合约价续涨，不能外推全部存储",
        "body": "报道转引的DDR 8Gb（1G×8）合约价从9月26美元升至10月27.5美元，环比+5.77%。原文未明确DDR代际；DDR5、NAND仍需各自合同价、出货bit与库存证据。",
        "watch": "按产品核对量价及库存的同向变化",
        "sources": [
          "search_ab33cec54bd6",
          "niche",
          "hynix"
        ]
      },
      {
        "title": "HBM 与长约",
        "signal": "近端锁量提高能见度，远期利润仍有变量",
        "body": "14家大客户的LTA通常为5年；公司披露超过2027/28总产能50%的数量已锁定，价格随约定区间调整。未披露年份不视作利润保险。",
        "watch": "价格条款、客户验收、有效出货与2029年后覆盖",
        "sources": [
          "hynix"
        ]
      },
      {
        "title": "资本开支与供给",
        "signal": "投资增加先改变未来供给，再影响盈利持续期",
        "body": "三星集团Q3投入从9.2升至29万亿韩元。需要继续拆分存储用途、投产日、制程迁移及良率；集团金额不能直接换算成新增bit。",
        "watch": "新增合格bit产出、资本开支落地与库存回升",
        "sources": [
          "samsung",
          "hynix"
        ]
      }
    ]
  },
  "ai": {
    "headline": "收入兑现更快，资金与履约的压力仍要逐笔拆开",
    "summary": "CoreWeave 新财报增强了近端交付与融资能见度，但高增长没有自动消除利息负担。看建设进度，更要看何时收款、哪些资金可用、旧设备能否续租。",
    "change": "纳入11月10日财报、客户预付款与项目可信度的新材料。",
    "facts": [
      {
        "label": "CoreWeave 季度收入",
        "value": "36.61 亿美元",
        "detail": "2026Q3；同比+168.2%，季度实绩",
        "sources": [
          "crwv"
        ]
      },
      {
        "label": "收入积压订单",
        "value": "1,325 亿美元",
        "detail": "9月末：RPO 1,323亿＋其他估计未来收入2亿；须实际交付",
        "sources": [
          "crwvdeck"
        ]
      },
      {
        "label": "经营现金流 − 购建资产现金",
        "value": "−74.66 亿美元",
        "detail": "2026Q3：19.75−94.41；简化现金缺口，不是全部融资需求",
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
      },
      {
        "title": "收入增长与现金投入的速度",
        "unit": "亿美元",
        "periods": [
          "2025Q3",
          "2026Q3"
        ],
        "series": [
          {
            "name": "经营现金流",
            "values": [
              16.89,
              19.75
            ]
          },
          {
            "name": "现金购建PP&E",
            "values": [
              32.79,
              94.41
            ]
          }
        ],
        "note": "季度现金流；公司定义的CapEx含融资租赁等，2026Q3为145.11亿美元，不能与现金支出混用。",
        "sources": [
          "crwv",
          "crwvdeck"
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
    ],
    "dimensions": [
      {
        "title": "需求 → 交付 → 计费",
        "signal": "合同储备是能见度，收入才是兑现",
        "body": "1325亿美元backlog与1323亿美元RPO均不是已回款。需要对照通电、客户验收、服务可用及收入确认条件。",
        "watch": "确认收入、投产和验收进度是否同步",
        "sources": [
          "crwv",
          "crwvdeck"
        ]
      },
      {
        "title": "预付款与可用资金",
        "signal": "约90亿美元是未来收款预期",
        "body": "其中超过30亿美元对应此前已全部付清的既有设施。预付款改善融资时点，但服务义务仍存在，不能把款项全部视作新增经济利润。",
        "watch": "到账金额、退款约束和履约支出",
        "sources": [
          "crwvcall"
        ]
      },
      {
        "title": "资产融资与母公司资本",
        "signal": "母公司少筹资，不等于集团不加杠杆",
        "body": "CFO预计截至2027年底额外母公司资本少于50亿美元；资产层面融资仍是来源。账面recourse与non-recourse债务合计468.73亿美元，不含租赁负债。",
        "watch": "逐设施核对提款、母公司担保及还本安排",
        "sources": [
          "crwv",
          "crwvcall"
        ]
      },
      {
        "title": "增长与资本回报",
        "signal": "收入增长尚未覆盖融资和扩张成本",
        "body": "Q3调整后经营利润3.79亿美元、净利息8.46亿美元；前者Non-GAAP、后者GAAP，差额不是严格覆盖倍数。租金、利用率、折旧和旧GPU续租仍决定回报。",
        "watch": "利润、利息、再投资与现金支付是否改善",
        "sources": [
          "crwv"
        ]
      }
    ]
  },
  "pcb": {
    "headline": "高阶化已带来价值，下一关是合格交付与现金回报",
    "summary": "胜宏的历史实绩支持产品组合升级能提高价值量；新排单支持需求能见度。持续领先仍取决于良率、客户认证和现金兑现，不能由层数纪录直接推出长期独占。",
    "change": "补入 HDI 实绩、11月6日排单与投产进展，以及三季报现金压力。",
    "facts": [
      {
        "label": "胜宏 HDI 收入",
        "value": "15.21 → 74.25 亿元",
        "detail": "2024 → 2025；高阶产品组合变化，不是简单按面积涨价",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "label": "胜宏 HDI 毛利率",
        "value": "22.5% → 43.5%",
        "detail": "2024 → 2025；仍需核对良率、产品组合与持续性",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "label": "经营现金流 − 购建资产现金",
        "value": "−82.03 亿元",
        "detail": "2026年前三季度：35.21−117.24；简化自由现金流",
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
    ],
    "dimensions": [
      {
        "title": "规格价值",
        "signal": "更高价值量来自材料、工序与良率的组合",
        "body": "2024到2025年HDI销售面积由64.7降至55.1万平方米，收入反而增加。不能用面积变化或层数纪录单独解释定价。",
        "watch": "同规格价格、工序、报废和客户组合",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "title": "认证与稳定量产",
        "signal": "高阶工艺需要客户验收才成为收入",
        "body": "材料参数改善、板件认证和稳定良率是不同阶段。普通产线的扩张不等于高端合格产出，ABF用材料与板级PCB/CCL也须分别验证。",
        "watch": "客户认证、批量交付、有效产出",
        "sources": [
          "shprospectus"
        ]
      },
      {
        "title": "排单与产能",
        "signal": "排单延续至2028，仍不等于不可取消订单",
        "body": "11月6日公告披露高端排单及北美大客户、ASIC需求；2027年起多地在建产能分阶段投产。首产、满产与实际回款各有时钟。",
        "watch": "订单金额与约束、新产线验收、产能爬坡",
        "sources": [
          "shupdate"
        ]
      },
      {
        "title": "利润与现金",
        "signal": "扩产现金领先回款，要看投入后的兑现",
        "body": "前三季度经营现金流35.21亿元、购建长期资产117.24亿元；前者较同期增加11.38亿元，后者增加80.70亿元。增长不能只用利润表来验证。",
        "watch": "应收、存货、现金资本开支与每股盈利",
        "sources": [
          "shq3"
        ]
      }
    ]
  },
  "policy": {
    "headline": "先改变成本归属与项目筛选，再看建设总量是否收缩",
    "summary": "民主党赢得国会两院、德州与佐治亚州长选举，增加政策调整预期；新任尚未就任，不能直接推出全国停建。两党的交集是居民电费保护与用能透明度。对投资更有区分度的，是项目是否拿到供电、地方许可，以及能否把新增成本传给客户。",
    "change": "楼栋阶段更新至11月11日；补11月EIA用电与电价展望，重核州长胜选标记与联邦提案阶段。JLL容量仍为2026H1原口径。",
    "facts": [
      {
        "label": "美国数据中心在建楼栋",
        "value": "537 栋",
        "detail": "Cleanview 11/11追踪；另有1,426栋已投运、2,675栋规划。规划不等于开工，楼栋不等于MW。",
        "sources": [
          "cleanview"
        ]
      },
      {
        "label": "德州在建市场容量",
        "value": "约 18 GW",
        "detail": "JLL 2026H1；在运约9GW。不是11月实时值，也不是全德州IT容量普查。",
        "sources": [
          "jll",
          "jll-chart"
        ]
      },
      {
        "label": "2026年全美居民零售电价预测",
        "value": "18.17 美分/kWh",
        "detail": "EIA 11月展望；2025年17.24。居民价格体现民生约束，不是数据中心合同电价。",
        "sources": [
          "steo"
        ]
      }
    ],
    "dimensions": [
      {
        "title": "民主党 · 国会与州长选举",
        "signal": "胜选改变议程，不立即改变生效规则",
        "body": "AP报道民主党赢得国会两院。ABC/AP判定Gina Hinojosa赢得德州、Keisha Bottoms赢得佐治亚；现任仍分别是Greg Abbott与Brian Kemp。立法、行政权限和地方分区审批必须分别看。",
        "watch": "新任就职后的正式法案、行政命令与实施细则；竞选表态不当作现行禁令。",
        "sources": [
          "congress2026",
          "elections",
          "governors"
        ]
      },
      {
        "title": "共和党 · 联邦许可加速",
        "signal": "行政加速已发布，项目仍要逐项获批",
        "body": "特朗普于2025-07-23发布EO14318，推动联邦环境审查、FAST-41、合格项目融资与适当联邦土地利用。联邦加速不能代替州、市县审批，更不能代替实际可交付电力。",
        "watch": "各机构具体执行、项目资格、环境审查与地方审批是否形成真实交付。",
        "sources": [
          "trump-eo"
        ]
      },
      {
        "title": "跨党派 · 电费由谁承担",
        "signal": "保护居民是共识，路径仍有争议",
        "body": "Husted新闻稿记录：Ratepayer Protection Act于9/16获众院417–3通过，9/17参院一致同意程序受阻。这是已核的程序节点，不能写成全国规则已生效。",
        "watch": "后续参院动作、最终文本与生效条件；是否要求数据中心承担专用供电和输配电成本。",
        "sources": [
          "ratepayer"
        ]
      },
      {
        "title": "跨党派 · 用能披露",
        "signal": "Warren＋Hawley推动，调查仍需实施程序",
        "body": "民主党Warren与共和党Hawley共同要求数据中心用能透明度。EIA正式回函谈调查开发、PRA公众意见程序及自愿试点，不能把议员新闻稿标题当成全国强制调查已经运行。",
        "watch": "正式调查表、覆盖门槛、OMB批准及首次公开数据。",
        "sources": [
          "warren-hawley",
          "eia-survey"
        ]
      },
      {
        "title": "暂停建设 · 联邦提案与地方条例",
        "signal": "全国提案未通过，Oakland地方延期已通过",
        "body": "S.4214由独立派Sanders提出，最新行动仍为3/25转委员会。Oakland于11/10以8票通过延期条例：11/20后衔接延长至2027-10-05，如提前通过新规则可提前结束。地方通过不能外推为全州或全国停建。",
        "watch": "适用定义、管辖边界、已有项目处置与新规则出台；会议纪要当前标DRAFT，法案状态为Passed。",
        "sources": [
          "s4214",
          "oakland",
          "oakland-vote"
        ]
      }
    ],
    "logic": [
      {
        "title": "把政策风险拆成四个可核对的问题",
        "kind": "研究判断",
        "body": "项目在哪个市县？谁批准土地用途？供电协议是否已签且有可交付日期？专用线路、备用电源和保障成本由谁付？同一州内，这四项的差异通常比单纯红蓝标签更有解释力。",
        "sources": [
          "ratepayer",
          "local-news"
        ]
      },
      {
        "title": "有电、有许可不自动等于高回报",
        "kind": "传导逻辑",
        "body": "供电稀缺可能提高已交付容量的价值，但额外电力成本、租户信用和合同转嫁条款决定运营商能否留住利润。供配电、热管理订单也要核对验收与回款，不能直接从政策讨论推出公司受益。",
        "sources": [
          "jll",
          "steo"
        ]
      },
      {
        "title": "在建栋数下降，不能直接归因于禁令",
        "kind": "口径约束",
        "body": "Cleanview两期记录从564变为537栋在建、1,418变为1,426栋投运、2,555变为2,675栋规划。样本补录与分类修订都可能改变总量；缺少逐项目迁移记录，不把净差额写成取消或转投运数量。",
        "sources": [
          "cleanview",
          "cleanview-old"
        ]
      }
    ],
    "charts": [
      {
        "title": "美国数据中心楼栋阶段 · 两次公开快照",
        "unit": "栋 · Cleanview追踪样本",
        "periods": [
          "11月4日",
          "11月11日"
        ],
        "series": [
          {
            "name": "已投运",
            "values": [
              1418,
              1426
            ]
          },
          {
            "name": "在建",
            "values": [
              564,
              537
            ]
          },
          {
            "name": "规划",
            "values": [
              2555,
              2675
            ]
          }
        ],
        "note": "2026年。横向比较的是快照状态；样本和分类可变，不将差额视为逐项目开工、停工或投运。",
        "sources": [
          "cleanview-old",
          "cleanview"
        ]
      },
      {
        "title": "美国总用电量 · EIA 11月展望",
        "unit": "TWh／年 · 全美所有用电",
        "periods": [
          "2025",
          "2026F",
          "2027F"
        ],
        "series": [
          {
            "name": "总用电量",
            "values": [
              4216,
              4306,
              4371
            ]
          }
        ],
        "note": "F为预测，模型截止2026-11-05。不是数据中心单独用电量，也不是发电量。",
        "sources": [
          "steo"
        ]
      },
      {
        "title": "美国居民零售电价 · EIA 11月展望",
        "unit": "美分／kWh · 全美居民平均",
        "periods": [
          "2025",
          "2026F",
          "2027F"
        ],
        "series": [
          {
            "name": "居民电价",
            "values": [
              17.24,
              18.17,
              18.68
            ]
          }
        ],
        "note": "F为预测。居民价格用于观察成本压力，不能代替工业电价或数据中心PPA合同价格。",
        "sources": [
          "steo"
        ]
      }
    ],
    "reassess": "若形成全国或主要州已生效、明确覆盖在建项目的暂停规则，应下调交付预期；若专用供电与成本承担机制落地、许可和通电时点改善，应上调具备这些条件的项目可交付性。两者都需要正式文件与逐项目证据。",
    "watch": [
      "德州新任就职后，竞选中的暂停主张是否变成有明确范围与豁免的正式规则。",
      "电费保护与用能调查的后续法定程序，不把新闻稿标题当成实施状态。",
      "重点项目供电协议、建设许可与实际通电；用同一项目的前后状态验证交付变化。"
    ],
    "geography": {
      "asOf": "2026-11-11",
      "electionAsOf": "2026-11-12",
      "incumbentAsOf": "2026-11-05",
      "capacityPeriod": "2026 H1",
      "states": [
        {
          "code": "AL",
          "name": "Alabama",
          "nameZh": "阿拉巴马",
          "incumbent": {
            "name": "Kay Ivey",
            "party": "R"
          },
          "winner": {
            "name": "Thomas Tuberville",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 13,
            "construction": 9,
            "planned": 14
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/alabama"
        },
        {
          "code": "AK",
          "name": "Alaska",
          "nameZh": "阿拉斯加",
          "incumbent": {
            "name": "Mike Dunleavy",
            "party": "R"
          },
          "winner": null,
          "status": "pending",
          "reportedAt": "2026-11-12",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 1
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/alaska"
        },
        {
          "code": "AZ",
          "name": "Arizona",
          "nameZh": "亚利桑那",
          "incumbent": {
            "name": "Katie Hobbs",
            "party": "D"
          },
          "winner": {
            "name": "Katie Hobbs",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 80,
            "construction": 27,
            "planned": 101
          },
          "capacity": {
            "existing": 2,
            "construction": 2
          },
          "url": "https://cleanview.co/data-centers/arizona"
        },
        {
          "code": "AR",
          "name": "Arkansas",
          "nameZh": "阿肯色",
          "incumbent": {
            "name": "Sarah Huckabee Sanders",
            "party": "R"
          },
          "winner": {
            "name": "Sarah Huckabee Sanders",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-09",
          "buildings": {
            "operating": 1,
            "construction": 2,
            "planned": 11
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/arkansas"
        },
        {
          "code": "CA",
          "name": "California",
          "nameZh": "加利福尼亚",
          "incumbent": {
            "name": "Gavin Newsom",
            "party": "D"
          },
          "winner": {
            "name": "Xavier Becerra",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 73,
            "construction": 7,
            "planned": 34
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/california"
        },
        {
          "code": "CO",
          "name": "Colorado",
          "nameZh": "科罗拉多",
          "incumbent": {
            "name": "Jared Polis",
            "party": "D"
          },
          "winner": {
            "name": "Phil Weiser",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 14,
            "construction": 4,
            "planned": 23
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/colorado"
        },
        {
          "code": "CT",
          "name": "Connecticut",
          "nameZh": "康涅狄格",
          "incumbent": {
            "name": "Ned Lamont",
            "party": "D"
          },
          "winner": {
            "name": "Ned Lamont",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 2,
            "construction": 0,
            "planned": 5
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/connecticut"
        },
        {
          "code": "DE",
          "name": "Delaware",
          "nameZh": "特拉华",
          "incumbent": {
            "name": "Matt Meyer",
            "party": "D"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 0
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/delaware"
        },
        {
          "code": "DC",
          "name": "District of Columbia",
          "nameZh": "哥伦比亚特区",
          "incumbent": null,
          "winner": null,
          "status": "not-applicable",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 0
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/washington-dc"
        },
        {
          "code": "FL",
          "name": "Florida",
          "nameZh": "佛罗里达",
          "incumbent": {
            "name": "Ron DeSantis",
            "party": "R"
          },
          "winner": {
            "name": "Byron Donalds",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 13,
            "construction": 2,
            "planned": 10
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/florida"
        },
        {
          "code": "GA",
          "name": "Georgia",
          "nameZh": "佐治亚",
          "incumbent": {
            "name": "Brian Kemp",
            "party": "R"
          },
          "winner": {
            "name": "Keisha Bottoms",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 50,
            "construction": 34,
            "planned": 168
          },
          "capacity": {
            "existing": 3,
            "construction": 4
          },
          "url": "https://cleanview.co/data-centers/georgia"
        },
        {
          "code": "HI",
          "name": "Hawaii",
          "nameZh": "夏威夷",
          "incumbent": {
            "name": "Josh Green",
            "party": "D"
          },
          "winner": {
            "name": "Josh Green",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 0
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/hawaii"
        },
        {
          "code": "ID",
          "name": "Idaho",
          "nameZh": "爱达荷",
          "incumbent": {
            "name": "Brad Little",
            "party": "R"
          },
          "winner": {
            "name": "Brad Little",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 2,
            "construction": 2,
            "planned": 5
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/idaho"
        },
        {
          "code": "IL",
          "name": "Illinois",
          "nameZh": "伊利诺伊",
          "incumbent": {
            "name": "JB Pritzker",
            "party": "D"
          },
          "winner": {
            "name": "JB Pritzker",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 49,
            "construction": 12,
            "planned": 98
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/illinois"
        },
        {
          "code": "IN",
          "name": "Indiana",
          "nameZh": "印第安纳",
          "incumbent": {
            "name": "Mike Braun",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 23,
            "construction": 6,
            "planned": 129
          },
          "capacity": {
            "existing": 1,
            "construction": 3
          },
          "url": "https://cleanview.co/data-centers/indiana"
        },
        {
          "code": "IA",
          "name": "Iowa",
          "nameZh": "艾奥瓦",
          "incumbent": {
            "name": "Kim Reynolds",
            "party": "R"
          },
          "winner": {
            "name": "Rob Sand",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 51,
            "construction": 15,
            "planned": 31
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/iowa"
        },
        {
          "code": "KS",
          "name": "Kansas",
          "nameZh": "堪萨斯",
          "incumbent": {
            "name": "Laura Kelly",
            "party": "D"
          },
          "winner": null,
          "status": "pending",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 3,
            "construction": 0,
            "planned": 23
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/kansas"
        },
        {
          "code": "KY",
          "name": "Kentucky",
          "nameZh": "肯塔基",
          "incumbent": {
            "name": "Andy Beshear",
            "party": "D"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 3,
            "construction": 0,
            "planned": 28
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/kentucky"
        },
        {
          "code": "LA",
          "name": "Louisiana",
          "nameZh": "路易斯安那",
          "incumbent": {
            "name": "Jeff Landry",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 1,
            "construction": 10,
            "planned": 31
          },
          "capacity": {
            "existing": null,
            "construction": 7
          },
          "url": "https://cleanview.co/data-centers/louisiana"
        },
        {
          "code": "ME",
          "name": "Maine",
          "nameZh": "缅因",
          "incumbent": {
            "name": "Janet Mills",
            "party": "D"
          },
          "winner": {
            "name": "Hannah Pingree",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-09",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 3
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/maine"
        },
        {
          "code": "MD",
          "name": "Maryland",
          "nameZh": "马里兰",
          "incumbent": {
            "name": "Wes Moore",
            "party": "D"
          },
          "winner": {
            "name": "Wes Moore",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 6,
            "construction": 8,
            "planned": 10
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/maryland"
        },
        {
          "code": "MA",
          "name": "Massachusetts",
          "nameZh": "马萨诸塞",
          "incumbent": {
            "name": "Maura Healey",
            "party": "D"
          },
          "winner": {
            "name": "Maura Healey",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 8,
            "construction": 0,
            "planned": 3
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/massachusetts"
        },
        {
          "code": "MI",
          "name": "Michigan",
          "nameZh": "密歇根",
          "incumbent": {
            "name": "Gretchen Whitmer",
            "party": "D"
          },
          "winner": {
            "name": "Jocelyn Benson",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 3,
            "construction": 3,
            "planned": 14
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/michigan"
        },
        {
          "code": "MN",
          "name": "Minnesota",
          "nameZh": "明尼苏达",
          "incumbent": {
            "name": "Tim Walz",
            "party": "D"
          },
          "winner": {
            "name": "Amy Klobuchar",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-08",
          "buildings": {
            "operating": 16,
            "construction": 0,
            "planned": 37
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/minnesota"
        },
        {
          "code": "MS",
          "name": "Mississippi",
          "nameZh": "密西西比",
          "incumbent": {
            "name": "Tate Reeves",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 9,
            "construction": 9,
            "planned": 22
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/mississippi"
        },
        {
          "code": "MO",
          "name": "Missouri",
          "nameZh": "密苏里",
          "incumbent": {
            "name": "Mike Kehoe",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 9,
            "construction": 12,
            "planned": 71
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/missouri"
        },
        {
          "code": "MT",
          "name": "Montana",
          "nameZh": "蒙大拿",
          "incumbent": {
            "name": "Greg Gianforte",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 2
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/montana"
        },
        {
          "code": "NE",
          "name": "Nebraska",
          "nameZh": "内布拉斯加",
          "incumbent": {
            "name": "Jim Pillen",
            "party": "R"
          },
          "winner": {
            "name": "Jim Pillen",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 19,
            "construction": 3,
            "planned": 8
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/nebraska"
        },
        {
          "code": "NV",
          "name": "Nevada",
          "nameZh": "内华达",
          "incumbent": {
            "name": "Joe Lombardo",
            "party": "R"
          },
          "winner": {
            "name": "Aaron Ford",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-12",
          "buildings": {
            "operating": 38,
            "construction": 16,
            "planned": 27
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/nevada"
        },
        {
          "code": "NH",
          "name": "New Hampshire",
          "nameZh": "新罕布什尔",
          "incumbent": {
            "name": "Kelly Ayotte",
            "party": "R"
          },
          "winner": {
            "name": "Kelly Ayotte",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 0
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/new-hampshire"
        },
        {
          "code": "NJ",
          "name": "New Jersey",
          "nameZh": "新泽西",
          "incumbent": {
            "name": "Mikie Sherrill",
            "party": "D"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 21,
            "construction": 3,
            "planned": 7
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/new-jersey"
        },
        {
          "code": "NM",
          "name": "New Mexico",
          "nameZh": "新墨西哥",
          "incumbent": {
            "name": "Michelle Lujan Grisham",
            "party": "D"
          },
          "winner": {
            "name": "Deb Haaland",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 10,
            "construction": 5,
            "planned": 6
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/new-mexico"
        },
        {
          "code": "NY",
          "name": "New York",
          "nameZh": "纽约",
          "incumbent": {
            "name": "Kathy Hochul",
            "party": "D"
          },
          "winner": {
            "name": "Kathy Hochul",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 16,
            "construction": 2,
            "planned": 30
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/new-york"
        },
        {
          "code": "NC",
          "name": "North Carolina",
          "nameZh": "北卡罗来纳",
          "incumbent": {
            "name": "Josh Stein",
            "party": "D"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 18,
            "construction": 12,
            "planned": 59
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/north-carolina"
        },
        {
          "code": "ND",
          "name": "North Dakota",
          "nameZh": "北达科他",
          "incumbent": {
            "name": "Kelly Armstrong",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 4,
            "construction": 4,
            "planned": 3
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/north-dakota"
        },
        {
          "code": "OH",
          "name": "Ohio",
          "nameZh": "俄亥俄",
          "incumbent": {
            "name": "Mike DeWine",
            "party": "R"
          },
          "winner": {
            "name": "Amy Acton",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 82,
            "construction": 48,
            "planned": 148
          },
          "capacity": {
            "existing": 4,
            "construction": 3
          },
          "url": "https://cleanview.co/data-centers/ohio"
        },
        {
          "code": "OK",
          "name": "Oklahoma",
          "nameZh": "俄克拉何马",
          "incumbent": {
            "name": "Kevin Stitt",
            "party": "R"
          },
          "winner": {
            "name": "Mike Mazzei",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 13,
            "construction": 4,
            "planned": 68
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/oklahoma"
        },
        {
          "code": "OR",
          "name": "Oregon",
          "nameZh": "俄勒冈",
          "incumbent": {
            "name": "Tina Kotek",
            "party": "D"
          },
          "winner": {
            "name": "Tina Kotek",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 100,
            "construction": 9,
            "planned": 33
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/oregon"
        },
        {
          "code": "PA",
          "name": "Pennsylvania",
          "nameZh": "宾夕法尼亚",
          "incumbent": {
            "name": "Josh Shapiro",
            "party": "D"
          },
          "winner": {
            "name": "Josh Shapiro",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 16,
            "construction": 9,
            "planned": 276
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/pennsylvania"
        },
        {
          "code": "RI",
          "name": "Rhode Island",
          "nameZh": "罗得岛",
          "incumbent": {
            "name": "Dan McKee",
            "party": "D"
          },
          "winner": {
            "name": "Helena Foulkes",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 0
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/rhode-island"
        },
        {
          "code": "SC",
          "name": "South Carolina",
          "nameZh": "南卡罗来纳",
          "incumbent": {
            "name": "Henry McMaster",
            "party": "R"
          },
          "winner": {
            "name": "Alan Wilson",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 13,
            "construction": 10,
            "planned": 22
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/south-carolina"
        },
        {
          "code": "SD",
          "name": "South Dakota",
          "nameZh": "南达科他",
          "incumbent": {
            "name": "Larry Rhoden",
            "party": "R"
          },
          "winner": {
            "name": "Larry Rhoden",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-06",
          "buildings": {
            "operating": 2,
            "construction": 0,
            "planned": 2
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/south-dakota"
        },
        {
          "code": "TN",
          "name": "Tennessee",
          "nameZh": "田纳西",
          "incumbent": {
            "name": "Bill Lee",
            "party": "R"
          },
          "winner": {
            "name": "Marsha Blackburn",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-06",
          "buildings": {
            "operating": 20,
            "construction": 2,
            "planned": 9
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/tennessee"
        },
        {
          "code": "TX",
          "name": "Texas",
          "nameZh": "得克萨斯",
          "incumbent": {
            "name": "Greg Abbott",
            "party": "R"
          },
          "winner": {
            "name": "Gina Hinojosa",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 172,
            "construction": 116,
            "planned": 533
          },
          "capacity": {
            "existing": 9,
            "construction": 18
          },
          "url": "https://cleanview.co/data-centers/texas"
        },
        {
          "code": "UT",
          "name": "Utah",
          "nameZh": "犹他",
          "incumbent": {
            "name": "Spencer Cox",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 35,
            "construction": 5,
            "planned": 103
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/utah"
        },
        {
          "code": "VT",
          "name": "Vermont",
          "nameZh": "佛蒙特",
          "incumbent": {
            "name": "Phil Scott",
            "party": "R"
          },
          "winner": {
            "name": "Phil Scott",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 0
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/vermont"
        },
        {
          "code": "VA",
          "name": "Virginia",
          "nameZh": "弗吉尼亚",
          "incumbent": {
            "name": "Abigail Spanberger",
            "party": "D"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 358,
            "construction": 109,
            "planned": 386
          },
          "capacity": {
            "existing": 9,
            "construction": 4
          },
          "url": "https://cleanview.co/data-centers/virginia"
        },
        {
          "code": "WA",
          "name": "Washington",
          "nameZh": "华盛顿",
          "incumbent": {
            "name": "Bob Ferguson",
            "party": "D"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 42,
            "construction": 2,
            "planned": 18
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/washington"
        },
        {
          "code": "WV",
          "name": "West Virginia",
          "nameZh": "西弗吉尼亚",
          "incumbent": {
            "name": "Patrick Morrisey",
            "party": "R"
          },
          "winner": null,
          "status": "not-contested",
          "reportedAt": "2026-11-05",
          "buildings": {
            "operating": 0,
            "construction": 0,
            "planned": 32
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/west-virginia"
        },
        {
          "code": "WI",
          "name": "Wisconsin",
          "nameZh": "威斯康星",
          "incumbent": {
            "name": "Tony Evers",
            "party": "D"
          },
          "winner": {
            "name": "David Crowley",
            "party": "D"
          },
          "status": "called",
          "reportedAt": "2026-11-11",
          "buildings": {
            "operating": 4,
            "construction": 10,
            "planned": 16
          },
          "capacity": null,
          "url": "https://cleanview.co/data-centers/wisconsin"
        },
        {
          "code": "WY",
          "name": "Wyoming",
          "nameZh": "怀俄明",
          "incumbent": {
            "name": "Mark Gordon",
            "party": "R"
          },
          "winner": {
            "name": "Eric Barlow",
            "party": "R"
          },
          "status": "called",
          "reportedAt": "2026-11-10",
          "buildings": {
            "operating": 14,
            "construction": 6,
            "planned": 15
          },
          "capacity": {
            "existing": 1,
            "construction": 3
          },
          "url": "https://cleanview.co/data-centers/wyoming"
        }
      ],
      "sources": [
        "cleanview",
        "elections",
        "governors",
        "jll"
      ],
      "notes": [
        "州色表示2026已判当选州长；非竞选州用现任。媒体判定不等于官方认证或已就任；AK、KS仍未判定。州长党派不代表州议会控制或项目审批态度。",
        "楼栋数来自Cleanview 2026-11-11同一全国表，涵盖AI、云、企业及加密挖矿；不是全量普查。六个零值州/特区是来源尚未收录，不代表现实中没有数据中心。",
        "容量来自JLL 2026H1所列8州，按整数GW约数展示；未明确IT/设施功率。未列州保留空值，不用部分园区数据补总量。跨州区域不拆分。",
        "TX图中9+18=27 GW；JLL同日报告合计26 GW。来源舍入差异保留，不倒算修正。楼栋数、市场容量、接网申请和发电队列不能相加。"
      ]
    }
  }
};
