// ==UserScript==
// @name           SchuelerVz Neuigkeiten, Telegramm und Schaufenster remover by http://schuelervz-tricks.de.vu
// @description    Entfernt den Neuigkeiten Block bei studivz by http://schuelervz-tricks.de.vu
// @include        http://www.schuelervz.net/*
// ==/UserScript==

(function() {
	var node = document.getElementsByTagName("h2");
	for (var i=0; i<node.length; i++) {
		if (node[i].parentNode.innerHTML.match(/Neuigkeiten/)) {
			node[i].parentNode.parentNode.parentNode.removeChild(node[i].parentNode.parentNode);
		}
	}
	for (var i=0; i<node.length; i++) {
		if (node[i].parentNode.innerHTML.match(/Telegramm/)) {
			node[i].parentNode.parentNode.parentNode.removeChild(node[i].parentNode.parentNode);
		}
	}
	for (var i=0; i<node.length; i++) {
		if (node[i].parentNode.innerHTML.match(/Schaufenster/)) {
			node[i].parentNode.parentNode.parentNode.removeChild(node[i].parentNode.parentNode);
		}
	}
}
)();