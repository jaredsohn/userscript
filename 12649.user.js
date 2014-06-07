// ==UserScript==
// @name Remove link in tr
// @description removes onclick and href attribute of an tr element (table row)
// @include *
// ==/UserScript==

var links = document.getElementsByTagName('tr');
for (i = 0; i < links.length; i++) {
	links[i].removeAttribute('onclick');
	links[i].removeAttribute('href');
}