/* ==========================================================
   Cursor Trail — 5 colored SVG ribbons follow the cursor and
   fling out spinning circles, squares, and triangles.
   When the mouse pauses, ribbons crackle around the pointer.
   ========================================================== */

(() => {
  if (!window.gsap) return;
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const COLORS = ['#ff6b6b', '#fff200', '#45b7d1', '#96ceb4', '#ffeaa7'];
  const NUM_POINTS = 14;
  const SPAWN_INTERVAL = 55;
  const IDLE_AFTER = 80;
  const IDLE_RADIUS = 7;
  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'trail');
  svg.setAttribute('aria-hidden', 'true');
  document.body.appendChild(svg);

  const lines = COLORS.map((color, i) => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('stroke', color);
    svg.appendChild(path);
    return {
      path,
      points: Array.from({ length: NUM_POINTS }, () => ({ x: -200, y: -200 })),
      lag: 0.26 + i * 0.06,
      offset: (i - (COLORS.length - 1) / 2) * 2.2,
    };
  });

  const shapeLayer = document.createElementNS(NS, 'g');
  svg.appendChild(shapeLayer);

  const mouse = { x: -200, y: -200 };
  const prevSpawn = { x: -200, y: -200 };
  let started = false;
  let lastSpawn = 0;
  let lastMoveTime = 0;
  let isDown = false;
  let isPaused = false;
  let downAt = { x: 0, y: 0 };

  const setPaused = (v) => {
    if (isPaused === v) return;
    isPaused = v;
    svg.classList.toggle('is-off', v);
  };

  const snapLinesTo = (x, y) => {
    for (const l of lines) {
      for (const p of l.points) {
        p.x = x;
        p.y = y;
      }
    }
  };

  const buildPath = (pts) => {
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) * 0.5;
      const yc = (pts[i].y + pts[i + 1].y) * 0.5;
      d += ` Q ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`;
    }
    const last = pts[pts.length - 1];
    d += ` T ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
    return d;
  };

  const buildLightningPath = (pts) => {
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
    }
    return d;
  };

  const spawnShape = (x, y) => {
    const color = COLORS[(Math.random() * COLORS.length) | 0];
    const kind = (Math.random() * 3) | 0;
    const size = 9 + Math.random() * 7;
    let el;

    if (kind === 0) {
      el = document.createElementNS(NS, 'circle');
      el.setAttribute('r', (size * 0.5).toFixed(1));
    } else if (kind === 1) {
      el = document.createElementNS(NS, 'rect');
      el.setAttribute('x', (-size * 0.5).toFixed(1));
      el.setAttribute('y', (-size * 0.5).toFixed(1));
      el.setAttribute('width', size.toFixed(1));
      el.setAttribute('height', size.toFixed(1));
    } else {
      el = document.createElementNS(NS, 'polygon');
      const h = size * 0.58;
      el.setAttribute('points', `0,${-h.toFixed(1)} ${h.toFixed(1)},${h.toFixed(1)} ${(-h).toFixed(1)},${h.toFixed(1)}`);
    }

    el.setAttribute('fill', color);
    shapeLayer.appendChild(el);

    const drift = 42;
    gsap.fromTo(
      el,
      { x, y, scale: 1, rotation: Math.random() * 180 },
      {
        x: x + (Math.random() - 0.5) * drift * 2,
        y: y + (Math.random() - 0.5) * drift * 2,
        scale: 0,
        rotation: `+=${(Math.random() < 0.5 ? -1 : 1) * (140 + Math.random() * 180)}`,
        duration: 0.65,
        ease: 'back.in(1.7)',
        onComplete: () => el.remove(),
      }
    );
  };

  const clearLines = () => {
    for (const l of lines) l.path.setAttribute('d', '');
  };

  const overSelection = (x, y) => {
    const sel = window.getSelection && window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return false;
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    const pad = 12;
    return (
      x >= rect.left - pad &&
      x <= rect.right + pad &&
      y >= rect.top - pad &&
      y <= rect.bottom + pad
    );
  };

  window.addEventListener(
    'mousedown',
    (e) => {
      if (e.button !== 0) return;
      isDown = true;
      downAt.x = e.clientX;
      downAt.y = e.clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    'mouseup',
    (e) => {
      isDown = false;
      if (!overSelection(e.clientX, e.clientY)) {
        snapLinesTo(e.clientX, e.clientY);
        setPaused(false);
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMoveTime = performance.now();

      if (!started) {
        started = true;
        snapLinesTo(mouse.x, mouse.y);
        prevSpawn.x = mouse.x;
        prevSpawn.y = mouse.y;
      }

      if (isDown) {
        if (Math.hypot(mouse.x - downAt.x, mouse.y - downAt.y) > 4) {
          setPaused(true);
        }
        return;
      }

      if (overSelection(mouse.x, mouse.y)) {
        setPaused(true);
        return;
      }
      if (isPaused) {
        snapLinesTo(mouse.x, mouse.y);
        setPaused(false);
      }

      const now = lastMoveTime;
      const moved = Math.hypot(mouse.x - prevSpawn.x, mouse.y - prevSpawn.y);
      if (now - lastSpawn >= SPAWN_INTERVAL && moved > 5) {
        lastSpawn = now;
        prevSpawn.x = mouse.x;
        prevSpawn.y = mouse.y;
        spawnShape(mouse.x, mouse.y);
      }
    },
    { passive: true }
  );

  gsap.ticker.add(() => {
    if (!started) return;
    if (isPaused) {
      clearLines();
      return;
    }

    const idle = performance.now() - lastMoveTime > IDLE_AFTER;

    for (let li = 0; li < lines.length; li++) {
      const l = lines[li];
      const pts = l.points;

      if (idle) {
        pts[0].x = mouse.x + (Math.random() - 0.5) * 4;
        pts[0].y = mouse.y + (Math.random() - 0.5) * 4;
        for (let i = 1; i < pts.length; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = 2 + Math.random() * IDLE_RADIUS;
          pts[i].x = mouse.x + Math.cos(a) * r;
          pts[i].y = mouse.y + Math.sin(a) * r;
        }
        l.path.setAttribute('d', buildLightningPath(pts));
      } else {
        pts[0].x += (mouse.x + l.offset - pts[0].x) * 0.55;
        pts[0].y += (mouse.y + l.offset - pts[0].y) * 0.55;
        for (let i = 1; i < pts.length; i++) {
          pts[i].x += (pts[i - 1].x - pts[i].x) * l.lag;
          pts[i].y += (pts[i - 1].y - pts[i].y) * l.lag;
        }
        l.path.setAttribute('d', buildPath(pts));
      }
    }
  });
})();
