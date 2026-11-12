# 财搭子研究看板 · DSH 插件

四张可更新的研究看板：**存储价格与利润、AI 基建成本与回报、PCB／CCL 升级兑现、美国政策与数据中心**。复用财搭子 Logo、大发头像与白蓝界面，通过财搭子 MCP 获取行情和证据，在 DSH 原生会话继续研究。

## 安装与使用

v0.3.0 支持 **DSH 0.2.2-rc.1 / rc.2**，不需要 `allow-version`。命令行版需要 Node.js 24.9.0+；官方 Desktop 使用自带运行环境。

Desktop 在 Plugins 中安装以下 URL，然后重新打开财搭子看板；若仍显示旧版，重启 DSH：

```text
https://github.com/markthc/dsh-caidazi-boards/releases/download/v0.3.0/caidazi-dsh-boards-0.3.0.tgz
```

Web：

```sh
dsh plugin --profile web add https://github.com/markthc/dsh-caidazi-boards/releases/download/v0.3.0/caidazi-dsh-boards-0.3.0.tgz
dsh web
```

1. 打开侧栏「财搭子看板」。无 Key 时仅显示内置研究及静态测算，不请求行情或公共快照。
2. 连接财搭子：App → 大发 → 左侧菜单 → 我的skill → 领取 API Key／我的API KEY管理。实际行情验证成功后保存至 DSH 凭据区，不进入聊天、URL或公共仓库。
3. 政策板使用「核心判断 → 政策进展 → 州级分布 → 关联行情」，地图点选与州选择器联动。其他看板阅读「核心判断 → 产业证据 → 经营数据 → 市场定价」。顶部「更新看板」同步研究版本、报价、K线和最新线索。研究内容较多时按栏目展开，不在结论页堆全部数据。
4. 「继续研究」将问题、已发布研究版本及用户情景参数带入 DSH 会话草稿，检查后发送。需要 DSH 已配置可用模型。

## 内容与数据

| 看板 | 研究与量化内容 |
| --- | --- |
| 存储产业跟踪 | 利基／主流／HBM／供给四个维度；DDR 8Gb两个月合约价对比、SK hynix收入/经营利润/净利润、三星资本开支；兆易、美光K线 |
| AI 基建 · 成本与回报 | 需求→交付→计费、资金、回报与供给约束；CoreWeave收入、经营现金流与现金PP&E、资金承诺拆分、可调回报测算；中际旭创、微软、英伟达、CoreWeave K线 |
| 美国政策与数据中心 | 联邦/州/地方政策状态；51州及DC地图、2026当选与现任州长、JLL在建容量、Cleanview楼栋阶段、EIA用电/电价预测；VRT、ETN、DLR K线 |
| PCB／CCL · 升级兑现 | 规格、认证、排单、现金兑现；胜宏HDI收入/毛利、现金流/扩张支出；生益、沪电、深南、胜宏K线 |

- **当前报价**来自财搭子 `get_real_time_record`，保留接口交易时间与币种。
- **日K**来自 Yahoo Finance 公共历史接口，约一年OHLCV。支持日/周K、3/6/12个月范围、20周期均线、成交量与悬停读数。周K由日K聚合，不把两天分钟数据拼成日K；缺失或损坏OHLC不补造。报价与历史行情来自不同来源，可能不同步。
- **资料检索**使用财搭子 `investment_search_pro`，按“主体＋主题”的短查询分维度检索。仅展示允许使用的标题链接及授权摘录；`citation_only` 不展示正文，`prohibited` 不进入模型。明确的原文发布时间优先于搜索索引日期；模糊日期冲突继续排除。报价资料页不作为研究事件。
- **经营图表**来自已核验公告或注明来源的报道转引，保留时期、单位和来源。不是所有公司指标都已变成自动更新的连续数据库。DDR报价原文未明确代际，不能映射为DDR5或HBM；只有两个披露点，不连成连续行情。
- **情景测算**仍为可修改假设：100亿元×15%÷24%=62.5亿元/年。目标是净利润／投产资本，不是IRR；不包含建设期、融资杠杆和追加投入。

### 美国政策与数据中心的数据范围

- Cleanview：2026-11-11全国公开表，1,426已投运／537在建／2,675规划，单位楼栋；45个非零州，另6州/特区原页明确尚未收录。快照差额不解释为新投产/取消。
- 2026州长选举：11/12重读ABC/AP原始结果，34已判、AK/KS未判。现任资料保留11/5核验日期；媒体结果不是认证、就任、州政府统一控制或数据中心政策态度。
- JLL：2026H1，8个单州容量，整数GW约数；未列州和Louisiana在运值不填零。Texas图中9＋18与正文合计26GW的差异原样说明。
- EIA：11/10发布的STEO，模型截止11/5；2026/2027标预测。全美用电及居民价格不代表数据中心用电或合同电价。
- 政策原文：S.4214转委员会；Oakland11/10通过延期至2027-10-05，11/20衔接现行暂停期；Trump EO14318为联邦加速框架。电费保护仅呈现已核9/16、9/17程序，未推断11月最终阶段。
- 地图几何来自us-atlas / U.S. Census，许可随包保留；地理数据进入可更新快照，几何只在客户端内置。

## 一次更新具体做什么

消费者点击「更新看板」后并行：

1. 获取仓库 `research/latest-v2.json`，按版本读取不可变JSON快照并校验SHA256、字段、来源引用、日期、数值与图表期次。
2. 将已发布的结论、事实、图表、研究维度及“本版变化”一起更新；只接受数据，不执行远程HTML或JavaScript。
3. 通过用户自己的财搭子Key刷新公司报价、主题证据，并获取日K。

没有新研究版本时保留现有结论；新检索资料在「产业证据」单独显示。快照同步失败保留当前Host内的上次成功版本，重启后以内置版本兜底。个人Key和情景参数不进入公共快照。网页重载会重新取数；本版没有磁盘行情缓存或后台轮询。

v0.3.0采用schema v2和`latest-v2.json`；旧`latest.json`与v1快照保留，v0.2.0客户端仍可读取原三板。新增第四板需要升级一次插件，之后内容可独立更新。

公共入口：[latest-v2.json](https://raw.githubusercontent.com/markthc/dsh-caidazi-boards/main/research/latest-v2.json)。历史版本保留在 `research/snapshots/`。GitHub发布有传播延迟；它是当前公共内容分发方案，不是实时事件服务。

## 发布者的研究更新管线

**财搭子检索 → DSH模型生成差异候选 → 原文核验/编辑 → 版本化快照 → GitHub发布 → 所有用户更新读取。**

发布者使用有财搭子Key、已登录/配置模型的本地 DSH Web。`DSH_PUBLISHER_TOKEN` 是该本地Web启动时提供的登录token，不是财搭子Key。环境变量仅传给本地脚本，不提交到仓库。

```sh
# 使用本地 DSH 的默认模型和财搭子连接；结果只写本地候选文件。
DSH_PUBLISHER_URL=http://127.0.0.1:8930 node scripts/research.mjs draft memory /tmp/memory-draft.json
# 同样支持 ai / pcb / policy。须先在环境中设置 DSH_PUBLISHER_TOKEN。

# 阅读review中的修改前后、来源、引句/计算式；核验原文后编辑snapshot。
# --reviewed表示操作者已完成审阅，脚本不会替你判断事实真假。
node scripts/research.mjs publish /tmp/reviewed-snapshot.json 2026-11-13.1 --reviewed

git diff -- research
git add research
git commit -m 'Update reviewed research snapshot'
git push origin HEAD:main
```

模型只返回得到来源支持的字段修改，并列出逐项差异；无实质证据返回 `unchanged` 或 `no-evidence`，不为显示“有更新”而改判断。候选稿不会自动覆盖已发布内容。发布脚本验证完整结构、要求版本递增且禁止覆盖已有文件。**格式与来源ID检查不能证明金融推理正确，公开发布仍须审阅。**

本轮实测：DSH DeepSeek模型生成存储候选；逐条核验后采用DRAM价格图与相关逻辑，未采用缺公告核验的公司财务转引。AI/PCB重复或不足的新材料返回“判断不变”。

## 定时与事件更新

DSH Schedule 到时向会话投递指令，模型与MCP执行；它不等于修改公共仓库。Host必须运行，退出/关机后不能按时执行。Webhook可接外部事件，但需要上游真实事件源。

公共研究适合由发布者运行同一条候选生成管线：按固定频率，或收到关键指标/公告事件后生成候选；审核通过再发布。用户只负责消费同一版本，不必每个人重复做研究。**当前已交付按需执行和手动审核发布；未创建定时任务、未部署常驻云端调度，也未接财搭子事件推送。**

[DSH Schedule](https://github.com/deepseek-ai/deepseek-harness/blob/main/docs/subsystems/schedule.md) · [Webhook](https://github.com/deepseek-ai/deepseek-harness/blob/main/docs/subsystems/webhook.md)

## 开发与边界

```sh
npm ci
npm test
npm run build
npm pack
```

`host.js` 接宿主和凭据，`data.js` 接财搭子检索/报价，`market.js` 接OHLCV，`publication.js` 校验/读取快照，`synthesis.js` 生成待审候选，`scripts/research.mjs` 处理发布者操作。8个财搭子官方 Skills 保留，rc.1使用宿主MCP Client，rc.2沿用MCP Manager；Electron子进程以Node模式启动。

接口沿用DSH浏览器认证、Host/Origin与owner权限。插件只读公共研究数据，不读取个人持仓、不改自选、不交易。配套官方Skills/MCP有个人资产工具，仅在用户后续明确请求时使用。Key额度、权益和撤销由财搭子服务端决定。DSH本地凭据文件不等于OS级密钥隔离。

仍需改进：完整产品价格与企业季度连续数据、行业横向覆盖、自动财报抽取核验、常驻事件/定时调度。公共快照是共享研究，尚不包含个人收藏/fork或账户定制。Yahoo接口无SLA，境内网络及数据授权需在产品化前确认；公司图表不能外推为行业整体。

代码MIT；品牌商标仍归财搭子。公开包不含个人Key、账户、测试响应、研究库原件或机构报告全文。当前通过GitHub Release分发，未宣称进入npm或DSH官方广场。
