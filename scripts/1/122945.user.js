// ==UserScript==
// @name           Google Link Cleaner
// @namespace      Yogu
// @description    Prevents Google from being informed about each click on a result link. Very fast + compatible with AutoPager
// @include        http://www.google.com/search?*
// @include        http://www.google.de/search?*
// @include        http://www.google.fr/search?*
// @include        http://www.google.at/search?*
// @include        http://www.google.ch/search?*
// @include        https://www.google.com/search?*
// @include        https://www.google.de/search?*
// @include        https://www.google.fr/search?*
// @include        https://www.google.at/search?*
// @include        https://www.google.ch/search?*
// ==/UserScript==

var links = document.getElementById('res').getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
	links[i].removeAttribute("onmousedown");
}