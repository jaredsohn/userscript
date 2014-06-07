// ==UserScript==
// @name           Youtube scrollable related
// @namespace      -
// @description    Makes the related videos scrollable like they used to be
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// ==/UserScript==

var elms = document.getElementsByClassName("watch-module-body");
var elmslen = elms.length;

for(var i = 0; i < elmslen; i++) {
	elms[i].style.overflow = "auto";
	elms[i].style.height = "400px";
	elms[i].style.width = "315px";
}

setTimeout(function() {
	window.scrollBy(0, 1);
	window.scrollBy(0, -1);
}, 1000);

