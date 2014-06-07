// ==UserScript==
// @name           tvn24.pl without flash
// @namespace      http://userscripts.org/users/158278
// @description    Removes flash movies from news pages. Useful if you can't stand those horrid autoplaying advertisements.
// @include        http://www.tvn24.pl/*
// ==/UserScript==

(function () {
	var container = document.getElementById('player');
	while (container.hasChildNodes()) {
		container.removeChild(container.lastChild);
	}
})();
