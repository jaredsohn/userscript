// ==UserScript==
// @name          Wykop Jump to Frame
// @description   script to skip comments while brownig wykop and jump stight to frame
// @include       http://www.wykop.pl/*
// @include       http://wykop.pl/*
// ==/UserScript==

(function() {
	var opis = document.getElementsByClassName('linkdata');
	if(opis[0]) {
		var link = opis[0].getElementsByTagName("a");
		if(link[0]) {
			try {
				window.location.replace(link[0].href);
			} catch (e) {
				window.location.href = link[0].href;
			}
		}
	}
})()
