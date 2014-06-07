// ==UserScript==
// @name myFaradeiScript
// ==/UserScript==

function replaceHttpOnHttps() {
	for(var i = 0; i < document.links.length; i++) {
        var link = document.links[i];
		link.setAttribute('href', link.getAttribute('href').replace('http', 'https'));
	}
}

window.onload=replaceHttpOnHttps;