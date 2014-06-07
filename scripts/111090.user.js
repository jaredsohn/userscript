// ==UserScript==
// @name           rivva.de direkt laden
// @namespace      http://steffenbanhardt.de/
// @description    Links bei rivva.de direkt laden
// @include        http://rivva.de/*
// @exclude        http://rivva.de/
// ==/UserScript==
//

(function() {
	var header = document.getElementsByTagName('header');
	for (var i = 0; i < header.length; i++) {
	    if (header[i].className != "golden_a") {
		var anchor = header[i].getElementsByTagName('a');
		for (var i=0; i < anchor.length; i++) {
		    document.location.href = anchor[i].href;
		}
	    }
	}
})();
