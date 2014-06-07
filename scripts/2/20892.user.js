// ==UserScript==
// @name           StudiVZ Neuigkeiten, Telegramm und Schaufenster remover
// @description    Entfernt den Neuigkeiten Block bei studivz
// @include        http://www.studivz.net/*
// ==/UserScript==
//
// ChangeLog
// v0.1 first release
//
// v0.2 entfernt jetzt auch den Telegramm Block
// v0.3 entfernt jetzt auch das Schaufenster
//


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