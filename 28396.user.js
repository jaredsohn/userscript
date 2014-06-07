// ==UserScript==
// @name           Smiley remover
// @namespace      ingeo.org/gmonkey
// @include        http://spacing.ca/wire/*
// ==/UserScript==

(function() {
    var all, element, i;
	all = document.getElementsByTagName('img');
	for (i = 0; i < all.length; i++) {
		element = all[i];
		if (element.parentNode.parentNode.parentNode.parentNode.id == 'comments') {
			element.src='';
		}
	}
})();