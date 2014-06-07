// ==UserScript==
// @name           Fefes Blog - CSS Stylesheet Remover
// @namespace      gotU
// @description    Entfernt eingebettete CSS-Dateien
// @include        http://blog.fefe.de/*
// @version 0.3
// ==/UserScript==

function removeApfelCSS() {
	
	var links = document.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].getAttribute('type').toLowerCase() == 'text/css' && links[i].getAttribute('href').toLowerCase().indexOf('css') >= 0) {
			links[i].parentNode.removeChild(links[i]);
		}
	}
}

window.setInterval( removeApfelCSS, 5);