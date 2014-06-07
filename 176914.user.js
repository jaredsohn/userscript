// ==UserScript==
// @name       Joe Monster - menu command to open all links from main page at once
// @namespace  
// @version    1.7
// @description Monkey menu command to open all links from the main page at once. Done for my wife :).
// @match      http://joemonster.org
// @copyright  gregamel
// @run-at document-body
// ==/UserScript==

function openAllNewLinks() {
	var aa = document.getElementsByClassName('indexart');
	for(var i=0; i<aa.length; i++) {
		var a = aa[i];

		var bb = a.getElementsByClassName('title');
		for(var j=0; j<bb.length; j++) {
			var b = bb[j];
			if (b.tagName.toLowerCase() == 'a') {
				GM_openInTab('http://joemonster.org' + b.getAttribute('href'));
			}
		}
	}
}

GM_registerMenuCommand('Otwórz linki w zakładkach', openAllNewLinks);