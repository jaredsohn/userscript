// ==UserScript==
// @name           Zeit.de Auto "Auf einer Seite anzeigen"
// @description    Zeigt ZEIT-Artikel automatischauf einer Seite an.
// @include        http://www.zeit.de/*
// ==/UserScript==

(function() {
	var anchors = document.getElementsByTagName('a');
	for (var i = 0; i < anchors.length; i++) {
		if (anchors[i].innerHTML == "Auf einer Seite lesen") {
			document.location.href = anchors[i].href;
		}
	}
})();