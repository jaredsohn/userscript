// ==UserScript==
// @name          Grooveshark ad remover
// @namespace     http://jaialito.com.ar/
// @description   The script removes ads from groovesharks non-paid accounts for listening without distraction.
// @include       http://listen.grooveshark.com/*
// @include       https://listen.grooveshark.com/*
// ==/UserScript==

setTimeout(ra, 3000);
function ra() {
	if (typeof document.getElementById('adBar') != undefined) {
		document.getElementById('adBar').parentNode.removeChild(document.getElementById('adBar'));
		if (typeof document.getElementById('mainContentWrapper') != undefined) {
			document.getElementById('mainContentWrapper').style.marginRight = "0px !important";
		}
	}
}