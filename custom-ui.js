(function () {
  'use strict';

  const SCENES = [
    { label: 'Street View', thumb: 'media/panorama_C5B46187_E4D6_7756_41A8_ADAE2F634B23_t.webp', floor: 'Ground Floor' },
    { label: 'Courtyard', thumb: 'media/panorama_C5B72E79_E4D6_ADBA_41E7_482E8EC5D6FB_t.webp', floor: 'Ground Floor' },
    { label: 'Garage', thumb: 'media/panorama_C5B918A3_E4D6_D54E_41E4_824CD537D306_t.jpg', floor: 'Ground Floor' },
    { label: 'Main Entrance', thumb: 'media/panorama_83C79BFD_74F6_DBE8_41C7_D9D822F442E0_t.jpg', floor: 'Ground Floor' },
    { label: 'Office', thumb: 'media/panorama_C5BDCD0D_E4DF_AF5A_41E1_EE4F0338C8C6_t.jpg', floor: 'Ground Floor' },
    { label: 'Indoor Courtyard', thumb: 'media/panorama_C5B97B96_E4D6_AB76_41EC_73B7344A9B4F_t.webp', floor: 'Ground Floor' }
  ];

  const FLOOR_TARGETS = {
    'Ground Floor': 'Street View',
    'First Floor': 'Master Bedroom',
    'Second Floor': 'Second Floor Elevator',
    'Roof Top Floor': 'Terrace RF',
    'Terraces': 'Terrace GF',
    'Rooms': 'Bedroom 01'
  };

  const HIDE_CONTAINER_NAMES = new Set([
    '--MENU',
    '- COLLAPSE',
    '- EXPANDED',
    '- Buttons set',
    '-Container Icons 1',
    '-Container Icons 2',
    '-Container footer',
    '-- SETTINGS',
    'button menu sup',
    '-button set',
    '-button set container',
    '-Level 1',
    '-Level 2-1',
    '-Level 2-2',
    '-Level 2-3',
    '-Level 2-4',
    '-Level 2-5',
    '-Level 2-6',
    '-Level 2-7'
  ]);

  const icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 5-7 7 7 7"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 5 7 7-7 7"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 21V8l7-4 7 4v13M3 21h18M9 10h2m2 0h2M9 14h2m2 0h2M9 18h2m2 0h2"/></svg>',
    terrace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h16M6 16h12M8 12h8M10 8h4M12 3v5"/></svg>',
    rooms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 21V5h7v16M13 21V9h7v12M7 9h1m-1 4h1m8 0h1m-1 4h1M2 21h20"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };

  function getRoot() {
    try {
      return window.tour && tour._getRootPlayer ? tour._getRootPlayer() : null;
    } catch (e) {
      return null;
    }
  }

  function getActiveLabel() {
    try {
      const root = getRoot();
      if (!root) return null;
      const media = root.getActiveMediaWithViewer(root.getMainViewer());
      if (!media) return null;
      const data = media.get('data');
      return (data && data.label) || media.get('label') || null;
    } catch (e) {
      return null;
    }
  }

  function goTo(label) {
    const root = getRoot();
    if (!root || !label) return;
    try {
      root.setMainMediaByName(label);
    } catch (e) {
      console.warn('[Villa86 UI] Unable to navigate to', label, e);
    }
  }

  function hideLegacyUI() {
    const root = getRoot();
    if (!root) return;
    try {
      const thumbnails = root.getByClassName('ThumbnailList') || [];
      thumbnails.forEach(c => c.set('visible', false));

      const containers = root.getByClassName('Container') || [];
      containers.forEach(c => {
        const data = c.get('data');
        const name = data && data.name;
        if (name && HIDE_CONTAINER_NAMES.has(name)) c.set('visible', false);
      });
    } catch (e) {
      console.warn('[Villa86 UI] Legacy UI cleanup skipped:', e);
    }
  }

  function sailMark() {
    return '<svg class="v86-brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
      '<path d="M31 8v37" stroke="white" stroke-width="2" opacity=".9"/>' +
      '<path d="M29 11C21 17 17 26 16 37h13V11Z" fill="white" fill-opacity=".92"/>' +
      '<path d="M34 17c8 5 13 12 16 22H34V17Z" fill="white" fill-opacity=".64"/>' +
      '<path d="M10 46c13 6 29 6 44 0M17 51c10 4 20 4 30 0" stroke="white" stroke-width="2" stroke-linecap="round" opacity=".8"/>' +
      '</svg>';
  }

  function render() {
    const host = document.getElementById('villa86-ui');
    if (!host) return;

    const navItems = [
      ['Ground Floor', icons.home],
      ['First Floor', icons.building],
      ['Second Floor', icons.building],
      ['Roof Top Floor', icons.terrace],
      ['Terraces', icons.terrace],
      ['Rooms', icons.rooms]
    ].map(([name, icon], i) =>
      '<button class="v86-nav-btn' + (i === 0 ? ' is-active' : '') + '" data-floor="' + name + '">' + icon + '<span>' + name + '</span></button>'
    ).join('');

    const thumbs = SCENES.map((s, i) =>
      '<button class="v86-thumb' + (i === 0 ? ' is-active' : '') + '" data-scene="' + s.label + '">' +
        '<img class="v86-thumb-image" src="' + s.thumb + '" alt="">' +
        '<span class="v86-thumb-label">' + s.label + '</span>' +
      '</button>'
    ).join('');

    host.innerHTML =
      '<div class="v86-brand v86-glass">' + sailMark() + '<div><div class="v86-brand-name">REEF ISLAND</div><div class="v86-brand-tag">Redefining Excellence</div></div></div>' +
      '<div class="v86-title v86-glass"><strong>VILLA 86</strong><span>Interactive Virtual Tour</span></div>' +
      '<div class="v86-actions v86-glass">' +
        '<button class="v86-icon-btn" id="v86-menu" aria-label="Toggle navigation">' + icons.menu + '</button>' +
        '<button class="v86-icon-btn" id="v86-fullscreen" aria-label="Fullscreen">' + icons.fullscreen + '</button>' +
        '<button class="v86-icon-btn" id="v86-info" aria-label="Information">' + icons.info + '</button>' +
        '<button class="v86-icon-btn" id="v86-share" aria-label="Share">' + icons.share + '</button>' +
      '</div>' +
      '<nav class="v86-nav v86-glass" id="v86-nav">' + navItems + '</nav>' +
      '<button class="v86-edge v86-edge-prev" id="v86-prev" aria-label="Previous scene">' + icons.chevronLeft + '</button>' +
      '<button class="v86-edge v86-edge-next" id="v86-next" aria-label="Next scene">' + icons.chevronRight + '</button>' +
      '<div class="v86-location v86-glass">' + icons.pin + '<span id="v86-location-text">Ground Floor · Street View</span><span class="v86-live-dot"></span></div>' +
      '<div class="v86-dock v86-glass"><div class="v86-thumbs">' + thumbs + '</div></div>' +
      '<aside class="v86-info v86-glass" id="v86-info-panel"><button class="v86-close" id="v86-info-close" aria-label="Close">×</button><h2>Villa 86</h2><p>Explore the property through an immersive 360° tour. Use the floor menu or scene dock to move between key spaces while the original 3DVista hotspots remain active.</p></aside>';

    wireEvents();
  }

  function wireEvents() {
    const nav = document.getElementById('v86-nav');
    const info = document.getElementById('v86-info-panel');

    document.getElementById('v86-menu').addEventListener('click', () => nav.classList.toggle('is-collapsed'));
    document.getElementById('v86-info').addEventListener('click', () => info.classList.toggle('is-open'));
    document.getElementById('v86-info-close').addEventListener('click', () => info.classList.remove('is-open'));

    document.getElementById('v86-fullscreen').addEventListener('click', async () => {
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
      } catch (e) { console.warn('[Villa86 UI] Fullscreen unavailable', e); }
    });

    document.getElementById('v86-share').addEventListener('click', async () => {
      const payload = { title: 'Villa 86', text: 'Villa 86 interactive virtual tour', url: location.href };
      try {
        if (navigator.share) await navigator.share(payload);
        else if (navigator.clipboard) {
          await navigator.clipboard.writeText(location.href);
          const btn = document.getElementById('v86-share');
          btn.style.background = 'rgba(159,231,255,.22)';
          setTimeout(() => { btn.style.background = ''; }, 900);
        }
      } catch (e) { /* user cancelled or unavailable */ }
    });

    document.querySelectorAll('.v86-thumb').forEach(btn => {
      btn.addEventListener('click', () => goTo(btn.dataset.scene));
    });

    document.querySelectorAll('.v86-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.v86-nav-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        goTo(FLOOR_TARGETS[btn.dataset.floor]);
        if (window.innerWidth <= 760) nav.classList.add('is-collapsed');
      });
    });

    document.getElementById('v86-prev').addEventListener('click', () => stepScene(-1));
    document.getElementById('v86-next').addEventListener('click', () => stepScene(1));
  }

  function stepScene(direction) {
    const current = getActiveLabel();
    let idx = SCENES.findIndex(s => s.label === current);
    if (idx < 0) idx = 0;
    idx = (idx + direction + SCENES.length) % SCENES.length;
    goTo(SCENES[idx].label);
  }

  function syncUI() {
    const label = getActiveLabel();
    if (!label) return;

    document.querySelectorAll('.v86-thumb').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.scene === label);
    });

    const scene = SCENES.find(s => s.label === label);
    const location = document.getElementById('v86-location-text');
    if (location) location.textContent = (scene ? scene.floor : 'Villa 86') + ' · ' + label;
  }

  function waitForTour() {
    if (!getRoot()) {
      setTimeout(waitForTour, 250);
      return;
    }
    hideLegacyUI();
    syncUI();
    setInterval(syncUI, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { render(); waitForTour(); });
  } else {
    render();
    waitForTour();
  }

  window.addEventListener('message', function (event) {
    if (event.data === 'tourInitialized' || event.data === 'tourLoaded') {
      setTimeout(function () { hideLegacyUI(); syncUI(); }, 80);
    }
  });
})();
