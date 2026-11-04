/* ==========================================================
   Parmanand Jha — Portfolio
   Lenis smooth scroll + GSAP ScrollTrigger choreography +
   Live Nepal clock + Day streak + Interactive Litmus Lab +
   Ask Parmanand AI Assistant
   ========================================================== */

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- 1. Dynamic "Day X" counter ----------
  // Day 1 = May 4, 2026 (start of Class 12 & Green Flag Club build streak)
  const DAY_ONE = new Date(2026, 4, 4);
  const computeDay = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.floor((today - DAY_ONE) / 86400000) + 1;
    return Math.max(1, diff);
  };
  const currentDay = computeDay();
  const dayStatEl = document.getElementById('dayStat');
  if (dayStatEl) dayStatEl.textContent = String(currentDay);
  document.querySelectorAll('.day-inline').forEach((el) => {
    el.textContent = String(currentDay);
  });

  // ---------- 2. Live Biratnagar / Nepal clock ----------
  const ktmEl = document.getElementById('ktmTime');
  const updateClock = () => {
    if (!ktmEl) return;
    try {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      ktmEl.textContent = fmt.format(new Date());
    } catch {
      ktmEl.textContent = 'NPT';
    }
  };
  updateClock();
  setInterval(updateClock, 15000);

  // ---------- 3. Replay Intro Trigger ----------
  document.querySelectorAll('[data-replay-intro]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.CRIntro && typeof window.CRIntro.replay === 'function') {
        window.CRIntro.replay();
      }
    });
  });

  // ---------- 4. Interactive Litmus Test Lab (Card 03) ----------
  const LITMUS_SAMPLES = {
    curiosity: {
      reading: 'Acidic · pH 3',
      ph: 3,
      color: '#fb7185',
      height: '44%',
      title: 'Ask the sharp question',
      body: 'Curiosity is the reagent. Between physics equations and late-night terminal windows, asking "how does this actually work?" sparks the first line of every project.',
    },
    challenge: {
      reading: 'Basic · pH 11',
      ph: 11,
      color: '#38bdf8',
      height: '82%',
      title: 'Let pressure reveal character',
      body: 'Hard problems show what an idea is really made of — from organic chemistry reactions to debugging backend APIs, I lean into tough challenges instead of around them.',
    },
    code: {
      reading: 'Equilibrium · pH 7',
      ph: 7,
      color: '#1f9d55',
      height: '64%',
      title: 'Find balance, then build',
      body: 'When curiosity and challenge reach equilibrium, I test the idea through code and ship practical software alongside peers who are just as hungry.',
    },
  };

  const litmusBtns = document.querySelectorAll('[data-litmus]');
  const litmusFill = document.getElementById('litmusFill');
  const litmusDot = document.getElementById('litmusDot');
  const litmusReading = document.getElementById('litmusReading');
  const litmusTitle = document.getElementById('litmusTitle');
  const litmusBody = document.getElementById('litmusBody');

  litmusBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-litmus');
      const sample = LITMUS_SAMPLES[key];
      if (!sample) return;

      litmusBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      if (litmusFill) {
        litmusFill.style.height = sample.height;
        litmusFill.style.backgroundColor = sample.color;
      }
      if (litmusDot) {
        litmusDot.style.left = `${(sample.ph / 14) * 100}%`;
      }
      if (litmusReading) litmusReading.textContent = sample.reading;
      if (litmusTitle) litmusTitle.textContent = sample.title;
      if (litmusBody) litmusBody.textContent = sample.body;
    });
  });

  // ---------- 5. Ask Parmanand AI Assistant ----------
  const INTENTS = [
    {
      keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],
      answer: "Namaste! 👋 I'm Parmanand's portfolio assistant. Ask me about CATALYST 2026 (12 Dec 2026), Daydream & Campfire Biratnagar, Green Flag Hack Club, his GPA trajectory (3.60 → 3.82 → 3.96), Harvard CS50 Web, or how to sponsor/contact him.",
    },
    {
      keywords: ['catalyst', '2026', 'december', 'morang', 'chamber', 'flagship', 'sponsor', 'partnership'],
      answer: 'CATALYST 2026 is a flagship 24-hour hackathon on 12 December 2026 at the Chamber of Industries Morang, Biratnagar — organized by Parmanand as Founder & Lead Organizer of Green Flag Hack Club, uniting 200+ teen builders across 6 innovation tracks with 100% free entry.',
    },
    {
      keywords: ['daydream', 'campfire', 'arniko hack club', 'logistics', 'management', 'game jam', 'past hackathon'],
      answer: 'At Arniko Hack Club, Parmanand served on the Logistics & Management Organizing Team for both Daydream Biratnagar (2025, 250+ builders — Nepal\'s largest teen hackathon) and Campfire Biratnagar (28 Feb 2026, overnight game jam at Chamber of Industries Morang).',
    },
    {
      keywords: ['who', 'about', 'introduce', 'yourself', 'parmanand', 'tell me'],
      answer: 'Parmanand Jha is a Class 12 Computer Science student at Arniko Awasiya Secondary School in Biratnagar, Nepal, Founder of Green Flag Hack Club, Lead Organizer of CATALYST 2026, and Organizing Team Member (Logistics & Management) at Arniko Hack Club.',
    },
    {
      keywords: ['done', 'achieve', 'achievement', 'past', 'accomplish', 'record'],
      answer: "Parmanand co-organized Daydream Biratnagar (250+ builders) and Campfire Biratnagar on Arniko Hack Club's Logistics & Management team, founded Green Flag Hack Club to lead CATALYST 2026, completed Harvard's CS50 Web coursework, and climbed from 3.60 GPA (SEE) to 3.82 GPA (Class 11 Science).",
    },
    {
      keywords: ['gpa', 'grade', 'marks', 'result', 'score', 'see', 'class 10', 'class 11', 'academic', 'target'],
      answer: 'His academic trajectory has climbed every single year: 3.60 GPA in Class 10 (SEE) → 3.82 GPA in Class 11 (+2 Science) → targeting 3.96 GPA in Class 12 (graduating Chaitra 2083 B.S.).',
    },
    {
      keywords: ['cs50', 'harvard', 'course', 'coursework', 'online', 'certificate'],
      answer: "He completed Harvard's CS50 Web Programming coursework — mastering modern JavaScript, client–server architecture, backend logic, relational databases, and RESTful API design.",
    },
    {
      keywords: ['green flag', 'club', 'workshop', 'mentorship', 'pillars'],
      answer: 'Green Flag Hack Club is a student-led builder community founded by Parmanand at Arniko Awasiya Secondary School and the official organizer of CATALYST 2026. Its 3 pillars are Coding Workshops, 24-hour Student Hackathons, and AI Literacy Mentorship.',
    },
    {
      keywords: ['skill', 'tech', 'stack', 'language', 'javascript', 'web', 'code', 'coding', 'program', 'arsenal', 'python', 'c++'],
      answer: 'Tech Arsenal: C++, Python, JavaScript/TypeScript, PHP, SQL; Full-Stack Web (React.js, Next.js, Tailwind CSS, REST APIs, HTML5/WebGL); AI/ML (PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, Autonomous Agents); and Cloud/Design (AWS, GCP, Vercel, Git, Figma, Blender 3D).',
    },
    {
      keywords: ['litmus', 'philosophy', 'motto', 'believe', 'value', 'mindset', 'chemistry', 'keep going'],
      answer: 'In chemistry, litmus paper reveals the nature of an unknown solution. Parmanand treats curiosity (pH 3) and hard challenges (pH 11) as that litmus test — finding equilibrium (pH 7) by testing ideas through code.',
    },
    {
      keywords: ['contact', 'email', 'mail', 'reach', 'instagram', 'linkedin', 'connect', 'hire', 'collaborate', 'phone', 'whatsapp'],
      answer: 'Personal Email: parmanandjha030@gmail.com · Hackathon & Outreach: parmanandjha098@gmail.com · Phone/WhatsApp: +977 9714545173 · Instagram: @org.parmanand · GitHub: @parmanandjha.',
    },
  ];

  const answerFor = (query) => {
    const q = (query || '').toLowerCase();
    let best = {
      score: 0,
      answer: "Ask me about Parmanand's GPA trajectory (3.60 -> 3.82 -> 3.96), Harvard CS50 Web coursework, the Green Flag Club, his Litmus Test philosophy, or how to reach him in Biratnagar!",
    };
    for (const intent of INTENTS) {
      let score = 0;
      for (const kw of intent.keywords) {
        const pattern = kw.length <= 3 ? new RegExp(`\\b${kw}\\b`) : null;
        if (pattern ? pattern.test(q) : q.includes(kw)) {
          score += kw.split(' ').length + kw.length / 20;
        }
      }
      if (score > best.score) best = { score, answer: intent.answer };
    }
    return best.answer;
  };

  const askForm = document.getElementById('askForm');
  const askInput = document.getElementById('askInput');
  const askAnswer = document.getElementById('askAnswer');
  const updateAnswer = (q) => {
    if (!askAnswer) return;
    const reply = answerFor(q);
    if (window.gsap && !reduced) {
      gsap.to(askAnswer, {
        opacity: 0,
        y: 6,
        duration: 0.16,
        onComplete: () => {
          askAnswer.textContent = reply;
          gsap.to(askAnswer, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        },
      });
    } else {
      askAnswer.textContent = reply;
    }
  };

  if (askForm) {
    askForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!askInput || !askInput.value.trim()) return;
      updateAnswer(askInput.value.trim());
    });
  }
  document.querySelectorAll('[data-ask-chip]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-ask-chip') || chip.textContent;
      if (askInput) askInput.value = q;
      updateAnswer(q);
    });
  });

  // ---------- 6. Text Splitting Utilities ----------
  const splitChars = (el) => {
    if (el.dataset.splitted) return el.querySelectorAll('.char');
    el.dataset.splitted = '1';
    const walk = (node) => {
      if (node.nodeType === 3) {
        const text = node.nodeValue;
        const frag = document.createDocumentFragment();
        for (const ch of text) {
          if (ch === ' ') {
            frag.appendChild(document.createTextNode(' '));
          } else {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = ch;
            frag.appendChild(span);
          }
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !node.classList.contains('hero__badge') && !node.classList.contains('hl__bg')) {
        Array.from(node.childNodes).forEach(walk);
      }
    };
    Array.from(el.childNodes).forEach(walk);
    return el.querySelectorAll('.char');
  };

  const splitWords = (el) => {
    if (el.dataset.splitted) return el.querySelectorAll('.word');
    el.dataset.splitted = '1';
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = w;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return el.querySelectorAll('.word');
  };

  // ---------- 7. Smooth Scroll (Lenis) + GSAP ScrollTrigger ----------
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
    }
    if (window.gsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------- 8. Hide/Show Nav on Scroll Direction ----------
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (!nav) return;
      if (y > 140 && y > lastY + 6) nav.classList.add('is-hidden');
      else if (y < lastY - 6 || y <= 140) nav.classList.remove('is-hidden');
      lastY = y;
    },
    { passive: true }
  );

  // ---------- 9. Hero "nand" Highlight Sweep ----------
  const heroHl = document.getElementById('heroHl');
  const hlBg = heroHl ? heroHl.querySelector('.hl__bg') : null;
  let hlBusy = false;

  const sweepHighlightIn = (delay = 0) => {
    if (!heroHl || !hlBg || !window.gsap) return;
    gsap.killTweensOf(hlBg);
    gsap.set(hlBg, { transformOrigin: 'left center', scaleX: 0 });
    gsap.to(hlBg, {
      scaleX: 1,
      duration: 0.75,
      delay,
      ease: 'expo.out',
      onStart: () => heroHl.classList.add('is-lit'),
    });
  };

  if (heroHl && hlBg && window.gsap && !reduced) {
    heroHl.addEventListener('mouseenter', () => {
      if (hlBusy) return;
      hlBusy = true;
      const tl = gsap.timeline({
        onComplete: () => { hlBusy = false; },
      });
      tl.set(hlBg, { transformOrigin: 'right center' })
        .to(hlBg, {
          scaleX: 0,
          duration: 0.28,
          ease: 'power2.in',
          onComplete: () => heroHl.classList.remove('is-lit'),
        })
        .set(hlBg, { transformOrigin: 'left center' })
        .to(hlBg, {
          scaleX: 1,
          duration: 0.55,
          ease: 'expo.out',
          onStart: () => heroHl.classList.add('is-lit'),
        });
    });
  } else if (heroHl && hlBg) {
    heroHl.classList.add('is-lit');
    hlBg.style.transform = 'scaleX(1)';
  }

  // ---------- 10. Hero Entrance & Scroll Animations ----------
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const heroTitle = document.querySelector('.hero__name');
  const heroChars = heroTitle ? splitChars(heroTitle) : [];
  const heroLead = document.querySelector('.hero__lead');
  const heroTop = document.querySelectorAll('.hero__top .hero__meta');
  const heroActions = document.querySelectorAll('.hero__actions .btn');

  if (!reduced) {
    gsap.set(heroChars, { yPercent: 115, rotateZ: 3 });
    gsap.set([heroTop, heroLead, heroActions], { opacity: 0, y: 24 });
  }

  const runHeroIn = () => {
    if (reduced) {
      sweepHighlightIn(0);
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(heroTop, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0)
      .to(heroChars, { yPercent: 0, rotateZ: 0, duration: 1.0, stagger: 0.018, ease: 'expo.out' }, 0.08)
      .add(() => sweepHighlightIn(0), 0.72)
      .to(heroLead, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
      .to(heroActions, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.55);
  };

  if (window.CRIntro) window.CRIntro.onReady(runHeroIn);
  else runHeroIn();

  if (reduced) return;

  // ---------- 11. About Statement — Word-by-Word Scroll Scrub ----------
  const statement = document.querySelector('.about__statement');
  if (statement) {
    const words = splitWords(statement);
    gsap.fromTo(
      words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: statement,
          start: 'top 80%',
          end: 'bottom 55%',
          scrub: 0.4,
        },
      }
    );
  }

  // ---------- 12. Count-Up Stats (Supports Decimals + Dynamic Days) ----------
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toLocaleString();
          },
        });
      },
    });
  });

  if (dayStatEl) {
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: dayStatEl,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: currentDay,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            dayStatEl.textContent = String(Math.max(1, Math.round(obj.val)));
          },
        });
      },
    });
  }

  // ---------- 13. Section Headings Split-Char Reveal ----------
  document.querySelectorAll('.section-title[data-split], .contact__title[data-split]').forEach((heading) => {
    const chars = splitChars(heading);
    gsap.fromTo(
      chars,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.014,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // ---------- 14. Marquee Infinite Loop + Scroll Velocity Boost ----------
  const marquee = document.getElementById('marquee');
  if (marquee) {
    const tween = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 24,
      ease: 'none',
    });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.min(4, 1 + Math.abs(self.getVelocity()) / 900);
        gsap.to(tween, { timeScale: v, duration: 0.25, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 0.8, delay: 0.25 });
      },
    });
  }

  // ---------- 15. Sticky Cards — Scale Down as Next Card Covers ----------
  const cards = gsap.utils.toArray('.stack .card');
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    const next = cards[i + 1];
    gsap.to(card, {
      scale: 0.93,
      ease: 'none',
      scrollTrigger: {
        trigger: next,
        start: 'top bottom',
        end: 'top 15%',
        scrub: true,
      },
    });
  });

  // ---------- 16. Media Reveal Clip + Subtle Image Parallax ----------
  document.querySelectorAll('.reveal-clip').forEach((wrap) => {
    gsap.fromTo(
      wrap,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 86%',
          once: true,
        },
      }
    );
    const img = wrap.querySelector('img');
    if (img) {
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  });

  // ---------- 17. Timeline Rows Stagger ----------
  gsap.utils.toArray('.timeline__row').forEach((row) => {
    gsap.fromTo(
      row,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // ---------- 18. Custom Cursor & Magnetic Buttons ----------
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  if (cursor && finePointer) {
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3' });

    window.addEventListener(
      'mousemove',
      (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      },
      { passive: true }
    );

    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorLabel.textContent = el.getAttribute('data-cursor') || '';
        cursor.classList.add('is-active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-active');
      });
    });

    document.querySelectorAll('a:not([data-cursor]), button:not([data-cursor])').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
    });
  }

  if (finePointer) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }
})();
