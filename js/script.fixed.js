(function () {
  function init() {
    // Prevent double initialization
    if (document.body.dataset.isruScriptInit) return;
    document.body.dataset.isruScriptInit = 'true';

    console.log('Isru script initializing...');

    // Year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Mobile nav toggle
    const btn = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (btn && mobileMenu) {
      // Managed by Astro component mostly
    }

    // Product dataset with localized names
    // Fix: Handle subpath for GitHub Pages AND Localhost subpaths
    const getBasePath = () => {
      const path = window.location.pathname;
      // If we are on a known subpath (e.g. GitHub pages)
      if (path.startsWith('/Isru')) return '/Isru';
      return '';
    };
    const BASE = getBasePath();

    // Use data injected from Astro (Products.astro)
    // Fallback to empty if not found to prevent crash, though it should be there.
    const products = (window.ISRU_PRODUCTS || []).map(p => ({
      ...p,
      // Ensure paths are absolute for the client
      front: p.front.startsWith('http') || p.front.startsWith('/') ? p.front : `${BASE}/images/${p.front}`,
      back: p.back.startsWith('http') || p.back.startsWith('/') ? p.back : `${BASE}/images/${p.back}`
    }));

    // Translations moved to Layout.astro (Global) and pdp specific logic to [id].astro

    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const colorFilter = document.getElementById('colorFilter');
    const priceMax = document.getElementById('priceMax');
    const langSelect = document.getElementById('langSelect');

    // Locale handling
    // Locale handling
    function getSavedLocale() {
      try {
        const saved = localStorage.getItem('isru_locale');
        return saved || 'es';
      } catch (e) {
        return 'es';
      }
    }
    let locale = getSavedLocale();
    if (langSelect) langSelect.value = locale; // Sync initial value if global didn't catches it yet (race condition safety)

    // Render products MINIMALIST VERSION
    function renderProducts(list) {
      if (!productGrid) return;
      productGrid.innerHTML = list.map((p, index) => {
        const displayName = (typeof p.name === 'object') ? (p.name[locale] || p.name.es) : p.name;
        // ... rest of render logic remains implicitly the same if I don't change it here, but I must provide the full function content if I am replacing the block
        // Wait, replace_file_content requires exact target match. I should be careful.
        // Let's just modify the translation/listener parts.

        const aria = escapeHtml(displayName);
        const frontPath = p.front;
        const backPath = p.back;

        // Minimalist Card: Magazine Style
        // Aspect ratio 3/4 for fashion look
        return `
          <article class="group relative animate-fade-in" style="animation-delay: ${index * 100}ms">
            <a class="block relative" href="${BASE}/product/${p.id}" aria-label="${aria}">
              <div class="relative aspect-[3/4] w-full bg-[#f8f8f8] overflow-hidden mb-4 rounded-sm">
                <div class="hover-swap relative w-full h-full">
                  <img class="absolute inset-0 w-full h-full object-contain p-0 transition-transform duration-700 ease-out opacity-100 scale-100 group-hover:scale-105" 
                       src="${frontPath}" alt="${aria} - frontal" loading="lazy">
                  
                  <img class="absolute inset-0 w-full h-full object-contain p-0 transition-transform duration-700 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100" 
                       src="${backPath}" alt="${aria} - trasera" loading="lazy">
                </div>
                
                <!-- NEW Badge if new (stub logic) -->
                ${p.id === 1 ? '<span class="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-gray-400">New Arrival</span>' : ''}
              </div>
              
              <div class="text-left space-y-1">
                <h3 class="font-cinzel text-base text-gray-900 tracking-wide group-hover:underline decoration-gray-300 underline-offset-4 decoration-1 transition-all">${aria}</h3>
                <p class="font-light text-sm text-gray-500 tracking-wide">$${String(p.price)}</p>
              </div>
            </a>
          </article>
        `;
      }).join('');

      const newSwaps = document.querySelectorAll('.hover-swap');
      newSwaps.forEach(el => {
        el.addEventListener('touchstart', (e) => { el.classList.toggle('swap'); }, { passive: true });
        el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); el.classList.toggle('swap'); } });
      });
    }

    function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;'); }

    let fuse;
    if (window.Fuse) fuse = new Fuse(products, { keys: ['name.es', 'name.en', 'name.fr', 'category', 'color'], threshold: 0.35 });

    // Listen to GLOBAL locale change
    document.addEventListener('localeChanged', (e) => {
      console.log('Script fixed received locale change:', e.detail.locale);
      locale = e.detail.locale;
      performSearchAndFilter();
    });

    // Initial render
    performSearchAndFilter();

    function performSearchAndFilter() {
      const term = searchInput ? searchInput.value.trim() : '';
      let results = products.slice();
      if (term && fuse) {
        const f = fuse.search(term).map(r => r.item.id);
        results = products.filter(p => f.includes(p.id));
      }
      const cat = categoryFilter ? categoryFilter.value : 'all';
      if (cat && cat !== 'all') results = products.filter(p => p.category === cat);
      const col = colorFilter ? colorFilter.value : 'all';
      if (col && col !== 'all') results = products.filter(p => p.color === col);
      const max = priceMax ? Number(priceMax.value) : Infinity;
      if (!isNaN(max)) results = results.filter(p => p.price <= max);
      renderProducts(results);
    }

    function debounce(fn, wait = 220) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; }

    const setupListener = (id, event, fn) => {
      const el = document.getElementById(id);
      if (el && !el.dataset.hasIsruListener) {
        el.dataset.hasIsruListener = 'true';
        el.addEventListener(event, fn);
      }
    };

    setupListener('searchInput', 'input', debounce(performSearchAndFilter, 180));
    setupListener('categoryFilter', 'change', performSearchAndFilter);
    setupListener('colorFilter', 'change', performSearchAndFilter);
    setupListener('priceMax', 'input', debounce(performSearchAndFilter, 180));

    // Init
    // applyTranslations(); // Removed, handled by global logic + localeChanged listener
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();