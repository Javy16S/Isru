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

    // Note: Astro Header component handles this mostly, but if using this script for everything:
    if (btn && mobileMenu) {
      // Use existing listener if Astro attached it, or attach one here.
      // To avoid conflict, we only attach if no Astro script did. 
      // But since we can't know, we just ensure simple toggle logic.
      // Actually, Header.astro has its own script. 
      // Let's NOT interfere with Header.astro script if it exists.
      // But user complained about visibility etc.
    }

    // Product dataset with localized names
    // Fix: Handle subpath for GitHub Pages
    const getBasePath = () => {
      const host = window.location.hostname;
      return host.includes('github.io') ? '/Isru' : '';
    };
    const BASE = getBasePath();

    const products = [
      { id: 1, name: { es: 'Cartera Slim', en: 'Slim Wallet', fr: 'Portefeuille Slim' }, category: 'cartera', price: 29.99, color: 'gold', front: `${BASE}/images/product1.svg`, back: `${BASE}/images/product1b.svg`, w: 600, h: 400 },
      { id: 2, name: { es: 'Organizador Tote', en: 'Tote Organizer', fr: 'Organisateur Tote' }, category: 'organizador', price: 49.99, color: 'blue', front: `${BASE}/images/product2a.svg`, back: `${BASE}/images/product2b.svg`, w: 600, h: 400 },
      { id: 3, name: { es: 'Monedero Chic', en: 'Chic Coin Purse', fr: 'Porte-monnaie Chic' }, category: 'monedero', price: 19.99, color: 'white', front: `${BASE}/images/product3a.svg`, back: `${BASE}/images/product3b.svg`, w: 600, h: 400 }
    ];

    const translations = {
      es: {
        'nav.products': 'Productos', 'nav.about': 'Sobre', 'nav.contact': 'Contacto',
        'hero.title': 'Accesorios elegantes para organizar tu día', 'hero.subtitle': 'Diseños minimalistas en tonos dorado y azul para llevar todo lo esencial con estilo.', 'hero.cta': 'Ver colección',
        'products.title': 'Productos destacados', 'about.title': 'Sobre Isru', 'about.text': 'Isru diseña accesorios pensados para la mujer moderna: prácticos, elegantes y duraderos. Cada pieza está creada para ayudarte a mantener tus esenciales organizados sin sacrificar estilo.',
        'contact.title': 'Contacto', 'contact.name': 'Nombre', 'contact.email': 'Email', 'contact.message': 'Mensaje', 'contact.send': 'Enviar',
        'search.placeholder': 'Buscar productos...',
        'contact.name.placeholder': 'Tu nombre', 'contact.email.placeholder': 'tu@correo.com', 'contact.message.placeholder': '¿En qué te podemos ayudar?',
        'cat.all': 'Todas las categorías', 'cat.cartera': 'Carteras', 'cat.organizador': 'Organizadores', 'cat.monedero': 'Monederos',
        'col.all': 'Todos los colores', 'col.gold': 'Dorado', 'col.blue': 'Azul', 'col.white': 'Blanco',
        'controls.priceMax': 'Máx'
      },
      en: {
        'nav.products': 'Products', 'nav.about': 'About', 'nav.contact': 'Contact',
        'hero.title': 'Elegant accessories to organize your day', 'hero.subtitle': 'Minimal designs in gold and blue tones to carry your essentials in style.', 'hero.cta': 'View collection',
        'products.title': 'Featured products', 'about.title': 'About Isru', 'about.text': 'Isru designs accessories for the modern woman: practical, elegant and durable. Each piece helps keep your essentials organized without sacrificing style.',
        'contact.title': 'Contact', 'contact.name': 'Name', 'contact.email': 'Email', 'contact.message': 'Message', 'contact.send': 'Send',
        'search.placeholder': 'Search products...',
        'contact.name.placeholder': 'Your name', 'contact.email.placeholder': 'you@domain.com', 'contact.message.placeholder': 'How can we help you?',
        'cat.all': 'All categories', 'cat.cartera': 'Wallets', 'cat.organizador': 'Organizers', 'cat.monedero': 'Coin purses',
        'col.all': 'All colors', 'col.gold': 'Gold', 'col.blue': 'Blue', 'col.white': 'White',
        'controls.priceMax': 'Max'
      },
      fr: {
        'nav.products': 'Produits', 'nav.about': 'À propos', 'nav.contact': 'Contact',
        'hero.title': 'Accessoires élégants pour organiser votre journée', 'hero.subtitle': 'Designs minimalistes aux tons doré et bleu pour emporter l\'essentiel avec style.', 'hero.cta': 'Voir la collection',
        'products.title': 'Produits phares', 'about.title': 'À propos d\'Isru', 'about.text': 'Isru conçoit des accessoires pour la femme moderne : pratiques, élégants et durables. Chaque pièce aide à garder l\'essentiel organisé sans sacrificar el estilo.',
        'contact.title': 'Contact', 'contact.name': 'Nom', 'contact.email': 'Email', 'contact.message': 'Message', 'contact.send': 'Envoyer',
        'search.placeholder': 'Rechercher des produits...',
        'contact.name.placeholder': 'Votre nom', 'contact.email.placeholder': 'vous@exemple.com', 'contact.message.placeholder': 'Comment pouvons-nous vous aider?',
        'cat.all': 'Toutes les catégories', 'cat.cartera': 'Portefeuilles', 'cat.organizador': 'Organisateurs', 'cat.monedero': 'Porte-monnaie',
        'col.all': 'Toutes les couleurs', 'col.gold': 'Doré', 'col.blue': 'Bleu', 'col.white': 'Blanc',
        'controls.priceMax': 'Max'
      }
    };

    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const colorFilter = document.getElementById('colorFilter');
    const priceMax = document.getElementById('priceMax');
    const langSelect = document.getElementById('langSelect');

    // Locale handling
    const supported = ['es', 'en', 'fr'];
    function getSavedLocale() {
      try {
        const saved = localStorage.getItem('isru_locale');
        if (saved && supported.includes(saved)) return saved;
        const nav = navigator.language ? navigator.language.slice(0, 2) : 'es';
        return supported.includes(nav) ? nav : 'es';
      } catch (e) {
        return 'es';
      }
    }
    let locale = getSavedLocale();
    if (langSelect) langSelect.value = locale;

    // Render products
    function renderProducts(list) {
      if (!productGrid) return;
      productGrid.innerHTML = list.map(p => {
        const displayName = (typeof p.name === 'object') ? (p.name[locale] || p.name.es) : p.name;
        const aria = escapeHtml(displayName);
        // Correct path assumption
        const frontPath = p.front;
        const backPath = p.back;

        return `
          <article class="bg-white rounded-xl shadow-[0_10px_30px_rgba(11,17,28,0.06)] hover:shadow-[0_20px_40px_rgba(11,17,28,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden group">
            <a class="block h-full group/link" href="#" aria-label="${aria}">
              <div class="relative h-64 flex items-center justify-center bg-gray-50 overflow-hidden">
                <div class="hover-swap relative w-full h-full" tabindex="0">
                  <img class="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300 opacity-100 scale-100 group-hover/link:opacity-0 group-hover/link:scale-95 [.swap_&]:opacity-0 [.swap_&]:scale-95" 
                       src="${frontPath}" alt="${aria} - frontal" loading="lazy" width="${p.w}" height="${p.h}">
                  
                  <img class="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300 opacity-0 scale-105 group-hover/link:opacity-100 group-hover/link:scale-100 [.swap_&]:opacity-100 [.swap_&]:scale-100" 
                       src="${backPath}" alt="${aria} - trasera" loading="lazy" width="${p.w}" height="${p.h}">
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-poppins font-semibold text-lg text-gray-900 mb-2">${aria}</h3>
                <p class="text-blue-700 font-bold">$${String(p.price)}</p>
              </div>
            </a>
          </article>
        `;
      }).join('');

      // Re-bind hover-swap handlers for touch
      const newSwaps = document.querySelectorAll('.hover-swap');
      newSwaps.forEach(el => {
        el.addEventListener('touchstart', (e) => {
          el.classList.toggle('swap');
        }, { passive: true });
        el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); el.classList.toggle('swap'); } });
      });
    }

    function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;'); }

    // Fuse.js
    let fuse;
    if (window.Fuse) fuse = new Fuse(products, { keys: ['name.es', 'name.en', 'name.fr', 'category', 'color'], threshold: 0.35 });

    function applyTranslations() {
      console.log('Applying translations for locale:', locale);
      const map = translations[locale] || translations['es'];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (map[key]) {
          el.textContent = map[key];
        }
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (map[key]) el.placeholder = map[key];
      });

      // Re-render products to update titles
      performSearchAndFilter();
    }

    if (langSelect) {
      // Remove cloning. Just attach safely.
      // Use a flag on the element to avoid duplicate listeners.
      if (!langSelect.dataset.hasIsruListener) {
        langSelect.dataset.hasIsruListener = 'true';
        langSelect.addEventListener('change', (e) => {
          console.log('Language changed to:', e.target.value);
          locale = e.target.value;
          try {
            localStorage.setItem('isru_locale', locale);
          } catch (err) {
            console.error('Could not save locale:', err);
          }
          applyTranslations();
        });
      }
      langSelect.value = locale;
    }

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

    // Inputs setup with anti-duplication
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

    // Initial setup
    applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();