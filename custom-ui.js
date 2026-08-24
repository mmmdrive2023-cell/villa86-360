(function () {
  'use strict';

  const CFG = window.VILLA_TOUR_CONFIG;
  if (!CFG) return;

  const state = { tourActive: false, menuOpen: false, dockCollapsed: false, openFloors: new Set() };

  const icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 5-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 5 7 7-7 7"/></svg>',
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

  function root() {
    try { return window.tour && tour._getRootPlayer ? tour._getRootPlayer() : null; }
    catch (_) { return null; }
  }

  function component(id) {
    const r = root();
    if (!r || !id) return null;
    return r[id] || (typeof r.getById === 'function' ? r.getById(id) : null);
  }

  function triggerOriginal(id) {
    const r = root();
    const c = component(id);
    if (!r || !c) return false;
    try {
      const script = c.get && c.get('click');
      if (script) { Function(script).call(r); return true; }
      if (typeof c.trigger === 'function') { c.trigger('click'); return true; }
    } catch (err) { console.warn('[Villa86 UI] original action failed', id, err); }
    return false;
  }

  function setVisible(id, visible) {
    const c = component(id);
    if (!c || typeof c.set !== 'function') return;
    try { c.set('visible', visible); } catch (_) {}
  }

  function hideLegacy() {
    const r = root();
    if (!r) return;
    (CFG.legacy.welcomeIds || []).forEach(id => setVisible(id, false));
    try { (r.getByClassName('ThumbnailList') || []).forEach(c => c.set('visible', false)); } catch (_) {}
    try { (r.getByClassName('ThumbnailGrid') || []).forEach(c => c.set('visible', false)); } catch (_) {}
    try {
      (r.getByClassName('Container') || []).forEach(c => {
        const d = c.get && c.get('data');
        if (d && CFG.legacy.containerNames.includes(d.name)) c.set('visible', false);
      });
    } catch (_) {}
  }

  function friendlyLabels() {
    const map = new Map();
    CFG.floors.forEach(f => f.scenes.forEach(s => { if (!map.has(s.index)) map.set(s.index, s.label); }));
    return map;
  }

  function playlistScenes() {
    const r = root();
    if (!r || !r.mainPlayList) return [];
    const items = r.mainPlayList.get('items') || [];
    const friendly = friendlyLabels();
    const out = [];
    items.forEach((item, index) => {
      try {
        const media = item.get('media');
        const camera = item.get('camera');
        if (!media || !camera) return; // Panorama items only.
        const thumb = media.get('thumbnailUrl');
        if (!thumb) return;
        const data = media.get('data') || {};
        const raw = data.label || media.get('label') || ('Scene ' + index);
        out.push({ index, label: friendly.get(index) || String(raw), thumb });
      } catch (_) {}
    });
    return out;
  }

  function selectIndex(index) {
    const r = root();
    if (!r || !r.mainPlayList) return;
    state.tourActive = true;
    applyState();
    try {
      if (typeof r.setPlayListSelectedIndex === 'function') r.setPlayListSelectedIndex(r.mainPlayList, Number(index));
      else r.mainPlayList.set('selectedIndex', Number(index));
    } catch (err) { console.warn('[Villa86 UI] playlist selection failed', index, err); }
    setTimeout(hideLegacy, 50);
  }

  function floorMarkup() {
    return CFG.floors.map(floor => {
      const scenes = floor.scenes.map(s => '<button class="v86-subitem" data-button-id="' + s.buttonId + '" data-index="' + s.index + '">' + s.label + '</button>').join('');
      return '<div class="v86-floor" data-floor="' + floor.name + '">' +
        '<button class="v86-floor-trigger"><span class="v86-floor-icon">' + icons[floor.icon] + '</span><span>' + floor.name + '</span><span class="v86-floor-caret">' + icons.down + '</span></button>' +
        '<div class="v86-floor-list">' + scenes + '</div></div>';
    }).join('');
  }

  function renderBase() {
    const viewer = document.getElementById('viewer');
    if (!viewer) return null;
    let host = document.getElementById('villa86-ui');
    if (!host) {
      host = document.createElement('div');
      host.id = 'villa86-ui';
      viewer.appendChild(host); // Same stacking context as native 3DVista message window.
    }
    host.innerHTML =
      '<div class="v86-brand v86-glass"><img src="reef-island-logo.png" alt="Reef Island"></div>' +
      '<div class="v86-actions v86-glass">' +
        '<button class="v86-icon-btn" id="v86-menu">' + icons.menu + '</button>' +
        '<button class="v86-icon-btn" data-original="' + CFG.controls.info + '">' + icons.info + '</button>' +
        '<button class="v86-icon-btn" data-original="' + CFG.controls.location + '">' + icons.pin + '</button>' +
        '<button class="v86-icon-btn" data-original="' + CFG.controls.gallery + '">' + icons.gallery + '</button>' +
        '<button class="v86-icon-btn" data-original="' + CFG.controls.floorPlan + '">' + icons.plan + '</button>' +
        '<button class="v86-icon-btn" data-original="' + CFG.controls.video + '">' + icons.video + '</button>' +
      '</div>' +
      '<nav class="v86-menu-panel v86-glass" id="v86-menu-panel">' + floorMarkup() + '</nav>' +
      '<section class="v86-hero">' +
        '<h1>WELCOME</h1><div class="v86-eyebrow"><span></span><b>' + CFG.hero.eyebrow + '</b><span></span></div>' +
        '<h2>' + CFG.hero.title + '</h2>' +
        '<div class="v86-hero-actions"><button class="v86-cta v86-dark" id="v86-continue">' + icons.play + '<span>CONTINUE WATCHING</span></button>' +
        '<button class="v86-cta v86-gold" id="v86-open">' + icons.cube + '<span>OPEN VIRTUAL TOUR</span></button></div>' +
      '</section>' +
      '<button class="v86-edge v86-prev">' + icons.left + '</button><button class="v86-edge v86-next">' + icons.right + '</button>' +
      '<div class="v86-dock v86-glass"><button class="v86-dock-toggle"><span>Scenes</span><span>' + icons.down + '</span></button>' +
      '<div class="v86-dock-row"><button class="v86-dock-nav v86-dock-prev">' + icons.left + '</button><div class="v86-thumbs-wrap"><div class="v86-thumbs"></div></div><button class="v86-dock-nav v86-dock-next">' + icons.right + '</button></div></div>';
    bindBase();
    return host;
  }

  function buildDock() {
    const list = document.querySelector('.v86-thumbs');
    if (!list) return;
    const scenes = playlistScenes();
    list.innerHTML = scenes.map(s => '<button class="v86-thumb" data-index="' + s.index + '"><img src="' + s.thumb + '" alt=""><span>' + escapeHtml(s.label) + '</span></button>').join('');
    list.querySelectorAll('.v86-thumb').forEach(btn => btn.addEventListener('click', () => selectIndex(btn.dataset.index)));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function bindBase() {
    document.getElementById('v86-menu').addEventListener('click', e => { e.stopPropagation(); state.menuOpen = !state.menuOpen; applyState(); });
    document.getElementById('v86-menu-panel').addEventListener('click', e => e.stopPropagation());
    document.querySelectorAll('.v86-floor-trigger').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      const floor = btn.closest('.v86-floor');
      floor.classList.toggle('is-open'); // Never closes the whole menu.
    }));
    document.querySelectorAll('.v86-subitem').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation(); state.tourActive = true; applyState();
      if (!triggerOriginal(btn.dataset.buttonId)) selectIndex(btn.dataset.index);
      setTimeout(hideLegacy, 40);
    }));
    document.querySelectorAll('[data-original]').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); triggerOriginal(btn.dataset.original); }));
    document.getElementById('v86-open').addEventListener('click', () => { state.tourActive = true; applyState(); triggerOriginal(CFG.controls.openTour); setTimeout(hideLegacy, 40); });
    document.getElementById('v86-continue').addEventListener('click', () => { state.tourActive = true; applyState(); triggerOriginal(CFG.controls.continueWatching); setTimeout(hideLegacy, 40); });
    document.querySelector('.v86-dock-toggle').addEventListener('click', () => { state.dockCollapsed = !state.dockCollapsed; applyState(); });
    document.querySelector('.v86-dock-prev').addEventListener('click', () => scrollDock(-1));
    document.querySelector('.v86-dock-next').addEventListener('click', () => scrollDock(1));
    document.querySelector('.v86-prev').addEventListener('click', () => step(-1));
    document.querySelector('.v86-next').addEventListener('click', () => step(1));
    document.addEventListener('click', e => { if (state.menuOpen && !e.target.closest('#v86-menu-panel') && !e.target.closest('#v86-menu')) { state.menuOpen = false; applyState(); } });
  }

  function scrollDock(dir) {
    const wrap = document.querySelector('.v86-thumbs-wrap');
    if (wrap) wrap.scrollBy({ left: dir * Math.max(300, wrap.clientWidth * .65), behavior: 'smooth' });
  }

  function step(dir) {
    const r = root();
    const scenes = playlistScenes();
    if (!r || !r.mainPlayList || !scenes.length) return;
    const current = r.mainPlayList.get('selectedIndex');
    let pos = scenes.findIndex(s => s.index === current);
    if (pos < 0) pos = 0;
    pos = (pos + dir + scenes.length) % scenes.length;
    selectIndex(scenes[pos].index);
  }

  function applyState() {
    const host = document.getElementById('villa86-ui');
    if (!host) return;
    host.classList.toggle('is-tour-active', state.tourActive);
    host.classList.toggle('is-menu-open', state.menuOpen);
    host.classList.toggle('is-dock-collapsed', state.dockCollapsed);
  }

  function liftAudioPrompt() {
    const viewer = document.getElementById('viewer');
    if (!viewer) return;
    viewer.querySelectorAll('div,span').forEach(el => {
      if ((el.textContent || '').trim() !== 'Enable audio?') return;
      let node = el;
      for (let i = 0; i < 5 && node.parentElement && node.parentElement !== viewer; i++) {
        const parent = node.parentElement;
        const rect = parent.getBoundingClientRect();
        if (rect.width > 120 && rect.width < window.innerWidth * .95 && rect.height > 50 && rect.height < window.innerHeight * .95) node = parent;
      }
      node.classList.add('v86-audio-top');
    });
  }

  function sync() {
    const r = root();
    if (!r || !r.mainPlayList) return;
    hideLegacy();
    liftAudioPrompt();
    const selected = r.mainPlayList.get('selectedIndex');
    document.querySelectorAll('.v86-thumb').forEach(t => t.classList.toggle('is-active', Number(t.dataset.index) === selected));
  }

  function boot() {
    if (!root()) { setTimeout(boot, 200); return; }
    hideLegacy();
    renderBase();
    buildDock();
    sync();
    setInterval(sync, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
