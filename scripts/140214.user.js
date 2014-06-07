// ==UserScript==
// @name Cookies leecher
// @namespace http://userscripts.org/users/471458
// @author pegasusph
// @description Leeches rapigator.net input elements containing cookies from coder143.com
// @include http://www.coder143.com/*
// @version 1
// ==/UserScript==

(function() {
	var elements = document.getElementsByTagName("input");
	var placeholder = document.getElementsByClassName("header-outer")[0];

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].value.match(/^1\.0.*/)) {
			var p = document.createElement('p');
			var cookie = document.createTextNode(decodeURIComponent(elements[i].value));
			p.appendChild(cookie);
			placeholder.appendChild(p);
		}
	}
})();