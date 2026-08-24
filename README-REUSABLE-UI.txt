Villa 86 reusable glass UI structure

UPLOAD / REPLACE IN GITHUB:
1. index.htm
2. custom-ui.css
3. custom-ui.js
4. tour-config.js  <-- NEW

The main UI files are now reusable:
- custom-ui.css = shared design
- custom-ui.js = shared UI/behavior engine
- tour-config.js = villa-specific content, floors, scenes, thumbnails and original 3DVista control IDs

For another villa, keep custom-ui.css and custom-ui.js the same and create a different tour-config.js for that villa.

IMPORTANT:
The scene labels in tour-config.js must exactly match the labels inside that villa's 3DVista export, and the control IDs must come from that villa's own generated scripts.
