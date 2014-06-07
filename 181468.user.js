// ==UserScript==
// @name        FixThoseShades
// @namespace   http://userscripts.org/users/516611
// @description Fixes the temporary Firefox bug on hiredark.com/worlds/shades/
// @include     http://www.hiredark.com/worlds/shades/
// @version     1
// @updateURL   https://userscripts.org/scripts/source/181468.meta.js
// @downloadURL https://userscripts.org/scripts/source/181468.user.js
// ==/UserScript==

document.getElementsByTagName("svg")[0].setAttribute("height", "100%");