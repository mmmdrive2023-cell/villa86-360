(function () {
  'use strict';

  const CONFIG = window.VILLA_TOUR_CONFIG || {};
  const FLOORS = Array.isArray(CONFIG.floors) ? CONFIG.floors : [];
  const SCENES = FLOORS.flatMap(floor => (floor.scenes || []).map(scene => ({
    label: scene.label,
    thumb: scene.thumb,
    floor: floor.name
  })));
  const UNIQUE_SCENES = SCENES.filter((scene, index, all) => all.findIndex(item => item.label === scene.label) === index);
  const CONTROL_IDS = CONFIG.controls || {};
  const LEGACY_HIDE_IDS = (CONFIG.legacy && Array.isArray(CONFIG.legacy.hideIds)) ? CONFIG.legacy.hideIds : [];
  const DEFAULT_SCENE = CONFIG.defaultScene || (UNIQUE_SCENES[0] && UNIQUE_SCENES[0].label) || null;

  const HIDE_CONTAINER_NAMES = new Set([
    '--MENU', '- COLLAPSE', '- EXPANDED', '- Buttons set', '-Container Icons 1', '-Container Icons 2',
    '-Container footer', '-- SETTINGS', 'button menu sup', '-button set', '-button set container',
    '-Level 1', '-Level 2-1', '-Level 2-2', '-Level 2-3', '-Level 2-4', '-Level 2-5', '-Level 2-6', '-Level 2-7'
  ]);

  const LEGACY_TEXT_FRAGMENTS = [
    'WELCOME', 'GERANIUM', 'LAGOON BEACH', 'CONTINUE WATCHING', 'OPEN VIRTUAL TOUR', 'INTERACTIVE VIRTUAL TOUR'
  ];

  const state = {
    tourActive: false,
    menuOpen: false,
    dockCollapsed: false,
    openFloors: new Set(FLOORS.length ? [FLOORS[0].name] : [])
  };

  const icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 5-7 7 7 7"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 5 7 7-7 7"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 21V8l7-4 7 4v13M3 21h18M9 10h2m2 0h2M9 14h2m2 0h2M9 18h2m2 0h2"/></svg>',
    terrace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h16M6 16h12M8 12h8M10 8h4M12 3v5"/></svg>',
    rooms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 21V5h7v16M13 21V9h7v12M7 9h1m-1 4h1m8 0h1m-1 4h1M2 21h20"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    gallery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m8 13 2.5-2.5L14 14l2-2 3 3"/><circle cx="8" cy="9" r="1.2"/></svg>',
    plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 20h18M5 20V6h7v14M12 14h7V4H8v2"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M17 10l4-2v8l-4-2"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="M12 3v18M4 7.5 12 12l8-4.5"/></svg>'
  };

  function getRoot() {
    try { return window.tour && tour._getRootPlayer ? tour._getRootPlayer() : null; }
    catch (e) { return null; }
  }

  function getActiveLabel() {
    try {
      const root = getRoot();
      if (!root) return null;
      const media = root.getActiveMediaWithViewer(root.getMainViewer());
      if (!media) return null;
      const data = media.get('data');
      return (data && data.label) || media.get('label') || null;
    } catch (e) { return null; }
  }

  function goTo(label) {
    const root = getRoot();
    if (!root || !label) return;
    try {
      root.setMainMediaByName(label);
      state.tourActive = true;
      applyState();
    } catch (e) {
      console.warn('[Villa UI] Unable to navigate to', label, e);
    }
  }

  function componentText(component) {
    try {
      const label = component.get && component.get('label');
      const text = component.get && component.get('text');
      return String([label || '', text || ''].join(' ')).toUpperCase();
    } catch (e) { return ''; }
  }

  function hideLegacyUI() {
    const root = getRoot();
    if (!root) return;
    try {
      if (typeof root.set === 'function') {
        try { root.set('watermark', false); } catch (e) {}
        try { root.set('academicWatermark', false); } catch (e) {}
      }
      LEGACY_HIDE_IDS.forEach(id => {
        try {
          const component = root[id] || (typeof root.getById === 'function' ? root.getById(id) : null);
          if (component && typeof component.set === 'function') component.set('visible', false);
        } catch (e) {}
      });
      (root.getByClassName('ThumbnailList') || []).forEach(c => { try { c.set('visible', false); } catch (e) {} });
      ['Container', 'Label', 'Button', 'Image', 'IconButton'].forEach(className => {
        (root.getByClassName(className) || []).forEach(component => {
          try {
            const data = component.get && component.get('data');
            const name = data && data.name;
            const text = componentText(component);
            const shouldHideByText = LEGACY_TEXT_FRAGMENTS.some(fragment => text.includes(fragment));
            if ((name && HIDE_CONTAINER_NAMES.has(name)) || shouldHideByText) component.set('visible', false);
          } catch (e) {}
        });
      });
    } catch (e) {}
  }

  function scrubWatermarkDOM() {
    document.querySelectorAll('div, span').forEach(el => {
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (/Created by:?\s*3dvista Academic/i.test(text) || /^3dvista Academic$/i.test(text)) {
        const target = el.closest('div') || el;
        target.style.display = 'none';
      }
    });
  }

  function raiseNativeAudioPrompt() {
    const root = getRoot();
    if (!root || typeof root.getByClassName !== 'function') return;
    try {
      const windows = root.getByClassName('UserInteractionWindow') || [];
      windows.forEach(win => {
        try {
          const visible = typeof win.get === 'function' ? win.get('visible') : true;
          if (!visible) return;

          // 3DVista renders the audio permission prompt inside this native window.
          // Move the actual native window DOM above our custom UI without touching the welcome screen.
          const view = typeof win.wa === 'function' ? win.wa() : null;
          const node = view && typeof view.cc === 'function' ? view.cc() : null;
          if (!node) return;

          if (node.parentElement !== document.body) {
            document.body.appendChild(node);
          }
          node.style.setProperty('position', 'fixed', 'important');
          node.style.setProperty('inset', '0', 'important');
          node.style.setProperty('width', '100vw', 'important');
          node.style.setProperty('height', '100vh', 'important');
          node.style.setProperty('z-index', '2147483647', 'important');
          node.style.setProperty('pointer-events', 'auto', 'important');
        } catch (e) {}
      });
    } catch (e) {}
  }

  function triggerOriginal(id) {
    const root = getRoot();
    if (!root || !id) return false;
    try {
      const component = root[id] || (typeof root.getById === 'function' ? root.getById(id) : null);
      if (!component) return false;
      if (typeof component.trigger === 'function') { component.trigger('click'); return true; }
      if (typeof component.click === 'function') { component.click(); return true; }
      const clickScript = component.get && component.get('click');
      if (clickScript) { Function(clickScript).call(root); return true; }
    } catch (e) { console.warn('[Villa UI] Failed original action', id, e); }
    return false;
  }

  function brandLogoMarkup() {
    return '<div class="v86-logo-mark">' + (CONFIG.title || 'VILLA') + '</div>' +
      '<div class="v86-logo-sub">' + (CONFIG.subtitle || 'Interactive Virtual Tour') + '</div>';
  }

  function floorMarkup() {
    return FLOORS.map(group => {
      const isOpen = state.openFloors.has(group.name);
      const icon = icons[group.icon] || icons.building;
      const subitems = (group.scenes || []).map(scene =>
        '<button class="v86-subitem" data-scene="' + scene.label + '" data-floor="' + group.name + '">' + scene.label + '</button>'
      ).join('');
      return '<div class="v86-floor' + (isOpen ? ' is-open' : '') + '" data-floor-wrap="' + group.name + '">' +
        '<button class="v86-floor-trigger" data-floor-toggle="' + group.name + '">' +
          '<span class="v86-floor-icon">' + icon + '</span>' +
          '<span class="v86-floor-label">' + group.name + '</span>' +
          '<span class="v86-floor-caret">' + icons.chevronDown + '</span>' +
        '</button>' +
        '<div class="v86-floor-list">' + subitems + '</div>' +
      '</div>';
    }).join('');
  }

  function thumbMarkup() {
    return UNIQUE_SCENES.map(scene =>
      '<button class="v86-thumb" data-scene="' + scene.label + '">' +
        '<img class="v86-thumb-image" src="' + scene.thumb + '" alt="' + scene.label + '">' +
        '<span class="v86-thumb-label">' + scene.label + '</span>' +
      '</button>'
    ).join('');
  }

  function render() {
    const hero = CONFIG.hero || {};
    const host = document.getElementById('villa86-ui');
    if (!host) return;
    host.innerHTML =
      '<div class="v86-brand v86-glass">' + brandLogoMarkup() + '</div>' +
      '<div class="v86-actions v86-glass">' +
        '<button class="v86-icon-btn" id="v86-menu" aria-label="Toggle navigation">' + icons.menu + '</button>' +
        '<button class="v86-icon-btn" id="v86-info" aria-label="Information">' + icons.info + '</button>' +
        '<button class="v86-icon-btn" id="v86-pin" aria-label="Location">' + icons.pin + '</button>' +
        '<button class="v86-icon-btn" id="v86-gallery" aria-label="Gallery">' + icons.gallery + '</button>' +
        '<button class="v86-icon-btn" id="v86-plan" aria-label="Floor plan">' + icons.plan + '</button>' +
        '<button class="v86-icon-btn" id="v86-video" aria-label="Video">' + icons.video + '</button>' +
      '</div>' +
      '<nav class="v86-menu-panel v86-glass" id="v86-menu-panel">' + floorMarkup() + '</nav>' +
      '<section class="v86-hero" id="v86-hero"><div class="v86-hero-inner">' +
        '<h1 class="v86-welcome">' + (hero.welcome || 'WELCOME') + '</h1>' +
        '<div class="v86-hero-line"><span></span><strong>' + (hero.collection || '') + '</strong><span></span></div>' +
        '<h2 class="v86-villa-name">' + (hero.name || CONFIG.title || '') + '</h2>' +
        '<div class="v86-hero-actions">' +
          '<button class="v86-cta v86-cta-dark" id="v86-continue">' + icons.play + '<span>' + (hero.continueLabel || 'CONTINUE WATCHING') + '</span></button>' +
          '<button class="v86-cta v86-cta-gold" id="v86-open-tour">' + icons.cube + '<span>' + (hero.openLabel || 'OPEN VIRTUAL TOUR') + '</span></button>' +
        '</div></div></section>' +
      '<button class="v86-edge v86-edge-prev" id="v86-prev" aria-label="Previous scene">' + icons.chevronLeft + '</button>' +
      '<button class="v86-edge v86-edge-next" id="v86-next" aria-label="Next scene">' + icons.chevronRight + '</button>' +
      '<div class="v86-dock v86-glass" id="v86-dock">' +
        '<button class="v86-dock-caption" id="v86-dock-toggle"><span>Scenes</span><span class="v86-dock-caret">' + icons.chevronDown + '</span></button>' +
        '<div class="v86-dock-row"><button class="v86-dock-nav" id="v86-dock-prev">' + icons.chevronLeft + '</button>' +
        '<div class="v86-thumbs-wrap"><div class="v86-thumbs">' + thumbMarkup() + '</div></div>' +
        '<button class="v86-dock-nav" id="v86-dock-next">' + icons.chevronRight + '</button></div>' +
      '</div>';
    wireEvents();
    applyState();
  }

  function setFloorExpanded(floor, expanded) {
    const wrap = document.querySelector('[data-floor-wrap="' + CSS.escape(floor) + '"]');
    if (wrap) wrap.classList.toggle('is-open', expanded);
  }

  function bindOriginalAction(domId, originalId) {
    const el = document.getElementById(domId);
    if (!el || !originalId) return;
    el.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      triggerOriginal(originalId);
    });
  }

  function wireEvents() {
    const menuButton = document.getElementById('v86-menu');
    const menuPanel = document.getElementById('v86-menu-panel');
    menuButton.addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation();
      state.menuOpen = !state.menuOpen; applyState();
    });
    menuPanel.addEventListener('click', event => event.stopPropagation());

    document.querySelectorAll('[data-floor-toggle]').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault(); event.stopPropagation();
        const floor = btn.dataset.floorToggle;
        const expanded = !state.openFloors.has(floor);
        if (expanded) state.openFloors.add(floor); else state.openFloors.delete(floor);
        setFloorExpanded(floor, expanded);
      });
    });

    document.querySelectorAll('.v86-subitem').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault(); event.stopPropagation();
        activateTour(btn.dataset.scene);
        if (window.innerWidth <= 900) { state.menuOpen = false; applyState(); }
      });
    });

    document.getElementById('v86-open-tour').addEventListener('click', () => activateTour(DEFAULT_SCENE));
    document.getElementById('v86-continue').addEventListener('click', () => activateTour(getActiveLabel() || DEFAULT_SCENE));

    bindOriginalAction('v86-info', CONTROL_IDS.info);
    bindOriginalAction('v86-pin', CONTROL_IDS.location);
    bindOriginalAction('v86-gallery', CONTROL_IDS.gallery);
    bindOriginalAction('v86-plan', CONTROL_IDS.floorPlan);
    bindOriginalAction('v86-video', CONTROL_IDS.video);

    document.querySelectorAll('.v86-thumb').forEach(btn => btn.addEventListener('click', () => goTo(btn.dataset.scene)));
    document.getElementById('v86-prev').addEventListener('click', () => stepScene(-1));
    document.getElementById('v86-next').addEventListener('click', () => stepScene(1));
    document.getElementById('v86-dock-prev').addEventListener('click', () => scrollThumbs(-1));
    document.getElementById('v86-dock-next').addEventListener('click', () => scrollThumbs(1));
    document.getElementById('v86-dock-toggle').addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation();
      state.dockCollapsed = !state.dockCollapsed; applyState();
    });

    document.addEventListener('click', event => {
      if (!state.menuOpen) return;
      if (event.target.closest('#v86-menu-panel') || event.target.closest('#v86-menu')) return;
      state.menuOpen = false; applyState();
    });
  }

  function activateTour(scene) {
    state.tourActive = true; applyState(); hideLegacyUI(); if (scene) goTo(scene);
  }

  function applyState() {
    const host = document.getElementById('villa86-ui');
    if (!host) return;
    host.classList.toggle('is-tour-active', state.tourActive);
    host.classList.toggle('is-menu-open', state.menuOpen);
    host.classList.toggle('is-dock-collapsed', state.dockCollapsed);
  }

  function scrollThumbs(direction) {
    const wrap = document.querySelector('.v86-thumbs-wrap');
    if (wrap) wrap.scrollBy({ left: direction * Math.max(260, wrap.clientWidth * 0.55), behavior: 'smooth' });
  }

  function stepScene(direction) {
    if (!UNIQUE_SCENES.length) return;
    const current = getActiveLabel();
    let idx = UNIQUE_SCENES.findIndex(s => s.label === current);
    if (idx < 0) idx = 0;
    idx = (idx + direction + UNIQUE_SCENES.length) % UNIQUE_SCENES.length;
    activateTour(UNIQUE_SCENES[idx].label);
  }

  function syncUI() {
    const label = getActiveLabel();
    if (label) {
      document.querySelectorAll('.v86-thumb').forEach(btn => btn.classList.toggle('is-active', btn.dataset.scene === label));
      document.querySelectorAll('.v86-subitem').forEach(btn => btn.classList.toggle('is-active', btn.dataset.scene === label));
    }
    hideLegacyUI();
    scrubWatermarkDOM();
    raiseNativeAudioPrompt();
  }

  function boot() {
    render();
    setTimeout(syncUI, 600);
    setTimeout(syncUI, 1500);
    setInterval(syncUI, 1800);
    setInterval(scrubWatermarkDOM, 1200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
