// ==UserScript==
// @name        Anti Redirector para Taringa
// @namespace   Juampi_Mix
// @icon        http://k36.kn3.net/31B280760.png
// @include     http*://*taringa.net/*
// @version     1
// @grant       none
// ==/UserScript==
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("http://www.taringa.net/?go=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("") + 27));
	}
}