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
    previous.className = 'gallery-previous';
    previous.setAttribute('aria-label', 'imagen anterior');
    previous.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5 7.5 12l7 7"/></svg>';
    const status = document.createElement('span');
    status.className = 'gallery-status';
    status.setAttribute('aria-live', 'polite');
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'gallery-next';
    next.setAttribute('aria-label', 'imagen siguiente');
    next.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7"/></svg>';
    const dots = document.createElement('div');
    dots.className = 'gallery-dots';
    dots.setAttribute('aria-label', 'elegir imagen');
    const indicators = slides.map((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery-dot';
      dot.setAttribute('aria-label', `ir a la imagen ${index + 1}`);
      dot.addEventListener('click', () => go(index));
      dots.appendChild(dot);
      return dot;
    });
    controls.append(previous, next, dots, status);
    const frame = document.createElement('div');
    frame.className = 'gallery-frame';
    gallery.parentNode.insertBefore(frame, gallery);
    frame.append(gallery, controls);

    let current = 0;
    const update = () => {
      const width = gallery.clientWidth || 1;
      current = Math.max(0, Math.min(slides.length - 1, Math.round(gallery.scrollLeft / width)));
      previous.disabled = current === 0;
      next.disabled = current === slides.length - 1;
      status.textContent = `imagen ${current + 1} de ${slides.length}`;
      indicators.forEach((dot, index) => {
        if (index === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
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