// ==UserScript==
// @name        Auto Reload PiK.ba by Bluu StoriZ
// @version        0.0.76
// @author         Bluu StoriZ
// @updateURL      http://userscripts.org/scripts/source/187201.meta.js
// @downloadURL    http://userscripts.org/scripts/source/187201.user.js
// @include     *.pik.ba*
// ==/UserScript==

var numMinutes = 2;
window.setTimeout("document.location.reload();", numMinutes*60*1000);