document.addEventListener('DOMContentLoaded', () => {
  // Año en footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Subrayado animado del título
  const u = document.getElementById('underlineAnim');
  if (u) setTimeout(() => (u.style.transform = 'scaleX(1)'), 180);

  // ===== Pestaña “Acerca de” =====
  const about  = document.getElementById('about');
  const toggle = document.getElementById('aboutToggle');
  const panel  = document.getElementById('aboutPanel');

  if (about && toggle && panel) {
    const setOpen = (open) => {
      about.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
    };
    setOpen(false);

    // Click abre/cierra (desktop y móvil)
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!about.contains(e.target)) setOpen(false);
    });

    // Esc para cerrar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    // Hover solo en desktop (no se activa en táctiles)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      about.addEventListener('mouseenter', () => setOpen(true));
      about.addEventListener('mouseleave', () => setOpen(false));
    }
  }

  // ===== Carruseles: flechas + rueda horizontal =====
  document.querySelectorAll('.carousel-wrap').forEach((wrap) => {
    const car = wrap.querySelector('.carousel');
    const left = wrap.querySelector('.carousel-arrow.left');
    const right = wrap.querySelector('.carousel-arrow.right');

    function scrollByCard(dir) {
      const card = car.querySelector('.card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(car).gap) || 18;
      const w = card.getBoundingClientRect().width + gap;
      car.scrollBy({ left: dir * w, behavior: 'smooth' });
    }
    if (left) left.addEventListener('click', () => scrollByCard(-1));
    if (right) right.addEventListener('click', () => scrollByCard(1));

    car.addEventListener(
      'wheel',
      (e) => {
        if (Math.abs(e.deltaX) > 0) return;
        e.preventDefault();
        car.scrollBy({ left: e.deltaY, behavior: 'auto' });
      },
      { passive: false }
    );
  });

  // ===== Lazy YouTube (autoplay muted) =====
  function ytUrl(id) {
    return `https://www.youtube.com/embed/${encodeURIComponent(
      id
    )}?rel=0&autoplay=1&mute=1&modestbranding=1`;
  }
  const ytObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.intersectionRatio >= 0.55) {
          if (!el.querySelector('iframe') && el.dataset.video) {
            const ifr = document.createElement('iframe');
            ifr.src = ytUrl(el.dataset.video);
            ifr.allow = 'autoplay; encrypted-media; picture-in-picture';
            ifr.width = '100%';
            ifr.height = '100%';
            ifr.frameBorder = '0';
            el.appendChild(ifr);
          }
        } else {
          const ifr = el.querySelector('iframe');
          if (ifr) ifr.remove();
        }
      });
    },
    { threshold: [0, 0.25, 0.55, 0.9] }
  );
  document.querySelectorAll('.card[data-video]').forEach((c) => ytObserver.observe(c));

  // ===== Vídeos locales (Fotografía) =====
  function safePlay(v) { if (!v || !v.paused) return; const p = v.play(); if (p) p.catch(() => {}); }
  function safePause(v) { try { v.pause(); } catch(e){} }

  const localObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target,
          v = card.querySelector('video');
        if (!v) return;
        if (entry.intersectionRatio >= 0.55) safePlay(v);
        else safePause(v);
      });
    },
    { threshold: [0, 0.25, 0.55, 0.9] }
  );
  document.querySelectorAll('.card[data-local="true"]').forEach((c) => localObserver.observe(c));

  // Pausa locales fuera de vista durante scroll
  document.querySelectorAll('.carousel').forEach((car) => {
    car.addEventListener(
      'scroll',
      () => {
        document.querySelectorAll('.card[data-local="true"]').forEach((card) => {
          const r = card.getBoundingClientRect();
          const vw = window.innerWidth || document.documentElement.clientWidth;
          const vh = window.innerHeight || document.documentElement.clientHeight;
          const visible = r.right > 0 && r.left < vw && r.bottom > 0 && r.top < vh;
          const v = card.querySelector('video');
          if (!v) return;
          if (!visible) safePause(v);
        });
      },
      { passive: true }
    );
  });
});
