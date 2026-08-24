Villa 86 - custom glass UI rebuilt from the ORIGINAL 3DVista export

This build does not reuse the previously patched scene/thumbnail data.
It is based on the original generated 3DVista files supplied on 24 Aug 2026.

Key fixes:
- Custom thumbnail images are read from the ORIGINAL mainPlayList at runtime.
- Thumbnail clicks select the ORIGINAL playlist index.
- Friendly labels are mapped from the ORIGINAL navigation buttons; unmapped panoramas fall back to their original media label.
- Floor dropdown scene links execute the ORIGINAL 3DVista button actions.
- Original Info / Location / Gallery / Floor Plan / Video controls are called directly.
- Original welcome labels/buttons and the blue CTA strip are hidden by exact original component IDs.
- Native 3DVista "Enable audio?" dialog is not replaced or removed; it is kept above the custom UI.
- Original 3DVista thumbnail strips/grids are hidden so there is only one thumbnail dock.
- Thumbnail dock collapse works.
- Menu stays open while a floor is expanded.
- Reef Island logo is used in the top-left glass panel.
- Separate Villa 86 title pill is not used.
- Forced landscape property was removed (not set to null) from desktop/mobile generated player variants.

Files added:
- custom-ui.css
- custom-ui.js
- tour-config.js
- reef-island-logo.png

index.htm was updated to load the custom files.
script_general.js and script_mobile.js were changed only to remove the explicit lockedOrientation:"landscape" property.
