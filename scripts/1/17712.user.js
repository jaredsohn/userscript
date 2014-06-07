// ==UserScript==
// @name           Irregular Webcomic! Enhancer
// @namespace      http://freecog.net/2007/
// @description    Adds keyboard shortcuts to Irregular Webcomic!,  'b' for the previous comic; 'n' for the next.
// @include        http://irregularwebcomic.net/*
// @include        http://www.irregularwebcomic.net/*
// ==/UserScript==

function get_link_by_text(text) {
	return Array.filter(document.getElementsByTagName("a") || [], function(a) {
		return (a.textContent === text);
	})[0] || null;
}

document.addEventListener("keypress", function(evt) {
	var chr = String.fromCharCode(evt.charCode);
	
	if (chr === 'b' || chr === 'n') {
		var a = get_link_by_text({'n':'>','b':'<'}[chr]);
		if (a) {
			document.location = a.href;
			evt.stopPropagation();
			evt.preventDefault();
		}
	}
}, false);