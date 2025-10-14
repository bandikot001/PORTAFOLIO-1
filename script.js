// script.js - anima la linea amarilla y controla el panel "Acerca de" en mobile (clic)
document.addEventListener('DOMContentLoaded', () => {
  // 1) Trigger underline animation (left -> right)
  const underline = document.getElementById('underlineAnim');
  if (underline) {
    // small delay for nicer entrance
    setTimeout(() => {
      underline.style.transition = 'transform 900ms cubic-bezier(.2,.9,.25,1)';
      underline.style.transform = 'scaleX(1)';
    }, 160); // ajusta el delay si quieres
  }

  // 2) Acerca de: toggle on click for mobile, hover works on desktop via CSS
  const wrap = document.getElementById('acercaWrap');
  const btn = document.getElementById('acercaBtn');
  const panel = document.getElementById('acercaPanel');

  if (btn && wrap && panel) {
    // Toggle on click (useful on touch devices)
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close panel if user clicks outside
    document.addEventListener('click', (ev) => {
      if (!wrap.contains(ev.target) && wrap.classList.contains('open')) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Keyboard: Esc to close
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && wrap.classList.contains('open')) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  }
});

