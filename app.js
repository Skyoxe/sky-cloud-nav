(() => {
  "use strict";

  /* ============================================================
   * 一、根据 links.js 配置渲染整站文案与导航卡片
   * ============================================================ */

  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  function iconSvg(icon) {
    if (!icon) return ICONS.cloud;
    if (/<svg/i.test(String(icon))) return String(icon);
    return ICONS[icon] || ICONS.cloud;
  }

  function renderSite() {
    const $ = (id) => document.getElementById(id);
    $("brand-name").textContent = SITE.brandName;
    $("brand-sub").textContent = SITE.brandSub;
    $("counter").textContent = SITE.counter.replace("{n}", LINKS.length);
    $("eyebrow-left").textContent = SITE.eyebrowLeft;
    $("eyebrow-right").textContent = SITE.eyebrowRight;
    $("lead").innerHTML = esc(SITE.lead).replace(/\n/g, "<br>");
    $("footer-left").textContent = SITE.footerLeft;
    $("footer-right").textContent = SITE.footerRight;
    document.title = `${SITE.brandName} · ${SITE.title}${SITE.titleHighlight}`;
    document.querySelector('meta[name="description"]')
      ?.setAttribute("content", SITE.lead.replace(/\n/g, " "));

    const h1 = $("page-title");
    h1.textContent = "";
    h1.append(SITE.title);
    const hl = document.createElement("span");
    hl.textContent = SITE.titleHighlight;
    h1.append(hl);
  }

  function renderCards() {
    const grid = document.getElementById("link-grid");
    grid.innerHTML = LINKS.map((item, i) => {
      // 弹窗型卡片（配置了 qr 字段）：渲染成 button，点击弹出二维码
      if (item.qr) {
        return `
      <button type="button" class="link-card" data-qr="${esc(item.qr)}"
              data-name="${esc(item.name)}" data-num="${esc(item.num || "")}"
              style="--accent:${esc(item.accent || "#76e7ff")};--i:${i}">
        <span class="card-glow" aria-hidden="true"></span>
        <span class="icon-wrap" aria-hidden="true">
          <svg viewBox="0 0 32 32">${iconSvg(item.icon)}</svg>
        </span>
        <span class="card-copy">
          <strong>${esc(item.name)}</strong>
          <small>${esc(item.desc)}</small>
        </span>
        <span class="card-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 8V4h4M16 4h4v4M4 16v4h4M20 16v4h-4"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.5"/></svg>
        </span>
        <span class="card-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      </button>`;
      }
      return `
      <a class="link-card" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"
         style="--accent:${esc(item.accent || "#76e7ff")};--i:${i}">
        <span class="card-glow" aria-hidden="true"></span>
        <span class="icon-wrap" aria-hidden="true">
          <svg viewBox="0 0 32 32">${iconSvg(item.icon)}</svg>
        </span>
        <span class="card-copy">
          <strong>${esc(item.name)}</strong>
          <small>${esc(item.desc)}</small>
        </span>
        <span class="card-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M9 6h9v9"/></svg>
        </span>
        <span class="card-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      </a>`;
    }).join("");
  }

  renderSite();
  renderCards();

  /* ============================================================
   * 一·二、二维码弹窗（点击带 qr 字段的卡片时弹出）
   * ============================================================ */

  const modal = document.createElement("div");
  modal.className = "qr-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="qr-backdrop" aria-hidden="true"></div>
    <figure class="qr-dialog" role="dialog" aria-modal="true" aria-label="频道二维码">
      <button type="button" class="qr-close" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
      <img class="qr-img" alt="频道二维码">
      <figcaption>
        <strong class="qr-name"></strong>
        <span class="qr-num"></span>
        <em>长按或截图保存 · 打开手机 QQ / 腾讯频道「扫一扫」识别</em>
      </figcaption>
    </figure>`;
  document.body.append(modal);

  const qrImg = modal.querySelector(".qr-img");
  const qrName = modal.querySelector(".qr-name");
  const qrNum = modal.querySelector(".qr-num");

  function openQr(item) {
    qrImg.src = item.dataset.qr;
    qrName.textContent = item.dataset.name;
    qrNum.textContent = item.dataset.num;
    qrNum.hidden = !item.dataset.num;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }

  function closeQr() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; qrImg.src = ""; }, 240);
  }

  document.getElementById("link-grid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-qr]");
    if (card) openQr(card);
  });
  modal.querySelector(".qr-close").addEventListener("click", closeQr);
  modal.querySelector(".qr-backdrop").addEventListener("click", closeQr);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeQr();
  });

  /* ============================================================
   * 二、云海光效（画布粒子 + 指针光晕 + 背景视差）
   * ============================================================ */

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 760px)").matches;
  const canvas = document.querySelector("#aura");
  const context = canvas.getContext("2d", { alpha: true });
  const cards = [...document.querySelectorAll(".link-card")];

  /* 性能分层：手机降低分辨率与粒子数量，桌面全速 */
  const MAX_PARTICLES = isSmallScreen ? 90 : 210;
  const DPR_CAP = isSmallScreen ? 1.5 : 2;

  /* 预渲染软光斑精灵：每帧一次 drawImage 取代逐粒子 createRadialGradient，
     消除每帧最多 200+ 次渐变对象创建，这是光效卡顿的最大来源 */
  const sprites = [
    [111, 230, 255],
    [255, 218, 92],
    [138, 242, 191],
    [172, 186, 255]
  ].map(([r, g, b]) => {
    const size = 64;
    const s = document.createElement("canvas");
    s.width = s.height = size;
    const c = s.getContext("2d");
    const grad = c.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, .9)`);
    grad.addColorStop(.38, `rgba(${r}, ${g}, ${b}, .35)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    c.fillStyle = grad;
    c.fillRect(0, 0, size, size);
    return s;
  });

  let width = 0;
  let height = 0;
  let dpr = 1;
  let frameId = 0;
  let lastFrame = performance.now();
  let isVisible = !document.hidden;
  let hasPointer = false;
  let lastTrailTime = 0;
  let lastPointerX = window.innerWidth * 0.62;
  let lastPointerY = window.innerHeight * 0.45;
  let pointerX = lastPointerX;
  let pointerY = lastPointerY;
  let easedX = lastPointerX;
  let easedY = lastPointerY;
  const particles = [];
  const ripples = [];

  /* 缓存卡片几何信息，避免每次指针移动都触发 5 次强制布局读取 */
  let cardRects = [];
  function refreshRects() {
    cardRects = cards.map((card) => card.getBoundingClientRect());
  }

  const palette = [
    [111, 230, 255],
    [255, 218, 92],
    [138, 242, 191],
    [172, 186, 255]
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    refreshRects();
  }

  function createParticle(x, y, force = 1, colorIndex = -1) {
    if (particles.length >= MAX_PARTICLES) return;
    const angle = Math.random() * Math.PI * 2;
    const speed = (0.15 + Math.random() * 0.85) * force;
    const index = colorIndex >= 0 ? colorIndex : Math.floor(Math.random() * sprites.length);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 10 + Math.random() * 28,
      life: 1,
      decay: 0.010 + Math.random() * 0.012,
      sprite: sprites[index]
    });
  }

  function addTrail(x, y, pressure = 1, now = performance.now()) {
    const distance = Math.hypot(x - lastPointerX, y - lastPointerY);
    if (now - lastTrailTime < 12 && distance < 8) return;
    lastTrailTime = now;
    const amount = distance > 62 ? 4 : distance > 25 ? 3 : 2;
    for (let i = 0; i < amount; i += 1) {
      createParticle(x, y, Math.min(1.45, pressure), i === 0 ? Math.floor(Math.random() * palette.length) : -1);
    }
    lastPointerX = x;
    lastPointerY = y;
  }

  function handlePointerMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    hasPointer = true;

    const normalizedX = (pointerX / width - 0.5) * -16;
    const normalizedY = (pointerY / height - 0.5) * -14;
    root.style.setProperty("--px", `${normalizedX.toFixed(2)}px`);
    root.style.setProperty("--py", `${normalizedY.toFixed(2)}px`);

    if (!reduceMotion) addTrail(pointerX, pointerY, event.pressure || 0.8);
    /* 使用缓存的矩形做命中判断，命中后才写一次 CSS 变量 */
    for (let i = 0; i < cardRects.length; i += 1) {
      const rect = cardRects[i];
      if (pointerX >= rect.left && pointerX <= rect.right && pointerY >= rect.top && pointerY <= rect.bottom) {
        const card = cards[i];
        card.style.setProperty("--mx", `${pointerX - rect.left}px`);
        card.style.setProperty("--my", `${pointerY - rect.top}px`);
        break;
      }
    }
  }

  function handlePointerDown(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (reduceMotion) return;

    for (let i = 0; i < 14; i += 1) {
      createParticle(event.clientX, event.clientY, 1.7);
    }
    ripples.push({
      x: event.clientX,
      y: event.clientY,
      radius: 10,
      life: 1,
      color: palette[Math.floor(Math.random() * palette.length)]
    });
  }

  function drawAmbient(time) {
    const orbs = [
      { x: width * 0.82 + Math.sin(time * 0.00018) * 32, y: height * 0.2 + Math.cos(time * 0.00016) * 24, size: Math.min(width, height) * 0.28, color: "99, 215, 255", alpha: 0.045 },
      { x: width * 0.65 + Math.cos(time * 0.00013) * 54, y: height * 0.72 + Math.sin(time * 0.00021) * 30, size: Math.min(width, height) * 0.32, color: "255, 222, 108", alpha: 0.038 },
      { x: width * 0.18 + Math.sin(time * 0.00011) * 18, y: height * 0.62 + Math.cos(time * 0.00017) * 25, size: Math.min(width, height) * 0.22, color: "112, 247, 199", alpha: 0.026 }
    ];

    for (const orb of orbs) {
      const gradient = context.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
      gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
      gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
      context.fillStyle = gradient;
      context.fillRect(orb.x - orb.size, orb.y - orb.size, orb.size * 2, orb.size * 2);
    }
  }

  function drawParticles(delta) {
    context.globalCompositeOperation = "screen";

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];
      const wave = Math.sin((particle.y + performance.now() * 0.03) * 0.012) * 0.018;
      particle.vx += Math.cos((particle.y + i) * 0.009) * wave;
      particle.vy += Math.sin((particle.x - i) * 0.009) * wave;
      particle.vx *= 0.982;
      particle.vy *= 0.982;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.life -= particle.decay * delta;

      if (particle.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const radius = particle.size * (1.1 + (1 - particle.life) * 1.5);
      const diameter = radius * 2;
      context.globalAlpha = particle.life * 0.26;
      context.drawImage(particle.sprite, particle.x - radius, particle.y - radius, diameter, diameter);
    }

    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
  }

  function drawPointerAura(time) {
    if (!hasPointer) return;
    const pulse = 1 + Math.sin(time * 0.0028) * 0.08;
    const radius = 150 * pulse;
    const gradient = context.createRadialGradient(easedX, easedY, 0, easedX, easedY, radius);
    gradient.addColorStop(0, "rgba(232, 254, 255, .105)");
    gradient.addColorStop(0.28, "rgba(111, 230, 255, .052)");
    gradient.addColorStop(0.64, "rgba(255, 220, 96, .028)");
    gradient.addColorStop(1, "rgba(255, 220, 96, 0)");
    context.globalCompositeOperation = "screen";
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(easedX, easedY, radius, 0, Math.PI * 2);
    context.fill();
    context.globalCompositeOperation = "source-over";
  }

  function drawRipples(delta) {
    for (let i = ripples.length - 1; i >= 0; i -= 1) {
      const ripple = ripples[i];
      ripple.radius += 4.2 * delta;
      ripple.life -= 0.025 * delta;

      if (ripple.life <= 0) {
        ripples.splice(i, 1);
        continue;
      }

      const [r, g, b] = ripple.color;
      context.beginPath();
      context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ripple.life * 0.15})`;
      context.lineWidth = 1.3;
      context.stroke();
    }
  }

  function animate(now) {
    if (!isVisible) {
      frameId = 0;
      return;
    }

    const delta = Math.min(2.2, (now - lastFrame) / 16.67);
    lastFrame = now;
    context.clearRect(0, 0, width, height);

    drawAmbient(now);
    drawPointerAura(now);
    drawParticles(delta);
    drawRipples(delta);

    if (hasPointer) {
      easedX += (pointerX - easedX) * 0.075;
      easedY += (pointerY - easedY) * 0.075;
      if (particles.length < MAX_PARTICLES) {
        const idleSpeed = Math.hypot(pointerX - lastPointerX, pointerY - lastPointerY);
        if (idleSpeed > 1.5) addTrail(pointerX, pointerY, 0.55, now);
      }
    }

    frameId = requestAnimationFrame(animate);
  }

  function start() {
    if (frameId || reduceMotion) return;
    lastFrame = performance.now();
    frameId = requestAnimationFrame(animate);
  }

  function stop() {
    if (!frameId) return;
    cancelAnimationFrame(frameId);
    frameId = 0;
  }

  resize();
  window.addEventListener("resize", () => {
    resize();
    cards.length = 0;
    cards.push(...document.querySelectorAll(".link-card"));
    refreshRects();
  }, { passive: true });
  /* 滚动会改变卡片相对视口的位置，滚动结束后重算一次 */
  let scrollTimer = 0;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(refreshRects, 140);
  }, { passive: true });
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;
    if (isVisible) start();
    else stop();
  });
  /* 入场动画会瞬时改变卡片位置，动画结束后校准一次缓存 */
  setTimeout(refreshRects, 1400);

  if (reduceMotion) {
    drawAmbient(0);
  } else {
    for (let i = 0; i < 12; i += 1) {
      createParticle(width * (0.55 + Math.random() * 0.42), height * (0.08 + Math.random() * 0.7), 0.55);
    }
    start();
  }
})();
