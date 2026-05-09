const CartStore = (() => {
  const KEY = 'ggbond_cart';

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function add(item) {
    const items = get();
    if (!items.find(i => i.id === item.id)) {
      items.push(item);
      save(items);
    }
    updateAllBadges();
  }

  function remove(id) {
    save(get().filter(i => i.id !== id));
    updateAllBadges();
  }

  function clear() {
    localStorage.removeItem(KEY);
    updateAllBadges();
  }

  function count() { return get().length; }

  function has(id) { return get().some(i => i.id === id); }

  function updateAllBadges() {
    const n = count();
    document.querySelectorAll('.cart-badge').forEach(el => { el.textContent = n; });
  }

  return { get, add, remove, clear, count, has, updateAllBadges };
})();

document.addEventListener('DOMContentLoaded', () => CartStore.updateAllBadges());
