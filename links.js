/* ============================================================
 * Sky·光遇 · 紫罗兰风格导航 —— 站点配置
 * 只改这个文件，就能改掉全站文案、按钮和所有链接。
 * ============================================================ */

const SITE = {
  // 首屏（点箭头进入前的那一屏）
  introTitle: "Sky·光遇",
  introSub: "网盘资源 · 一键直达",

  // 中央名片卡
  cardTitle: "Sky·光遇",
  cardSlogan: "· 与光相遇 · 资源直达 ·",

  // 右侧统计（{n} 会自动替换成入口数量）
  counter: "{n} 个入口",

  // 区块标题
  downloadsTitle: "网盘下载",
  downloadsSub: "选择你常用的网盘，点击卡片即可跳转",
  aboutTitle: "关于本站",

  // 页脚
  footer: "© 2026 Sky·光遇 · 资源导航",

  // 二维码弹窗
  channelName: "官方频道",
  channelNum: "频道号 pd53086434",
  channelQr: "assets/channel-qr.jpg",
  channelTip: "长按或截图保存 · 打开手机 QQ / 腾讯频道「扫一扫」识别",
};

/* ------------------------------------------------------------
 * 打赏弹窗（点名片卡上的「打赏一下」按钮弹出）
 *   qr   赞赏码图片
 *   name 弹窗标题
 *   num  弹窗副标题
 *   tip  底部操作提示
 * ------------------------------------------------------------ */
const REWARD = {
  name: "打赏一下",
  num: "一毛两毛不嫌少，三块五块会更好",
  qr: "assets/reward-qr.png",
  tip: "长按或截图保存 · 打开微信「扫一扫」识别赞赏码",
};

/* ------------------------------------------------------------
 * 名片卡上的按钮，按「行」分组：一行里放 1~2 个按钮
 *   action 可选值：
 *     "qr"              弹出频道二维码
 *     "reward"          弹出打赏赞赏码
 *     "go:downloads"    平滑滚动到网盘下载区
 *     "go:about"        平滑滚动到关于区
 *     "copy"            复制本站网址
 *   icon 可选：channel / download / link / info / heart / star
 * ------------------------------------------------------------ */
const BUTTON_GROUPS = [
  [
    { label: "加入频道", icon: "channel", action: "qr" },
    { label: "网盘下载", icon: "download", action: "go:downloads" },
  ],
  [
    { label: "打赏一下", icon: "heart", action: "reward" },
    { label: "复制网址", icon: "link", action: "copy" },
  ],
  [{ label: "关于本站", icon: "info", action: "go:about" }],
];

/* ------------------------------------------------------------
 * 网盘下载卡片
 *   badge  左侧彩色小方块里的短文字（2~3 字最好）
 *   color  小方块底色
 *   url    跳转链接（新标签页打开）
 *   qr     设为 true 时不跳转，改为弹出二维码
 * ------------------------------------------------------------ */
const LINKS = [
  {
    badge: "移动",
    name: "移动云盘",
    note: "中国移动 · 分享直达",
    color: "#00A9E0",
    url: "https://yun.139.com/shareweb/#/w/i/2yA8zUW8FvNa9",
  },
  {
    badge: "夸克",
    name: "夸克网盘",
    note: "极速转存 · 在线预览",
    color: "#1677FF",
    url: "https://pan.quark.cn/s/7c6640d8a7fe",
  },
  {
    badge: "百度",
    name: "百度网盘",
    note: "资源合集 · 一键转存",
    color: "#2932E1",
    url: "https://pan.baidu.com/s/1brCWCgk7LBdUY-YJnGFMQA?pwd=2345",
  },
  {
    badge: "UC",
    name: "UC 网盘",
    note: "免登录浏览 · 分享页",
    color: "#FF6A00",
    url: "https://drive.uc.cn/s/3628b19ac6ae4?public=1",
  },
];

/* 提示条（想隐藏就把整段改成 NOTICE = null） */
const NOTICE = {
  title: "温馨提示",
  items: [
    "本站仅整理公开分享链接，文件资源均由第三方网盘提供。",
    "资源仅供个人学习交流，请勿用于商业用途或二次传播。",
    "如遇链接失效，可在频道内反馈，会尽快更新。",
  ],
};

/* 关于区块 */
const ABOUT = [
  "这里汇总了常用的网盘分享入口，不用再翻聊天记录，点开卡片就能直达。",
  "手机、电脑浏览器都能打开，把网址添加到主屏幕，用起来跟 App 一样方便。",
];
