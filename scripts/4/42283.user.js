// ==UserScript==
// @name           GOOD No Refresh
// @namespace     http://iangreenleaf.com
// @description   Good magazine is great, but those ads refreshing my page aren't so great
// @include        http://*.good.is/*
// ==/UserScript==

(function() {

	var divs = document.getElementsByTagName('div');
	for (i = 0; i < divs.length; i++) {
		if (divs[i].className.indexOf('adbox') != -1) {
			divs[i].parentNode.removeChild(divs[i]);
		}
	}

 })();
