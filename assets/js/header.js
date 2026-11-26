(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    if (document.querySelector('.media-focus[open]')) return;
    const distance = Math.max(0, window.scrollY);
    header.classList.toggle('is-scrolled', distance > 12);
    if (document.body.classList.contains('has-post-cover')) {
      const fadeDistance = Math.min(320, Math.max(180, window.innerHeight * .35));
      document.body.style.setProperty('--cover-opacity', String(Math.max(0, 1 - distance / fadeDistance)));
    }
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', update);
  update();
})();