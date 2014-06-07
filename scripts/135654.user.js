// ==UserScript==
// @name        Yahoo groups ad pages skipper
// @namespace   http://userscripts.org/users/471458
// @description Skips Yahoo groups ad pages
// @include     http://*.groups.yahoo.com/*
// @version     1
// ==/UserScript==

// Change to your own language text
// Default is for pt-BR
text = "Continuar mensagens";

(function() {
	elements = document.getElementsByTagName("a");
	var i;
	for (i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML == text) {
			elements[i].click();
			return;
		}
	}
})();