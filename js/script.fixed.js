document.addEventListener('DOMContentLoaded', () => {
  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('navToggle');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '12px';
      } else {
        nav.style.display = '';
      }
    });
  }

  // Product dataset with localized names
  const products = [
    { id: 1, name: { es: 'Cartera Slim', en: 'Slim Wallet', fr: 'Portefeuille Slim' }, category: 'cartera', price: 29.99, color: 'gold', front: 'images/product1a.svg', back: 'images/product1b.svg', w: 600, h: 400 },
    { id: 2, name: { es: 'Organizador Tote', en: 'Tote Organizer', fr: 'Organisateur Tote' }, category: 'organizador', price: 49.99, color: 'blue', front: 'images/product2a.svg', back: 'images/product2b.svg', w: 600, h: 400 },
    { id: 3, name: { es: 'Monedero Chic', en: 'Chic Coin Purse', fr: 'Porte-monnaie Chic' }, category: 'monedero', price: 19.99, color: 'white', front: 'images/product3a.svg', back: 'images/product3b.svg', w: 600, h: 400 }
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
    const saved = localStorage.getItem('isru_locale');
    if (saved && supported.includes(saved)) return saved;
    const nav = navigator.language ? navigator.language.slice(0, 2) : 'es';
    return supported.includes(nav) ? nav : 'es';
  }
  let locale = getSavedLocale();
  if (langSelect) langSelect.value = locale;

  // Render products
  function renderProducts(list) {
    if (!productGrid) return;
    productGrid.innerHTML = list.map(p => {
      const displayName = (typeof p.name === 'object') ? (p.name[locale] || p.name.es) : p.name;
      const aria = escapeHtml(displayName);
      const webpFront = p.front.replace(/\.svg$/i, '.webp');
      const webpBack = p.back.replace(/\.svg$/i, '.webp');
      return `\n        <article class="card">\n          <a class="product-link" href="#" aria-label="${aria}">\n            <div class="media">\n              <div class="hover-swap" tabindex="0">\n                <picture>\n                  <source srcset="${webpFront}" type="image/webp">\n                  <img class="front" src="${p.front}" alt="${aria} - frontal" loading="lazy" width="${p.w}" height="${p.h}">\n                </picture>\n                <picture>\n                  <source srcset="${webpBack}" type="image/webp">\n                  <img class="back" src="${p.back}" alt="${aria} - trasera" loading="lazy" width="${p.w}" height="${p.h}">\n                </picture>\n              </div>\n            </div>\n            <div class="card-body">\n              <h3>${aria}</h3>\n              <p class="price">$${String(p.price)}</p>\n            </div>\n          </a>\n        </article>\n      `;
    }).join('');

    // Re-bind hover-swap handlers
    const newSwaps = document.querySelectorAll('.hover-swap');
    newSwaps.forEach(el => {
      el.addEventListener('touchstart', () => el.classList.toggle('swap'));
      el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); el.classList.toggle('swap'); } });
    });
  }

  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;'); }

  // Fuse.js
  let fuse;
  if (window.Fuse) fuse = new Fuse(products, { keys: ['name.es', 'name.en', 'name.fr', 'category', 'color'], threshold: 0.35 });

  function applyTranslations() {
    const map = translations[locale] || translations['es'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (map[key]) el.textContent = map[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (map[key]) el.placeholder = map[key];
    });
  }

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      locale = e.target.value;
      localStorage.setItem('isru_locale', locale);
      applyTranslations();
      performSearchAndFilter();
    });
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

  if (searchInput) searchInput.addEventListener('input', debounce(performSearchAndFilter, 180));
  if (categoryFilter) categoryFilter.addEventListener('change', performSearchAndFilter);
  if (colorFilter) colorFilter.addEventListener('change', performSearchAndFilter);
  if (priceMax) priceMax.addEventListener('input', debounce(performSearchAndFilter, 180));

  // Initial setup
  applyTranslations();
  renderProducts(products);
});