/* ============================================================
 * 云端收藏 · 云盘导航模板 —— 站点配置
 * 修改本文件即可自定义整站内容，无需动 HTML / CSS / JS。
 * ============================================================ */

const SITE = {
  // 顶部品牌区
  brandName: "云端收藏",
  brandSub: "SKY CLOUD INDEX",

  // 右上角统计（{n} 会自动替换为入口数量）
  counter: "{n} 个入口",

  // 主标题（highlight 部分会渲染成金色渐变）
  title: "云盘",
  titleHighlight: "导航",

  // 眉标（左 / 右两段文字）
  eyebrowLeft: "SKY LINKS",
  eyebrowRight: "2026",

  // 副标题文案（\n 表示换行）
  lead: "把散落在云端的收藏，\n一次抵达。",

  // 交互提示
  hintDesktop: "移动鼠标 · 点亮云海",
  hintMobile: "轻触屏幕 · 点亮云海",

  // 页脚
  footerLeft: "云端收藏",
  footerRight: "五座云岛，一键抵达",
};

/* ------------------------------------------------------------
 * 导航卡片列表：想加几个加几个，页面自动排版、自动计数。
 *
 * 字段说明：
 *   name    卡片标题
 *   desc    一句话描述
 *   url     跳转链接（新标签页打开）
 *   accent  主题色（卡片光晕 / 图标 / 悬停高亮）
 *   icon    图标名，可选值见下方 ICONS；
 *           也可以直接填一段 <svg>...</svg> 自定义图标
 * ------------------------------------------------------------ */
const LINKS = [
  {
    name: "移动云盘",
    desc: "中国移动 · 分享直达",
    url: "https://yun.139.com/shareweb/#/w/i/2yA8zUW8FvNa9",
    accent: "#63d8ff",
    icon: "cloud-phone",
  },
  {
    name: "夸克网盘",
    desc: "极速转存 · 在线预览",
    url: "https://pan.quark.cn/s/7c6640d8a7fe",
    accent: "#769aff",
    icon: "planet",
  },
  {
    name: "百度网盘",
    desc: "资源合集 · 一键转存",
    url: "https://pan.baidu.com/s/1brCWCgk7LBdUY-YJnGFMQA?pwd=2345",
    accent: "#4e6ef2",
    icon: "cloud",
  },
  {
    name: "UC 网盘",
    desc: "免登录浏览 · 分享页",
    url: "https://drive.uc.cn/s/3628b19ac6ae4?public=1",
    accent: "#ffad62",
    icon: "refresh",
  },
  {
    // 不填 url、填 qr 的卡片：点击弹出二维码图片，不跳转网页
    name: "官方频道",
    desc: "Sky光遇公益 · 扫码加入",
    qr: "assets/channel-qr.jpg",
    num: "频道号 pd53086434",      // 显示在图片下方的说明行（可留空）
    accent: "#7ee3ff",
    icon: "channel",
  },
];

/* ------------------------------------------------------------
 * 内置图标库（24×24 线性描边风格）
 * ------------------------------------------------------------ */
const ICONS = {
  "cloud-phone":
    '<path d="M9 22.5h14.2a5 5 0 0 0 .5-10A7.8 7.8 0 0 0 9.1 11 5.7 5.7 0 0 0 9 22.5Z"/><rect x="12.5" y="16.5" width="7" height="11" rx="2"/><path d="M15 24.5h2"/>',
  planet:
    '<circle cx="16" cy="16" r="9"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(-28 16 16)"/><circle cx="24.8" cy="8.7" r="2.4"/>',
  star:
    '<path d="m16 4 2.7 8.3L27 15l-8.3 2.7L16 26l-2.7-8.3L5 15l8.3-2.7L16 4Z"/><path d="M24.5 22.5 26 26l-3.5 1.5L21 24l3.5-1.5Z"/>',
  refresh:
    '<path d="M25.5 18.5a9.5 9.5 0 1 1-3-7.6"/><path d="M21.5 4.5v7h-7"/><path d="M11 16.5h10"/>',
  cloud:
    '<path d="M9 22.5h14.2a5 5 0 0 0 .5-10A7.8 7.8 0 0 0 9.1 11 5.7 5.7 0 0 0 9 22.5Z"/>',
  folder:
    '<path d="M5 10.5A2.5 2.5 0 0 1 7.5 8h5l2.5 3h9.5a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 24.5 25h-17A2.5 2.5 0 0 1 5 22.5Z"/>',
  video:
    '<rect x="5" y="9" width="22" height="15" rx="3"/><path d="m13 13.5 5.5 3-5.5 3Z"/>',
  music:
    '<circle cx="11.5" cy="22" r="3.2"/><circle cx="23" cy="19.5" r="3.2"/><path d="M14.7 22V9.5L26.2 7v12.5"/>',
  book:
    '<path d="M7 6.5h17a2 2 0 0 1 2 2V25H9a2 2 0 0 1-2-2Z"/><path d="M9 25a2 2 0 0 0 2-2V6.5"/><path d="M12 12h9"/>',
  game:
    '<path d="M10.5 9h11a6.5 6.5 0 0 1 6.3 8.1l-1.4 5.8a3.4 3.4 0 0 1-5.8 1.4L18.4 22h-4.8l-2.2 2.3a3.4 3.4 0 0 1-5.8-1.4l-1.4-5.8A6.5 6.5 0 0 1 10.5 9Z"/><path d="M11 13.5v4M9 15.5h4"/><circle cx="21.5" cy="14.5" r=".8"/><circle cx="24.3" cy="17" r=".8"/>',
  link:
    '<path d="M14 18a6 6 0 0 1 0-8.5l2-2a6 6 0 0 1 8.5 8.5l-1.2 1.2"/><path d="M18 14a6 6 0 0 1 0 8.5l-2 2a6 6 0 0 1-8.5-8.5l1.2-1.2"/>',
  download:
    '<path d="M16 6v13"/><path d="m10.5 14 5.5 5.5L21.5 14"/><path d="M7 25h18"/>',
  channel:
    '<rect x="5" y="5" width="22" height="22" rx="7"/><path d="M14 10.8 12.6 21.2"/><path d="M19.4 10.8 18 21.2"/><path d="M8.9 14.1h14.2"/><path d="M8.4 17.9h14.2"/>',
};
