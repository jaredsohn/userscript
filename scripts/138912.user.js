// ==UserScript==
// @name        removeBrowserPonies
// @namespace   Guardian
// @description Removes ponies from /meta/ :(
// @include     http://www.ponychan.net/chan/meta/
// @version     1
// ==/UserScript==
var bP = document.getElementById('browser-ponies');
bP.parentNode.removeChild(bP);