// ==UserScript==
// @name        Megashare.vn Auto Download
// @namespace   http://quaninte.net
// @description Megashare.vn Auto Download
// @include     *megashare*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var scriptNodes = window.document.getElementsByTagName("script");
	for (var i=0;i<scriptNodes.length;i++) {
		if (!scriptNodes[i].hasAttribute("type")) {
			html = scriptNodes[i].innerHTML;
			break;
		}
	}
	html = html.split('a href=\\"');
	html = html[1].split('\\"><img');
	url = html[0];
	window.location.href = url;
}, false);