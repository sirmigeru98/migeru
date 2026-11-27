(() => {
  const content = document.querySelector('.post-content');
  if (!content || typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'media-focus';
  dialog.setAttribute('aria-label', 'Vista ampliada del contenido multimedia');
  dialog.innerHTML = '<div class="media-focus-bar"><span>Vista ampliada</span><button type="button" class="media-focus-close" aria-label="Cerrar vista ampliada">Cerrar <span aria-hidden="true">×</span></button></div><div class="media-focus-content"></div><p class="media-focus-caption"></p>';
  document.body.appendChild(dialog);
  const stage = dialog.querySelector('.media-focus-content');
  const caption = dialog.querySelector('.media-focus-caption');
  const pdfLink = document.createElement('a');
  pdfLink.className = 'media-focus-pdf-link';
  pdfLink.textContent = 'abrir el pdf en otra pestaña';
  pdfLink.target = '_blank';
  pdfLink.rel = 'noopener noreferrer';
  pdfLink.hidden = true;
  caption.insertAdjacentElement('afterend', pdfLink);
  let opener;
  let galleryImages = [];
  let galleryIndex = 0;
  let sourceGallery = null;
  const galleryNav = document.createElement('div');
  galleryNav.className = 'focus-gallery-nav';
  galleryNav.hidden = true;
  galleryNav.innerHTML = '<button type="button" class="focus-gallery-prev" aria-label="imagen anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5 7.5 12l7 7"/></svg></button><span class="focus-gallery-dots" aria-label="elegir imagen"></span><button type="button" class="focus-gallery-next" aria-label="imagen siguiente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7"/></svg></button><span class="focus-gallery-status" aria-live="polite"></span>';
  stage.insertAdjacentElement('afterend', galleryNav);
  const prev = galleryNav.querySelector('.focus-gallery-prev');
  const next = galleryNav.querySelector('.focus-gallery-next');
  const dots = galleryNav.querySelector('.focus-gallery-dots');
  const status = galleryNav.querySelector('.focus-gallery-status');
  const showImage = index => {
    galleryIndex = Math.max(0, Math.min(galleryImages.length - 1, index));
    const image = galleryImages[galleryIndex];
    const copy = image.cloneNode(true);
    copy.removeAttribute('tabindex');
    copy.removeAttribute('role');
    copy.removeAttribute('aria-label');
    copy.classList.remove('media-focus-clickable');
    stage.replaceChildren(copy);
    caption.textContent = image.alt || '';
    prev.disabled = galleryIndex === 0;
    next.disabled = galleryIndex === galleryImages.length - 1;
    status.textContent = `imagen ${galleryIndex + 1} de ${galleryImages.length}`;
    dots.querySelectorAll('button').forEach((dot, i) => {
      if (i === galleryIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  prev.addEventListener('click', () => showImage(galleryIndex - 1));
  next.addEventListener('click', () => showImage(galleryIndex + 1));
  dialog.addEventListener('keydown', event => {
    if (galleryNav.hidden) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let touchStartX = null;
  stage.addEventListener('touchstart', event => { if (!galleryNav.hidden && event.touches.length === 1) touchStartX = event.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (touchStartX === null || galleryNav.hidden || !event.changedTouches.length) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 45) showImage(galleryIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });
  let scrollPosition = 0;
  let previousOverflow = '';
  let previousBodyStyle = '';
  let scrollLocked = false;

  const lockScroll = () => {
    scrollPosition = window.scrollY;
    scrollLocked = true;
    previousOverflow = document.documentElement.style.overflow;
    previousBodyStyle = document.body.getAttribute('style');
    document.documentElement.style.overflow = 'hidden';
    Object.assign(document.body.style, { position: 'fixed', top: `-${scrollPosition}px`, left: '0', right: '0', width: '100%' });
  };
  const unlockScroll = () => {
    document.documentElement.style.overflow = previousOverflow;
    if (previousBodyStyle === null) document.body.removeAttribute('style');
    else document.body.setAttribute('style', previousBodyStyle);
    window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    scrollLocked = false;
  };

  const cleanup = () => {
    if (dialog.open || !scrollLocked) return;
    stage.replaceChildren();
    caption.textContent = '';
    pdfLink.hidden = true;
    pdfLink.removeAttribute('href');
    dialog.classList.remove('media-focus--pdf');
    if (sourceGallery) { sourceGallery.scrollLeft = galleryIndex * sourceGallery.clientWidth; opener = galleryImages[galleryIndex]; }
    sourceGallery = null; galleryImages = []; galleryNav.hidden = true; dots.replaceChildren();
    unlockScroll();
    if (opener) opener.focus({ preventScroll: true });
  };
  const close = () => { dialog.close(); cleanup(); };
  dialog.querySelector('.media-focus-close').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('close', cleanup);

  content.querySelectorAll('img, video, audio, iframe, svg.media-illustration').forEach(media => {
    const container = document.createElement('div');
    container.className = 'media-focus-item';
    media.parentNode.insertBefore(container, media);
    container.appendChild(media);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'media-focus-trigger';
    const label = media.getAttribute('alt') || media.getAttribute('title') || (media.tagName.toLowerCase() === 'audio' ? 'audio' : media.tagName.toLowerCase() === 'video' ? 'vídeo' : 'gráfico');
    const isPdf = media.matches('iframe') && (container.closest('.media-document') || /\.pdf(?:$|[?#])/i.test(media.getAttribute('src') || ''));
    button.setAttribute('aria-label', isPdf ? `Leer ${label} en modo de enfoque` : `Ampliar ${label}`);
    button.innerHTML = isPdf ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H4v4M16 4h4v4M4 16v4h4m12-4v4h-4M4 8l5-5m11 5-5-5M4 16l5 5m11-5-5 5"/></svg>' : '<span aria-hidden="true">⤢</span> Ampliar';
    if (isPdf) button.title = 'leer en modo de enfoque';
    if (isPdf) button.classList.add('media-focus-pdf-trigger');
    container.appendChild(button);
    button.addEventListener('click', () => {
      opener = button;
      pdfLink.hidden = true;
      pdfLink.removeAttribute('href');
      dialog.classList.toggle('media-focus--pdf', Boolean(isPdf));
      if (isPdf) {
        try {
          const url = new URL(media.getAttribute('src'), document.baseURI);
          if (url.protocol === 'http:' || url.protocol === 'https:') {
            pdfLink.href = url.href;
            pdfLink.hidden = false;
          }
        } catch (_) { /* El enlace alternativo se omite si la ruta no es válida. */ }
      }
      const gallery = media.matches('img') ? container.closest('.media-gallery') : null;
      galleryImages = gallery ? Array.from(gallery.querySelectorAll('.media-focus-item > img')) : [];
      sourceGallery = galleryImages.length > 1 ? gallery : null;
      if (sourceGallery) {
        galleryIndex = galleryImages.indexOf(media);
        dots.replaceChildren();
        galleryImages.forEach((image, index) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'focus-gallery-dot';
          dot.setAttribute('aria-label', `ir a la imagen ${index + 1}`);
          dot.addEventListener('click', () => showImage(index));
          dots.appendChild(dot);
        });
        galleryNav.hidden = false;
        showImage(galleryIndex);
        dialog.showModal();
        lockScroll();
        dialog.querySelector('.media-focus-close').focus();
        return;
      }
      galleryNav.hidden = true;
      const copy = media.cloneNode(true);
      if (copy.matches('audio, video')) {
        media.pause();
        copy.controls = true;
        copy.preload = 'metadata';
        if (Number.isFinite(media.currentTime)) copy.addEventListener('loadedmetadata', () => { try { copy.currentTime = media.currentTime; } catch (_) {} }, { once: true });
      }
      if (copy.matches('iframe')) copy.loading = 'eager';
      let loading = null;
      if (isPdf) {
        loading = document.createElement('p');
        loading.className = 'media-focus-loading';
        loading.setAttribute('role', 'status');
        loading.textContent = 'cargando documento…';
        stage.replaceChildren(loading);
      } else {
        stage.replaceChildren(copy);
      }
      const figure = container.closest('figure');
      caption.textContent = figure?.querySelector('figcaption')?.textContent || media.getAttribute('title') || media.getAttribute('alt') || '';
      dialog.showModal();
      lockScroll();
      dialog.querySelector('.media-focus-close').focus();
      if (isPdf) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (dialog.open && stage.firstElementChild === loading) stage.replaceChildren(copy);
        }));
      }
    });
    if (media.matches('img, svg.media-illustration')) {
      media.classList.add('media-focus-clickable');
      media.setAttribute('tabindex', '0');
      media.setAttribute('role', 'button');
      media.setAttribute('aria-label', `Ampliar ${label}`);
      const openFromMedia = () => { button.click(); opener = media; };
      media.addEventListener('click', openFromMedia);
      media.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openFromMedia(); }
      });
    }
    if (media.matches('video')) {
      media.classList.add('media-focus-clickable');
      media.addEventListener('click', event => {
        const bounds = media.getBoundingClientRect();
        const controlsArea = Math.min(64, bounds.height / 3);
        if (event.clientY >= bounds.bottom - controlsArea) return;
        event.preventDefault();
        button.click();
      });
    }
  });
})();