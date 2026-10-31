# 云端收藏 · 云盘导航模板（Sky Cloud Nav）

一个单页云盘/收藏导航模板：云海实景背景 + 玻璃拟态面板 + 卡片入口 +
鼠标光效粒子 + 云海视差。纯静态 HTML/CSS/JS，无需构建，改配置即可用。

## 快速开始

1. 直接双击打开 `index.html` 即可预览；
2. 部署：把整个文件夹上传到任意静态托管
   （GitHub Pages / Vercel / Netlify / 对象存储静态网站均可）。

## 自定义（只改 links.js）

### 站点文案

编辑 `links.js` 顶部的 `SITE` 对象：

- `brandName` / `brandSub`：左上角品牌名与副标识
- `counter`：右上角统计文案，`{n}` 自动替换为入口数量
- `title` / `titleHighlight`：主标题（后半段渲染成金色渐变）
- `eyebrowLeft` / `eyebrowRight`：眉标两段文字
- `lead`：副标题，`\n` 表示换行
- `hintDesktop` / `hintMobile`：交互提示
- `footerLeft` / `footerRight`：页脚

### 增删导航入口

编辑 `LINKS` 数组，每个入口 5 个字段：

| 字段 | 说明 |
|------|------|
| `name` | 卡片标题 |
| `desc` | 一句话描述 |
| `url` | 跳转链接（新标签页打开） |
| `accent` | 主题色（光晕 / 图标 / 悬停高亮） |
| `icon` | 内置图标名，或直接填一段自定义 `<svg>…</svg>` |

内置图标：`cloud-phone` `planet` `star` `refresh` `cloud` `folder`
`video` `music` `book` `game` `link` `download`。
入口数量不限，桌面端两列、移动端单列自动排版，右上角计数自动更新。

## 更换背景图

替换 `assets/bg.png` 为你自己的图片即可（建议 1920 宽左右、
横向构图、左侧偏暗以便文字阅读），CSS 会自动 cover 适配。
整页配色基调在 `style.css` 顶部的 `:root` 变量中调整。

## 文件结构

```
sky-cloud-nav/
├── index.html    页面骨架
├── style.css     全部样式（含移动端适配）
├── app.js        渲染卡片 + 云海光效引擎
├── links.js      ★ 站点配置（改这里）
├── favicon.svg   站点图标
└── assets/bg.png 云海背景图
```

## 特性

- 响应式：桌面 / 平板 / 手机 / 矮窗口均适配
- 无障碍：支持键盘焦点高亮、`prefers-reduced-motion` 降级
- 性能：画布动画在标签页隐藏时自动暂停，粒子数有上限
