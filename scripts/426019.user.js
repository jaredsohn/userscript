// ==UserScript==
// @name        Make proposals list in Google Melange full screen.
// @author      Tim 'mithro' Ansell <mithro@mithis.com> http://userscripts.org/users/mithro
// @license     Apache 2.0, http://www.apache.org/licenses/LICENSE-2.0.html
// @namespace   http://blog.mithis.net/
// @run-at      document-start
// @match       http://www.google-melange.com/gsoc/proposal/list/org/google/gsoc2014
// @match       https://www.google-melange.com/gsoc/proposal/list/org/google/gsoc2014
// @homepage    http://userscripts.org/scripts/show/426019
// @updateURL   https://userscripts.org/scripts/source/426019.meta.js
// @downloadURL https://userscripts.org/scripts/source/426019.user.js
// @version     0.3
// ==/UserScript==

GM_addStyle("\
#page-header { \
  display: none; \
} \
\
#menu-container { \
  display: none; \
} \
\
div.container_12 { \
  width: 100%; \
} \
div.container_12 div.grid_9 { \
  width: 100%; \
} \
\
#footer { \
  display: none; \
} \
");