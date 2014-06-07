// ==UserScript==
// @name           Blogspot content warning auto-skip
// @namespace      http://www.martinmunich.com
// @include        *blogspot.*
// @include        *blogger.com/blogin.g?blogspotURL=*
// @description    Automatically skip Blogspot / Blogger content warning disclaimer
// @downloadURL    https://userscripts.org/scripts/source/182258.user.js 
// @updateURL      https://userscripts.org/scripts/source/182258.user.js
// @version        1.1
// ==/UserScript==

window.location.replace(document.getElementsByClassName('maia-button maia-button-primary')[0].href);
