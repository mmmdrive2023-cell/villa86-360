VILLA 86 - GLASS UI TEST BUILD
==============================

Files to add/replace in your TEST/FORK repository root:

1. Replace: index.htm
2. Add:     custom-ui.css
3. Add:     custom-ui.js

Do NOT replace or delete:
- script.js
- script_general.js
- script_mobile.js
- lib/
- media/
- locale/
- skin/
- fonts/

The new UI is an overlay. It uses the existing 3DVista tour engine and calls the existing 3DVista navigation methods.

FIRST TEST CHECKLIST
--------------------
- Tour panorama loads normally.
- Original panorama hotspots still work.
- New glass navigation appears.
- Scene thumbnails switch between Street View, Courtyard, Garage, Main Entrance, Office and Indoor Courtyard.
- Floor buttons jump to representative scenes.
- Fullscreen works.
- Mobile layout is usable.

ROLLBACK
--------
Restore the old index.htm and remove custom-ui.css/custom-ui.js.
No generated 3DVista JavaScript is modified in this build.
