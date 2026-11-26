(() => {
  const archive = document.querySelector('.archive-page');
  const tools = archive?.querySelector('.archive-tools');
  if (!tools) return;
  const search = tools.querySelector('#story-search');
  const clear = tools.querySelector('.archive-clear');
  const filters = Array.from(tools.querySelectorAll('[data-category]'));
  const groups = Array.from(archive.querySelectorAll('.archive-year'));
  const posts = Array.from(archive.querySelectorAll('.post-row'));
  const count = tools.querySelector('.archive-result-count');
  const empty = archive.querySelector('.archive-no-results');
  let category = '';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  const entries = posts.map(post => ({
    post,
    category: normalize(post.dataset.category || ''),
    text: normalize((post.dataset.category || '') + ' ' + (post.dataset.search || ''))
  }));
  const update = () => {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    entries.forEach(entry => {
      const matches = (!category || entry.category === category) && terms.every(term => entry.text.includes(term));
      entry.post.hidden = !matches;
      if (matches) visible++;
    });
    groups.forEach(group => { group.hidden = !group.querySelector('.post-row:not([hidden])'); });
    const filtered = terms.length > 0 || category !== '';
    count.textContent = filtered ? (visible === 1 ? '1 historia encontrada' : `${visible} historias encontradas`) : '';
    empty.hidden = visible !== 0;
    clear.hidden = search.value.length === 0;
  };
  const reset = () => {
    search.value = '';
    category = '';
    filters.forEach(button => button.setAttribute('aria-pressed', String(!button.dataset.category)));
    update();
    search.focus();
  };
  search.addEventListener('input', update);
  clear.addEventListener('click', () => { search.value = ''; update(); search.focus(); });
  filters.forEach(button => button.addEventListener('click', () => {
    category = normalize(button.dataset.category || '');
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    update();
  }));
  empty.querySelector('button').addEventListener('click', reset);
  tools.hidden = false;
  update();
})();