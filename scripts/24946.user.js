// ==UserScript==
// @name 	Facebook - Advertisment hider
// @namespace	http://userscripts.org/users/49733
// @description	Removes the ad to the left on all Facebook-pages
// @include	http://www.facebook.com/*
// @author	Gustav Eklundh
// @version	1.1.0
// ==/UserScript==

function hidediv(id) {
	//safe function to hide an element with a specified id
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}
hidediv("ssponsor");