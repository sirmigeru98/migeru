(() => {
  document.querySelectorAll('.post-content .media-gallery').forEach(gallery => {
    const slides = Array.from(gallery.children).filter(item => item.matches('img, .media-focus-item'));
    if (slides.length < 2) return;
    gallery.classList.add('is-carousel');
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', 'galería de imágenes');
    gallery.setAttribute('tabindex', '0');

    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.textContent = 'anterior';
    const status = document.createElement('span');
    status.className = 'gallery-status';
    status.setAttribute('aria-live', 'polite');
    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = 'siguiente';
    controls.append(previous, status, next);
    gallery.insertAdjacentElement('afterend', controls);

    let current = 0;
    const update = () => {
      const width = gallery.clientWidth || 1;
      current = Math.max(0, Math.min(slides.length - 1, Math.round(gallery.scrollLeft / width)));
      previous.disabled = current === 0;
      next.disabled = current === slides.length - 1;
      status.textContent = `${current + 1} / ${slides.length}`;
    };
    const go = index => {
      const target = Math.max(0, Math.min(slides.length - 1, index));
      gallery.scrollTo({ left: target * gallery.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };
    previous.addEventListener('click', () => go(current - 1));
    next.addEventListener('click', () => go(current + 1));
    gallery.addEventListener('scroll', update, { passive: true });
    gallery.addEventListener('keydown', event => {
      if (event.target !== gallery) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        go(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });

    let dragging = false, moved = false, startX = 0, startScroll = 0;
    gallery.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragging = true; moved = false; startX = event.clientX; startScroll = gallery.scrollLeft;
    });
    window.addEventListener('pointermove', event => {
      if (!dragging) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 6) moved = true;
      if (moved) { event.preventDefault(); gallery.classList.add('is-dragging'); gallery.scrollLeft = startScroll - distance; }
    });
    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      gallery.classList.remove('is-dragging');
      if (moved) go(Math.round(gallery.scrollLeft / (gallery.clientWidth || 1)));
    });
    gallery.addEventListener('click', event => {
      if (moved) { event.preventDefault(); event.stopImmediatePropagation(); moved = false; }
    }, true);
    gallery.addEventListener('dragstart', event => event.preventDefault());
    update();
  });
})();