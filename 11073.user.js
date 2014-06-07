// ==UserScript==
// @name           View Original Digg Article
// @namespace      bangitliketmac
// @description    Adds a hotkey ('v') for quickly viewing the original article from a Digg comments page (the one that opens after hitting 'v' while in Google Reader)
// @include        http://*digg.com/*/*
// ==/UserScript==

document.addEventListener('keypress', function(e){
	if(e.charCode == 118) {
		var orig = document.getElementsByTagName('h3')[0].firstChild.href;
		document.location.href = orig;
	}
}, true);