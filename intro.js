/* ==========================================================
   Parmanand Jha — Intro
   Stage 1: Portrait rises from the dark with warm ember glow +
            drifting ember sparks while the counter ticks 0 -> 100.
   Stage 2: Portrait dissolves into ash particles and a swarm of
            flapping black bats, revealing the portfolio beneath.
   Includes window.CRIntro.replay() to re-run anytime on click.
   ========================================================== */

(() => {
  const readyCallbacks = [];
  let hasFiredReady = false;
  const fireReady = () => {
    if (hasFiredReady) return;
    hasFiredReady = true;
    while (readyCallbacks.length) readyCallbacks.shift()();
  };

  const intro = document.getElementById('intro');
  const fx = document.getElementById('fx');
  const portrait = document.getElementById('portrait');
  const glow = document.getElementById('portraitGlow');
  const countEl = document.getElementById('introCount');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isBot = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|slackbot|vkshare|w3c_validator|whatsapp|lighthouse|headless|google-inspectiontool|apis-google|mediapartners|adsbot/i.test(navigator.userAgent || '') || navigator.webdriver === true;
  const already = (() => {
    try { return sessionStorage.getItem('cr-intro') === '1'; } catch { return false; }
  })();

  const skipIntro = () => {
    if (intro) intro.classList.add('is-done');
    if (fx) fx.classList.add('is-done');
    document.documentElement.classList.remove('intro-lock');
    setTimeout(fireReady, 0);
  };

  // Expose replay so the user can trigger the face dissolve anytime
  const runSequence = (isReplay = false) => {
    if (!intro || !fx || !portrait) {
      skipIntro();
      return;
    }

    // Reset DOM state for initial run or replay
    intro.classList.remove('is-done');
    fx.classList.remove('is-done');
    intro.style.opacity = '1';
    intro.style.backgroundColor = '';
    portrait.style.opacity = '0';
    portrait.style.transform = 'translateY(24px) scale(1.03)';
    if (glow) {
      glow.style.opacity = '0';
      glow.style.transform = 'translateY(20px) scale(1.1)';
    }
    const topBar = intro.querySelector('.intro__top');
    const bottomBar = intro.querySelector('.intro__bottom');
    if (topBar) topBar.style.opacity = '1';
    if (bottomBar) bottomBar.style.opacity = '1';
    if (countEl) countEl.textContent = '0';

    document.documentElement.classList.add('intro-lock');

    const ctx = fx.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      fx.width = W * DPR;
      fx.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // ---------- Rising Embers (Stage 1) ----------
    const EMBER_COUNT = window.innerWidth < 720 ? 36 : 70;
    const embers = Array.from({ length: EMBER_COUNT }, () => ({
      x: Math.random() * W,
      y: H + Math.random() * H * 0.6,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(0.7 + Math.random() * 1.6),
      r: Math.random() * 2 + 0.7,
      a: Math.random() * 0.75 + 0.25,
      wobble: Math.random() * Math.PI * 2,
      warm: Math.random() > 0.28,
    }));

    let phase = 'rise';
    let ash = [];
    let bats = [];
    let dissolveStart = 0;
    const DISSOLVE_DUR = 2400;

    const imgReady = portrait.complete && portrait.naturalWidth > 0
      ? Promise.resolve()
      : new Promise((res) => {
          portrait.addEventListener('load', res, { once: true });
          portrait.addEventListener('error', res, { once: true });
        });

    imgReady.then(() => {
      if (window.gsap) {
        if (glow) gsap.to(glow, { opacity: 0.9, y: 0, scale: 1.06, duration: 2.0, ease: 'power3.out' });
        gsap.to(portrait, { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power3.out', delay: 0.1 });
      } else {
        if (glow) glow.style.opacity = '0.85';
        portrait.style.opacity = '1';
      }
    });

    const startTime = performance.now();
    const COUNT_DUR = 2800;

    // ---------- Stage 2: Sample Portrait & Launch Ash + Bats ----------
    const startDissolve = () => {
      phase = 'dissolve';
      dissolveStart = performance.now();

      const rect = portrait.getBoundingClientRect();
      const CELL = window.innerWidth < 720 ? 8 : 7;
      const off = document.createElement('canvas');
      const bw = Math.max(1, Math.floor(rect.width));
      const bh = Math.max(1, Math.floor(rect.height));
      off.width = bw;
      off.height = bh;
      const octx = off.getContext('2d');

      let sampled = false;
      try {
        octx.drawImage(portrait, 0, 0, bw, bh);
        const data = octx.getImageData(0, 0, bw, bh).data;
        const cx = rect.left + bw * 0.5;
        const cy = rect.top + bh * 0.45;
        const maxDist = Math.hypot(bw, bh) * 0.65;

        for (let y = 0; y < bh; y += CELL) {
          for (let x = 0; x < bw; x += CELL) {
            const idx = (y * bw + x) * 4;
            const a = data[idx + 3];
            if (a < 50) continue;
            const r = data[idx], g = data[idx + 1], b = data[idx + 2];
            const px = rect.left + x;
            const py = rect.top + y;
            const d = Math.hypot(px - cx, py - cy) / maxDist;
            const delay = Math.max(0, Math.min(1, (1 - d * 0.55) * 0.45 + Math.random() * 0.42)) * 620;
            const angle = Math.atan2(py - cy, px - cx) + (Math.random() - 0.5) * 1.1;
            const speed = 1.4 + Math.random() * 3.8;
            const isEmber = Math.random() < 0.08;

            ash.push({
              x: px,
              y: py,
              vx: Math.cos(angle) * speed * 0.65 + (Math.random() - 0.5) * 1.4,
              vy: Math.sin(angle) * speed * 0.45 - (1.2 + Math.random() * 2.6),
              size: CELL + 0.8,
              color: isEmber ? '#e2401c' : `rgb(${r},${g},${b})`,
              alpha: a / 255,
              delay,
              life: 0,
              maxLife: 700 + Math.random() * 650,
              turb: Math.random() * Math.PI * 2,
            });
          }
        }
        sampled = ash.length > 0;
      } catch {
        sampled = false;
      }

      if (!sampled) {
        for (let i = 0; i < 420; i++) {
          ash.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 3,
            vy: -(1.5 + Math.random() * 3.2),
            size: 6,
            color: Math.random() < 0.18 ? '#e2401c' : '#2a2826',
            alpha: 0.9,
            delay: Math.random() * 450,
            life: 0,
            maxLife: 800 + Math.random() * 500,
            turb: Math.random() * 6.28,
          });
        }
      }

      // Spawn flapping bats bursting from the portrait
      const BAT_COUNT = window.innerWidth < 720 ? 80 : 150;
      for (let i = 0; i < BAT_COUNT; i++) {
        const fromLeft = Math.random() < 0.5;
        const spread = (Math.random() - 0.5) * 1.3;
        const baseAngle = fromLeft ? -Math.PI * 0.72 + spread * 0.5 : -Math.PI * 0.28 + spread * 0.5;
        const speed = 3.2 + Math.random() * 5.6;
        const hero = i < 26;
        bats.push({
          x: rect.left + rect.width * (0.2 + Math.random() * 0.6),
          y: rect.top + rect.height * (0.12 + Math.random() * 0.72),
          vx: Math.cos(baseAngle) * speed + (Math.random() - 0.5) * 2.2,
          vy: Math.sin(baseAngle) * speed - (0.6 + Math.random() * 1.8),
          size: hero ? 18 + Math.random() * 18 : 9 + Math.random() * 13,
          flap: Math.random() * Math.PI * 2,
          flapSpeed: 0.34 + Math.random() * 0.22,
          sway: Math.random() * Math.PI * 2,
          delay: Math.random() * 560,
          alpha: 1,
          rim: Math.random() < 0.22,
        });
      }

      portrait.style.opacity = '0';
      if (glow && window.gsap) {
        gsap.to(glow, { opacity: 0, scale: 1.25, duration: 0.9, ease: 'power2.out' });
      } else if (glow) {
        glow.style.opacity = '0';
      }

      if (window.gsap) {
        gsap.to([intro.querySelector('.intro__top'), intro.querySelector('.intro__bottom')], {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        });
        gsap.to(intro, {
          backgroundColor: 'rgba(17,17,16,0)',
          duration: 0.9,
          delay: 0.35,
          ease: 'power2.inOut',
          onStart: () => {
            document.documentElement.classList.remove('intro-lock');
            if (!isReplay) fireReady();
          },
        });
      } else {
        document.documentElement.classList.remove('intro-lock');
        if (!isReplay) fireReady();
      }
    };

    const drawBat = (c, flap) => {
      const lift = flap * 0.65;
      c.beginPath();
      c.moveTo(0, -0.18);
      c.lineTo(-0.1, -0.34);
      c.lineTo(-0.15, -0.16);
      c.quadraticCurveTo(-0.55, -0.58 - lift, -1.08, -0.08 - lift * 0.85);
      c.quadraticCurveTo(-0.82, 0.08, -0.66, 0.24);
      c.quadraticCurveTo(-0.44, 0.06, -0.32, 0.26);
      c.quadraticCurveTo(-0.16, 0.1, 0, 0.28);
      c.quadraticCurveTo(0.16, 0.1, 0.32, 0.26);
      c.quadraticCurveTo(0.44, 0.06, 0.66, 0.24);
      c.quadraticCurveTo(0.82, 0.08, 1.08, -0.08 - lift * 0.85);
      c.quadraticCurveTo(0.55, -0.58 - lift, 0.15, -0.16);
      c.lineTo(0.1, -0.34);
      c.closePath();
      c.fill();
    };

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(40, now - last);
      last = now;
      ctx.clearRect(0, 0, W, H);

      if (phase === 'rise') {
        const p = Math.min(1, (now - startTime) / COUNT_DUR);
        const eased = 1 - Math.pow(1 - p, 3);
        if (countEl) countEl.textContent = String(Math.round(eased * 100));

        for (const e of embers) {
          e.wobble += 0.03;
          e.x += e.vx + Math.sin(e.wobble) * 0.3;
          e.y += e.vy;
          if (e.y < -10) { e.y = H + 10; e.x = Math.random() * W; }
          ctx.beginPath();
          ctx.fillStyle = e.warm
            ? `rgba(226, 64, 28, ${e.a})`
            : `rgba(255, 210, 175, ${e.a * 0.65})`;
          ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (now - startTime >= COUNT_DUR + 500) {
          startDissolve();
        }
      } else if (phase === 'dissolve') {
        const elapsed = now - dissolveStart;

        for (let i = 0; i < ash.length; i++) {
          const p = ash[i];
          if (elapsed < p.delay) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            continue;
          }
          p.life += dt;
          if (p.life >= p.maxLife) continue;
          const k = p.life / p.maxLife;
          p.turb += 0.07;
          p.x += p.vx + Math.sin(p.turb) * 0.7;
          p.y += p.vy;
          p.vy -= 0.018;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = (1 - k) * p.alpha;
          const s = p.size * (1 - k * 0.5);
          ctx.fillRect(p.x, p.y, s, s);
        }

        for (let i = 0; i < bats.length; i++) {
          const b = bats[i];
          if (elapsed < b.delay) continue;
          const localT = (elapsed - b.delay) / (DISSOLVE_DUR - 200);
          if (localT >= 1.25) continue;

          b.flap += b.flapSpeed;
          b.sway += 0.05;
          b.x += b.vx + Math.cos(b.sway) * 0.9;
          b.y += b.vy + Math.sin(b.flap) * 0.85;
          b.vy -= 0.028;

          const fade = localT > 0.75 ? Math.max(0, 1 - (localT - 0.75) / 0.45) : 1;
          ctx.save();
          ctx.translate(b.x, b.y);
          const angle = Math.atan2(b.vy, b.vx) + Math.PI * 0.5;
          ctx.rotate(angle * 0.35);
          ctx.scale(b.size, b.size);
          ctx.globalAlpha = fade;
          if (b.rim) {
            ctx.shadowColor = 'rgba(226, 64, 28, 0.75)';
            ctx.shadowBlur = 8;
          }
          ctx.fillStyle = '#0a0a09';
          drawBat(ctx, Math.sin(b.flap));
          ctx.restore();
        }
        ctx.globalAlpha = 1;

        if (elapsed >= DISSOLVE_DUR) {
          finish();
          return;
        }
      }

      requestAnimationFrame(tick);
    };

    const finish = () => {
      try { sessionStorage.setItem('cr-intro', '1'); } catch {}
      window.removeEventListener('resize', resize);
      if (window.gsap) {
        gsap.to(intro, {
          opacity: 0,
          duration: 0.35,
          onComplete: () => {
            intro.classList.add('is-done');
            fx.classList.add('is-done');
            document.documentElement.classList.remove('intro-lock');
            fireReady();
          },
        });
      } else {
        skipIntro();
      }
    };

    setTimeout(() => {
      if (!intro.classList.contains('is-done')) finish();
    }, 12000);

    requestAnimationFrame(tick);
  };

  window.CRIntro = {
    onReady: (fn) => (hasFiredReady ? fn() : readyCallbacks.push(fn)),
    replay: () => runSequence(true),
  };

  if (!intro || !fx || !portrait || reduced || already || isBot) {
    skipIntro();
  } else {
    runSequence(false);
  }
})();
