(() => {
  const article = document.querySelector('.post-page');
  const content = article?.querySelector('.post-content');
  if (!content) return;
  const headings = Array.from(content.querySelectorAll('h2[id]'));
  if (headings.length < 2) return;

  const nav = document.createElement('nav');
  nav.className = 'post-toc';
  nav.setAttribute('aria-label', 'Índice del artículo');
  const details = document.createElement('details');
  details.className = 'post-toc-details';
  const summary = document.createElement('summary');
  summary.textContent = 'índice';
  const list = document.createElement('ol');
  headings.forEach(heading => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent;
    link.addEventListener('click', () => { if (window.matchMedia('(max-width: 1100px)').matches) requestAnimationFrame(() => { details.open = false; }); });
    item.appendChild(link);
    list.appendChild(item);
  });
  details.append(summary, list);
  nav.appendChild(details);
  article.insertBefore(nav, content);

  const desktop = window.matchMedia('(min-width: 1101px)');
  const syncLayout = () => { details.open = desktop.matches; };
  desktop.addEventListener('change', syncLayout);
  syncLayout();
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !desktop.matches && details.open) { details.open = false; summary.focus(); } });
  document.addEventListener('click', event => { if (!desktop.matches && details.open && !nav.contains(event.target)) details.open = false; });
  const links = Array.from(list.querySelectorAll('a'));
  const update = () => {
    let active = -1;
    headings.forEach((heading, index) => { if (heading.getBoundingClientRect().top <= 160) active = index; });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();