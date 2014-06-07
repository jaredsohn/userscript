// ==UserScript==
// @name        Vatera/Teszvesz unGrando
// @namespace   tsurugi
// @description Automatikusan bekapcsolja a grando-mentes módot a találati oldalakon
// @include     http://www.vatera.hu/listings/index.php*q=*
// @include     http://*.vatera.hu*index_*q=*
// @include     http://www.teszvesz.hu/listings/index.php*q=*
// @include     http://*.teszvesz.hu*index_*q=*
// @run-at 	document-start
// @version     2
// ==/UserScript==

var location = document.location.toString();

if (location.search("lo=") == -1) {
	window.location = window.location+"&lo=on";
}