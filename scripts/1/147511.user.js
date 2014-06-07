// ==UserScript==
// @name        ADC Lobotomy
// @namespace   http://userscripts.org/users/useridnumber
// @include     *www.adcc.sk*
// @version     1
// ==/UserScript==

function disdisSe() {

	var highestTimeoutId = setTimeout("");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearTimeout(i); 
	}

	document.body.onselectstart = null;
	document.body.onmousedown = null;
	document.body.style.cursor = null;
}


window.onload = disdisSe;
