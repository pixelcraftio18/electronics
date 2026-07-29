/* ==========================================================================
   KAMADGIRI ELECTRONICS — Premium Experience Engine (Vanilla JS)
   GPU-friendly · rAF-throttled · no dependencies
   --------------------------------------------------------------------------
   01 Cinematic loader          09 Product filter
   02 Theme (dark/light)        10 AC temperature hover
   03 Festive mode              11 Gallery lightbox
   04 Scroll progress/header    12 FAQ accordion
   05 Mobile nav + scroll spy   13 Back to top
   06 Reveal + hero intro       14 Enquiry form → WhatsApp
   07 Counters                  15 Bulb toggle
   08 Cursor glow / magnetic /  16 Hero particles / ripple / year
      3D tilt
   ========================================================================== */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(pointer: fine)').matches;

  /* ============ 01. CINEMATIC LOADER ============ */
  const loader = $('#loader');
  const lProg  = $('#loaderProgress');
  let pct = 0;
  const loadTimer = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 14 + 6);
    if (lProg) lProg.style.width = pct + '%';
    if (pct >= 100) clearInterval(loadTimer);
  }, 180);
  function hideLoader() {
    if (lProg) lProg.style.width = '100%';
    if (loader) loader.classList.add('is-hidden');
    startHeroIntro();
  }
  window.addEventListener('load', () => setTimeout(hideLoader, 2200));
  setTimeout(hideLoader, 4200); // safety net

  /* ============ 02. THEME (DARK / LIGHT) ============ */
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const savedTheme = localStorage.getItem('ke-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ke-theme', next);
  });

  /* ============ 03. FESTIVE MODE ============ */
  const festiveBtn = $('#festiveToggle');
  if (localStorage.getItem('ke-festive') === '1') document.body.classList.add('festive');
  if (festiveBtn) festiveBtn.addEventListener('click', () => {
    document.body.classList.toggle('festive');
    localStorage.setItem('ke-festive', document.body.classList.contains('festive') ? '1' : '0');
  });

  /* ============ 04. SCROLL PROGRESS + STICKY HEADER ============ */
  const progress = $('#scrollProgress');
  const header   = $('#header');
  const toTop    = $('#backToTop');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (header)   header.classList.toggle('is-stuck', y > 12);
    if (toTop)    toTop.classList.toggle('is-visible', y > 500);
    spyNav(y);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ============ 05. MOBILE NAV + SCROLL SPY ============ */
  const burger = $('#burger'), nav = $('#nav'), overlay = $('#navOverlay');
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open'); burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('is-locked');
    if (overlay) overlay.hidden = true;
  }
  function openNav() {
    nav.classList.add('is-open'); burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true'); document.body.classList.add('is-locked');
    if (overlay) overlay.hidden = false;
  }
  if (burger && nav) burger.addEventListener('click', () => nav.classList.contains('is-open') ? closeNav() : openNav());
  if (overlay) overlay.addEventListener('click', closeNav);
  $$('.nav__link, .nav__cta').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  const navLinks = $$('.nav__link');
  const sections = navLinks.map(l => document.getElementById(l.getAttribute('href').slice(1))).filter(Boolean);
  function spyNav(y) {
    if (!sections.length) return;
    const offset = y + window.innerHeight * 0.3;
    let current = sections[0].id;
    sections.forEach(s => { if (s.offsetTop <= offset) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + current));
  }

  /* ============ 06. REVEAL ON SCROLL (once) ============ */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  function startHeroIntro() {
    $$('.hero-anim').forEach(el => {
      const d = (parseInt(el.dataset.anim, 10) || 0) * 130;
      setTimeout(() => el.classList.add('in'), d);
    });
  }

  /* ============ 07. ANIMATED COUNTERS ============ */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1900, start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = val.toLocaleString('en-IN') + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('en-IN') + suffix;
    })(start);
  }
  const counters = $$('.counter');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  } else counters.forEach(animateCounter);

  /* ============ 08. CURSOR GLOW / MAGNETIC / 3D TILT ============ */
  if (finePointer && !reduceMotion) {
    const glow = $('#cursorGlow');
    let gx = innerWidth / 2, gy = innerHeight / 2, cx = gx, cy = gy;
    document.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; if (glow) glow.style.opacity = '1'; }, { passive: true });
    (function loop() {
      cx += (gx - cx) * 0.16; cy += (gy - cy) * 0.16;
      if (glow) glow.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    // Magnetic buttons
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.28}px,${my * 0.34}px)`;
        btn.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        btn.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // 3D tilt cards
    $$('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-8px)`;
        card.style.transition = 'transform .08s linear';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .6s var(--ease), box-shadow .5s';
        card.style.transform = '';
      });
    });
  }

  // Ripple on all buttons
  $$('.btn, .filter').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.left = (e.clientX - r.left) + 'px';
      s.style.top = (e.clientY - r.top) + 'px';
      s.style.width = s.style.height = Math.max(r.width, r.height) * 0.4 + 'px';
      btn.appendChild(s);
      setTimeout(() => s.remove(), 700);
    });
  });

  /* ============ 09. PRODUCT FILTER ============ */
  const filters = $$('.filter'), products = $$('#productGrid .product');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
    const f = btn.dataset.filter;
    products.forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      if (show) { card.classList.remove('is-hidden'); card.style.animation = 'fadeIn .5s ease both'; }
      else card.classList.add('is-hidden');
    });
  }));

  /* ============ 10. AC TEMPERATURE HOVER (30° → 18°) ============ */
  $$('.product[data-fx="air"]').forEach(card => {
    const val = $('.tempval', card);
    if (!val) return;
    let timer = null;
    card.addEventListener('mouseenter', () => {
      let t = 30; val.textContent = '30°';
      clearInterval(timer);
      timer = setInterval(() => { t--; val.textContent = t + '°'; if (t <= 18) clearInterval(timer); }, 90);
    });
    card.addEventListener('mouseleave', () => { clearInterval(timer); val.textContent = '30°'; });
  });

  /* ============ 11. GALLERY LIGHTBOX ============ */
  const items = $$('#galleryGrid .gallery__item');
  const lightbox = $('#lightbox'), lbImage = $('#lbImage'), lbCap = $('#lbCaption');
  let lbIndex = 0;
  function showSlide(i) {
    if (!items.length) return;
    lbIndex = (i + items.length) % items.length;
    const item = items[lbIndex], img = $('img', item);
    lbImage.src = item.dataset.src || img.src;
    lbImage.alt = img ? img.alt : '';
    lbCap.textContent = item.dataset.caption || '';
  }
  function openLightbox(i) { if (!lightbox) return; showSlide(i); lightbox.hidden = false; document.body.classList.add('is-locked'); $('#lbClose').focus(); }
  function closeLightbox() { if (!lightbox) return; lightbox.hidden = true; document.body.classList.remove('is-locked'); }
  items.forEach((item, i) => {
    item.setAttribute('tabindex', '0'); item.setAttribute('role', 'button');
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } });
  });
  if (lightbox) {
    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lbPrev').addEventListener('click', () => showSlide(lbIndex - 1));
    $('#lbNext').addEventListener('click', () => showSlide(lbIndex + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showSlide(lbIndex - 1);
      if (e.key === 'ArrowRight') showSlide(lbIndex + 1);
    });
    let tx = 0;
    lightbox.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) showSlide(dx > 0 ? lbIndex - 1 : lbIndex + 1);
    }, { passive: true });
  }

  /* ============ 12. FAQ ACCORDION ============ */
  $$('.faq__item').forEach(item => {
    const q = $('.faq__q', item), a = $('.faq__a', item);
    q.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      $$('.faq__item').forEach(o => { o.classList.remove('is-open'); $('.faq__q', o).setAttribute('aria-expanded', 'false'); $('.faq__a', o).style.maxHeight = null; });
      if (!open) { item.classList.add('is-open'); q.setAttribute('aria-expanded', 'true'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ============ 13. BACK TO TOP ============ */
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ============ 14. ENQUIRY FORM → WHATSAPP ============ */
  const form = $('#enquiryForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const note = $('#formNote'), name = $('#fName'), phone = $('#fPhone');
    let valid = true;
    [name, phone].forEach(f => {
      const ok = f.value.trim().length >= (f === phone ? 10 : 2);
      f.classList.toggle('is-invalid', !ok); if (!ok) valid = false;
    });
    if (!valid) { note.style.color = '#DC2626'; note.textContent = 'Please enter your name and a valid phone number.'; return; }
    const msg = 'Hello Kamadgiri Electronics!%0A' +
      'Name: ' + encodeURIComponent(name.value.trim()) + '%0A' +
      'Phone: ' + encodeURIComponent(phone.value.trim()) + '%0A' +
      'Interested in: ' + encodeURIComponent($('#fProduct').value) + '%0A' +
      'Budget: ' + encodeURIComponent($('#fBudget').value) + '%0A' +
      'Message: ' + encodeURIComponent($('#fMsg').value.trim() || '-');
    note.style.color = 'var(--accent)'; note.textContent = 'Opening WhatsApp… thank you, we will reply shortly!';
    window.open('https://wa.me/919473826875?text=' + msg, '_blank', 'noopener');
    form.reset();
  });

  /* ============ 15. BULB TOGGLE (showroom lighting) ============ */
  const bulb = $('#bulb');
  if (bulb) {
    if (!reduceMotion) setTimeout(() => document.body.classList.add('bulb-on'), 2000);
    bulb.addEventListener('click', () => document.body.classList.toggle('bulb-on'));
  }

  /* ============ 16. HERO PARTICLES + YEAR ============ */
  const pField = $('#heroParticles');
  if (pField && !reduceMotion) {
    const n = window.innerWidth < 640 ? 14 : 26;
    let html = '';
    for (let i = 0; i < n; i++) {
      const left = Math.random() * 100;
      const dur = 9 + Math.random() * 12;
      const delay = -Math.random() * 20;
      const size = 3 + Math.random() * 5;
      html += `<span class="particle" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
    }
    pField.innerHTML = html;
  }

  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  /* ============ SMOOTH ANCHOR SCROLL ============ */
  $$('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - hh - 10, behavior: 'smooth' });
    history.replaceState(null, '', id);
  }));

  onScroll();
})();
