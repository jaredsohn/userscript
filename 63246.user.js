// ==UserScript==
// @name           fix fakebook
// @namespace      links
// @include        http://www.facebook.com/*
// ==/UserScript==

(function(){
	var links = document.getElementsByTagName('a');
	for(var i=links.length; i--;) {
		var a = links[i];
		if(a.href.substring(0, 32) == 'http://www.facebook.com/l.php?u=') {
			a.href = unescape(unescape(a.href.substring(32).split('&')[0]));
		}
		if(a.getAttribute('onmousedown')) {
			a.removeAttribute('onmousedown');
		}
		if(a.getAttribute('onclick')) {
			a.removeAttribute('onclick');
		}
		if(a.getAttribute('target')) {
			a.removeAttribute('target');
		}
	}
})();
