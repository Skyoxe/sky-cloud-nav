# 部署到 GitHub Pages（得到 xxx.github.io 网址）

> 你的 GitHub 用户名已确定为 **Sky91o**，所以本站上线后的网址是：
> **https://Sky91o.github.io/sky-cloud-nav/**
>
> 说明：`xxx.github.io` 里的 `xxx` 就是 GitHub 用户名，不能随意填写。
> 用户名 `sky91` 已被他人注册，因此用你自己的 `Sky91o`。
> 想换成更好记的地址，可以后期绑定自有域名。
>
> 好消息：GitHub Pages 免费、不用备案。

---

## 方法一：网页上传（不用装任何软件，推荐新手）

1. 打开 https://github.com ，用你的账号 **Sky91o** 登录；
2. 右上角 **+** → **New repository**；
   - Repository name 填 `sky-cloud-nav`（决定网址最后一段，建议照填）
   - 可见性选 **Public**（Private 仓库的 Pages 需要付费）
   - 不要勾选任何初始化选项 → **Create repository**
3. 进入新仓库，点 **uploading an existing file**（或 Add file → Upload files）；
4. 把本项目文件夹 `sky-cloud-nav` **里面**的文件全部拖进去
   （index.html、style.css、app.js、links.js、favicon.svg、README.md、.nojekyll、assets 文件夹），
   注意：**不要**把外层 `sky-cloud-nav` 文件夹整个拖进去，否则网址会多一层目录；
5. 点 **Commit changes** 提交；
6. 仓库 → **Settings** → 左侧 **Pages**；
   - Source 选 **Deploy from a branch**
   - Branch 选 **main** ，目录选 **/ (root)** → **Save**
7. 等 1～2 分钟刷新该页面，顶部会出现
   `Your site is live at https://Sky91o.github.io/sky-cloud-nav/` —— 这就是你的网址。

---

## 方法二：命令行推送（本机仓库已经建好并提交）

本项目已经执行过 `git init` 并提交，远程地址也已配好（指向 Sky91o 的仓库），
先在网页上建好空仓库，然后打开 PowerShell，在本目录执行：

```powershell
git push -u origin main
```

> 如果提示远程地址不存在，重新配置一次：
> `git remote set-url origin https://github.com/Sky91o/sky-cloud-nav.git`

推送时若弹出登录窗口，选择 **Sign in with your browser** 授权即可
（GitHub 已不支持账号密码推送）。

推送成功后，同样去 **Settings → Pages** 选择 `main` / `/ (root)` 保存。

---

## 以后怎么更新内容

改了 `links.js`（或换了背景图）之后，两种方式二选一：

- 网页版：进入仓库 → 点开 `links.js` → 右上角铅笔图标 → 改完 Commit changes；
- 命令行：在本目录执行

```powershell
git add -A
git commit -m "更新导航链接"
git push
```

约 30 秒后刷新网址即可看到新内容（可能需要 `Ctrl + F5`）。

---

## 换成自己的域名（可选，后期）

1. 买一个域名（阿里云 / 腾讯云 / Cloudflare 均可，几十元一年）；
2. 在域名 DNS 里添加 CNAME 记录：主机记录填 `nav` 或 `@`，
   记录值填 `Sky91o.github.io`；
3. 仓库 **Settings → Pages → Custom domain** 填入你的域名并保存，
   勾选 **Enforce HTTPS**。

---

## 常见问题

**Q：能不能让网址就是 `sky91.github.io`？**
不能。前半段由账号名决定，`sky91` 已被他人注册。你的地址是
`https://Sky91o.github.io/sky-cloud-nav/`；想更好记可买域名绑成 `sky91.com` 这类。

**Q：打开后是 404？**
- 确认 Pages 里分支选的是 `main`、目录是 `/ (root)`，且已 Save；
- 确认 `index.html` 在**仓库根目录**，不是套在子文件夹里；
- 刚保存后需要等 1～2 分钟构建。

**Q：样式或背景图丢了？**
多半是文件没传全：`assets/bg.png` 必须在仓库的 `assets` 目录下，
且 `style.css`、`app.js`、`links.js` 与 `index.html` 同级。
