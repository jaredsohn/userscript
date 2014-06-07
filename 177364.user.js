// ==UserScript==
// @name           Google Link Cleaner [Edited for other country]
// @description    Prevents Google from being informed about each click on a result link. Very fast + compatible with AutoPager
// @include        *www.google.com.tr/search?*
// @include        *www.google.com.tr/#psj*
// @include        *www.google.com.tr/#psj=1&q=*
// @include        *www.google*/#psj*
// @include        *www.google.com/search?*
// @include        *www.google.de/search?*
// @include        *www.google.fr/search?*
// @include        *www.google.at/search?*
// @include        *www.google.ch/search?*
// ==/UserScript==

var links = document.getElementById('res').getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
	links[i].removeAttribute("onmousedown");
}