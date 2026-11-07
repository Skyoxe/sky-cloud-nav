(() => {
  "use strict";

  /* ============================================================
   * 一、图标
   * ============================================================ */
  const wrap = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICONS = {
    channel: wrap('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>'),
    download: wrap('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>'),
    link: wrap('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'),
    info: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    heart: wrap('<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'),
    star: wrap('<path d="m12 3 2.7 6.3 6.8.6-5.2 4.5 1.6 6.6-5.9-3.5-5.9 3.5 1.6-6.6L2.5 9.9l6.8-.6L12 3Z"/>'),
  };
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M17 7H8M17 7v9"/></svg>';

  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* 徽章配色：只接受 #RGB / #RRGGBB，避免配置文件里混入其它 CSS */
  const safeColor = (v, fallback) => {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(v || "").trim());
    return m ? m[0] : fallback;
  };
  const toRgba = (hex, alpha) => {
    let h = hex.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  };

  /* ============================================================
   * 二、按 links.js 渲染内容
   * ============================================================ */
  function render() {
    const $ = (id) => document.getElementById(id);
    $("intro-title").textContent = SITE.introTitle;
    $("intro-sub").textContent = SITE.introSub;
    $("card-title").textContent = SITE.cardTitle;
    $("card-slogan").textContent = SITE.cardSlogan;
    $("counter").textContent = SITE.counter.replace("{n}", LINKS.length);
    $("downloads-title").textContent = SITE.downloadsTitle;
    $("downloads-sub").textContent = SITE.downloadsSub;
    $("about-title").textContent = SITE.aboutTitle;
    $("copyright").textContent = SITE.footer;
    document.title = `${SITE.cardTitle} · 网盘导航`;
    document.querySelector('meta[name="description"]').setAttribute("content", `${SITE.cardTitle}：${SITE.introSub}`);

    $("card-links").innerHTML = BUTTON_GROUPS.map((group) => {
      const items = group.map((btn) => `
        <button type="button" data-action="${esc(btn.action)}">
          ${ICONS[btn.icon] || ICONS.info}<span>${esc(btn.label)}</span>
        </button>`).join("");
      return `<li class="${group.length > 1 ? "row-pair" : ""}">${items}</li>`;
    }).join("");

    if (NOTICE) {
      $("notice-title").textContent = NOTICE.title;
      $("notice-list").innerHTML = NOTICE.items.map((t) => `<li>${esc(t)}</li>`).join("");
    } else {
      $("notice-wrap").hidden = true;
    }

    $("about-body").innerHTML = ABOUT.map((p) => `<p>${esc(p)}</p>`).join("");

    $("downloads-grid").innerHTML = LINKS.map((item, i) => {
      /* 渐变两色 + 由亮色生成的柔光，都交给 CSS 变量，样式集中在 style.css */
      const c1 = safeColor(item.color, "#7B68EE");
      const c2 = safeColor(item.color2, c1);
      const vars = `--i:${i};--c1:${c1};--c2:${c2};--glow:${toRgba(c1, 0.42)}`;
      const inner = `
        <span class="download-badge"><span class="badge-label">${esc(item.badge)}</span></span>
        <span class="download-info">
          <span class="download-name">${esc(item.name)}</span>
          <span class="download-note">${esc(item.note)}</span>
        </span>
        <span class="download-arrow">${ARROW}</span>`;
      if (item.qr) {
        return `<button type="button" class="download-card" data-qr style="${vars}">${inner}</button>`;
      }
      return `<a class="download-card" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" style="${vars}">${inner}</a>`;
    }).join("");
  }
  render();

  /* ============================================================
   * 三、首屏 → 主屏
   * ============================================================ */
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");
  const enterBtn = document.getElementById("enterBtn");
  const flow = document.getElementById("flow");
  const bg = document.getElementById("background");
  let entered = false;

  function enterMain() {
    if (entered) return;
    entered = true;
    intro.classList.add("is-gone");
    main.classList.add("is-visible");
    main.setAttribute("aria-hidden", "false");
    flow.style.opacity = "0";
    if (bg) bg.style.opacity = "0";
    if (window.__fluidStop) window.__fluidStop();
    stopFlow();
    setTimeout(() => { intro.style.display = "none"; }, 950);
  }

  enterBtn.addEventListener("click", enterMain);
  document.addEventListener("keydown", (e) => {
    if (!entered && (e.key === "Enter" || e.key === " ") && e.target !== enterBtn) {
      e.preventDefault();
      enterMain();
    }
  });

  /* 平滑滚动到某个区块并高亮 */
  function goTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 16;
    try { main.scrollTo({ top, behavior: "smooth" }); }
    catch (_) { main.scrollTop = top; }
    if (id === "downloads") {
      target.classList.remove("flash");
      void target.offsetWidth;
      target.classList.add("flash");
      setTimeout(() => target.classList.remove("flash"), 1800);
    }
  }

  /* ============================================================
   * 四、提示气泡
   * ============================================================ */
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  document.body.append(toast);
  let toastTimer = 0;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1800);
  }

  async function copyUrl() {
    const url = location.href.split("#")[0];
    const ok = () => showToast("网址已复制，去分享给朋友吧");
    try {
      await navigator.clipboard.writeText(url);
      ok();
    } catch (_) {
      /* 微信内置浏览器 / 非 HTTPS 下 clipboard API 不可用，走 execCommand 兜底。
         iOS 需要 contentEditable + Range 才能选中；字号 ≥16px 避免触发页面缩放 */
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.contentEditable = "true";
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;font-size:16px";
      document.body.append(ta);
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ta);
      sel.removeAllRanges();
      sel.addRange(range);
      ta.setSelectionRange(0, url.length);
      let copied = false;
      try { copied = document.execCommand("copy"); } catch (_) { /* 忽略 */ }
      sel.removeAllRanges();
      ta.remove();
      if (copied) ok();
      else showToast("复制失败，请手动复制地址栏");
    }
  }

  /* ============================================================
   * 五、二维码弹窗
   * ============================================================ */
  const modal = document.createElement("div");
  modal.className = "qr-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="qr-backdrop" aria-hidden="true"></div>
    <figure class="qr-dialog" role="dialog" aria-modal="true" aria-label="频道二维码">
      <button type="button" class="qr-close" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
      <img class="qr-img" alt="频道二维码">
      <figcaption>
        <strong class="qr-name"></strong>
        <span class="qr-num"></span>
        <em></em>
      </figcaption>
    </figure>`;
  document.body.append(modal);

  const qrImg = modal.querySelector(".qr-img");
  const POPUPS = {
    channel: {
      img: SITE.channelQr,
      name: SITE.channelName,
      num: SITE.channelNum,
      tip: SITE.channelTip,
      label: "频道二维码",
    },
    reward: {
      img: REWARD.qr,
      name: REWARD.name,
      num: REWARD.num,
      tip: REWARD.tip,
      label: "微信赞赏码",
    },
  };
  function openQr(key) {
    const p = POPUPS[key] || POPUPS.channel;
    const dialog = modal.querySelector(".qr-dialog");
    dialog.classList.toggle("is-reward", key === "reward");
    dialog.setAttribute("aria-label", p.label);
    qrImg.src = p.img;
    qrImg.alt = p.label;
    modal.querySelector(".qr-name").textContent = p.name;
    modal.querySelector(".qr-num").textContent = p.num;
    modal.querySelector("em").textContent = p.tip;
    modal.hidden = false;
    /* 强制重排后同步加类：不依赖 rAF，低帧率或后台恢复时弹窗也能立刻可点 */
    void modal.offsetWidth;
    modal.classList.add("is-open");
  }
  function closeQr() {
    modal.classList.remove("is-open");
    setTimeout(() => { modal.hidden = true; qrImg.src = ""; }, 260);
  }
  modal.querySelector(".qr-close").addEventListener("click", closeQr);
  modal.querySelector(".qr-backdrop").addEventListener("click", closeQr);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeQr();
  });

  /* 统一事件委托 */
  document.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "qr") openQr("channel");
      else if (action === "reward") openQr("reward");
      else if (action === "copy") copyUrl();
      else if (action.startsWith("go:")) {
        const wasEntered = entered;
        if (!wasEntered) enterMain();
        setTimeout(() => goTo(action.slice(3)), wasEntered ? 0 : 550);
      }
      return;
    }
    if (e.target.closest("[data-qr]")) openQr("channel");
  });

  /* 六、2D 光雾降级：仅在 WebGL 流体不可用时启用 */
  const useFallback = document.body.classList.contains("no-webgl") || !!window.__fluidFailed;
  const ctx = flow.getContext("2d", { alpha: true });
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = matchMedia("(max-width: 768px)").matches;
  const dprCap = small ? 1.5 : 2;
  const MAX_SPARKS = small ? 45 : 110;

  /* 预渲染软光斑，避免每帧创建渐变 */
  function makeSprite([r, g, b]) {
    const size = 128;
    const s = document.createElement("canvas");
    s.width = s.height = size;
    const c = s.getContext("2d");
    const grad = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    grad.addColorStop(.35, `rgba(${r}, ${g}, ${b}, .5)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    c.fillStyle = grad;
    c.fillRect(0, 0, size, size);
    return s;
  }
  const hues = [[74, 144, 217], [123, 104, 238], [34, 211, 238], [255, 107, 170], [240, 170, 90]];
  const sprites = hues.map(makeSprite);

  let W = 0, H = 0, dpr = 1, frameId = 0, running = false;
  const orbs = [];
  const sparks = [];

  function resizeFlow() {
    W = innerWidth;
    H = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, dprCap);
    flow.width = Math.round(W * dpr);
    flow.height = Math.round(H * dpr);
    flow.style.width = `${W}px`;
    flow.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initOrbs() {
    orbs.length = 0;
    const count = small ? 6 : 9;
    for (let i = 0; i < count; i += 1) {
      orbs.push({
        bx: .08 + Math.random() * .84,
        by: .1 + Math.random() * .8,
        r: (small ? 110 : 170) + Math.random() * (small ? 110 : 170),
        sprite: sprites[i % sprites.length],
        phase: Math.random() * Math.PI * 2,
        speed: .00012 + Math.random() * .00022,
        ampX: 30 + Math.random() * 70,
        ampY: 24 + Math.random() * 60,
        alpha: .1 + Math.random() * .09,
      });
    }
  }

  function addSparks(x, y) {
    if (sparks.length >= MAX_SPARKS) return;
    for (let i = 0; i < 2; i += 1) {
      sparks.push({
        x: x + (Math.random() - .5) * 18,
        y: y + (Math.random() - .5) * 18,
        vx: (Math.random() - .5) * .5,
        vy: (Math.random() - .5) * .5,
        r: 26 + Math.random() * 52,
        life: 1,
        decay: .012 + Math.random() * .01,
        sprite: sprites[Math.floor(Math.random() * sprites.length)],
      });
    }
  }

  let lastSpark = 0;
  function onMove(e) {
    if (entered || reduceMotion) return;
    const now = performance.now();
    if (now - lastSpark < 34) return;
    lastSpark = now;
    addSparks(e.clientX, e.clientY);
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    for (const orb of orbs) {
      const x = orb.bx * W + Math.sin(now * orb.speed + orb.phase) * orb.ampX;
      const y = orb.by * H + Math.cos(now * orb.speed * 1.3 + orb.phase) * orb.ampY;
      ctx.globalAlpha = orb.alpha;
      ctx.drawImage(orb.sprite, x - orb.r, y - orb.r, orb.r * 2, orb.r * 2);
    }

    for (let i = sparks.length - 1; i >= 0; i -= 1) {
      const p = sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = p.life * .2;
      ctx.drawImage(p.sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    if (running) frameId = requestAnimationFrame(draw);
  }

  function startFlow() {
    if (!useFallback || running || reduceMotion || entered) return;
    running = true;
    frameId = requestAnimationFrame(draw);
  }
  function stopFlow() {
    running = false;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  }

  if (useFallback) {
    resizeFlow();
    initOrbs();
    window.addEventListener("resize", () => { resizeFlow(); initOrbs(); }, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopFlow();
      else startFlow();
    });
    if (reduceMotion) draw(0);
    else startFlow();
  }
})();
