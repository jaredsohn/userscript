// ==UserScript==
// @name           googleNoRedirect
// @namespace      com.koalawang.google
// @include        /^https?:\/\/www.google.com(?:\.hk)?\/.*/
// ==/UserScript==
var items = document.querySelectorAll('h3.r a.l');
for (var i = 0, len = items.length, item; i < len; i++) {
	items[i].onmousedown = null;
}