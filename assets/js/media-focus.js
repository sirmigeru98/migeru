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
  let opener;
  let scrollPosition = 0;
  let previousOverflow = '';
  let previousBodyStyle = '';

  const lockScroll = () => {
    scrollPosition = window.scrollY;
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
  };

  const close = () => dialog.close();
  dialog.querySelector('.media-focus-close').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    stage.replaceChildren();
    caption.textContent = '';
    unlockScroll();
    if (opener) opener.focus({ preventScroll: true });
  });

  content.querySelectorAll('img, video, audio, iframe, svg.media-illustration').forEach(media => {
    const container = document.createElement('div');
    container.className = 'media-focus-item';
    media.parentNode.insertBefore(container, media);
    container.appendChild(media);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'media-focus-trigger';
    const label = media.getAttribute('alt') || media.getAttribute('title') || (media.tagName.toLowerCase() === 'audio' ? 'audio' : media.tagName.toLowerCase() === 'video' ? 'vídeo' : 'gráfico');
    button.setAttribute('aria-label', `Ampliar ${label}`);
    button.innerHTML = '<span aria-hidden="true">⤢</span> Ampliar';
    container.appendChild(button);
    button.addEventListener('click', () => {
      opener = button;
      const copy = media.cloneNode(true);
      if (copy.matches('audio, video')) {
        media.pause();
        copy.controls = true;
        copy.preload = 'metadata';
        if (Number.isFinite(media.currentTime)) copy.addEventListener('loadedmetadata', () => { try { copy.currentTime = media.currentTime; } catch (_) {} }, { once: true });
      }
      if (copy.matches('iframe')) copy.loading = 'eager';
      stage.replaceChildren(copy);
      const figure = container.closest('figure');
      caption.textContent = figure?.querySelector('figcaption')?.textContent || media.getAttribute('title') || media.getAttribute('alt') || '';
      dialog.showModal();
      lockScroll();
      dialog.querySelector('.media-focus-close').focus();
    });
  });
})();