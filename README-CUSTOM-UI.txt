Villa 86 glass UI v2.1 fixed

Fix in this build:
- Removed the invalid lockedOrientation:null property that caused 3DVista's parser error.
- Mobile is no longer explicitly forced to landscape by that player property.

Upload/replace these files in the test repository:
- index.htm
- custom-ui.css
- custom-ui.js
- script_general.js
- script_mobile.js

Behavior:
- Menu starts closed.
- Each floor has an expandable scene list.
- Welcome/hero overlay disappears after entering tour mode.
- Custom bottom thumbnail dock appears only after Open Virtual Tour / Continue Watching.
- Original duplicated 3DVista thumbnail UI remains hidden.
