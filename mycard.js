const CardStore = (() => {
  const KEY = 'ggbond_collection';

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function add(item) {
    const items = get();
    items.push(item);
    save(items);
  }

  function remove(id) {
    save(get().filter(i => i.id !== id));
  }

  function count() { return get().length; }

  function totalValue() {
    return get().reduce((s, i) => s + (parseFloat(i.currentValue) || 0), 0);
  }

  function topByValue() {
    const d = get();
    if (!d.length) return null;
    return d.reduce((b, i) => (parseFloat(i.currentValue) || 0) > (parseFloat(b.currentValue) || 0) ? i : b);
  }

  function topCategory() {
    const c = {};
    get().forEach(i => { c[i.category] = (c[i.category] || 0) + 1; });
    const e = Object.entries(c);
    return e.length ? e.sort((a, b) => b[1] - a[1])[0][0] : null;
  }

  return { get, add, remove, count, totalValue, topByValue, topCategory };
})();
