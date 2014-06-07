// ==UserScript==
// @name           Mobile9 instant leecher
// @namespace      http://www.kbstyle.net/program/greasemonkey/index.html
// @description    This user script starts the dowload as soon as you enter the page where you normally have to wait
// @include        http://gallery.mobile9.com/*
// ==/UserScript==

(function(){


	var allMetas, thisMeta, content, timeout, timeout_ms, url, view1, view2, link;

	timeout = -1;
	url = 'none';

	allMetas = document.getElementsByTagName('meta');
	for (var i = 0; i < allMetas.length; i++) {
		thisMeta = allMetas[i];

		if (thisMeta.httpEquiv.match(/refresh/i)) {
			if (thisMeta.content.match(/[\D]/)) {
				content = thisMeta.content.split(';');
				timeout = content[0];
				url = content[1].match(/^[\s]*url=(.+)$/i);
				url = RegExp.lastParen;
			}
			else {
				timeout = thisMeta.content;
				url = thisMeta.baseURI;
			}
		}
	}

	document.location.href=url;

})();