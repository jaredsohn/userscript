// ==UserScript==
// @name           mitx-calculator-b-gone
// @namespace      thomasloch
// @version        0.10
// @description    Removes the calculator and previous/next buttons
// @include        https://6002x.mitx.mit.edu/*
// ==/UserScript==

/*

MITx Calculator-b-gone
----------------------

Removes the calculator and previous/next buttons from the website due
to serious and continually unaddressed interface bugs that impair
usability.

*/


var e = document.getElementById('calculator_wrapper');
if(e) {
	unsafeWindow.console.log('Removed broken calculator frame');
	e.parentNode.removeChild(e);
	e = null;
}

var nav = document.getElementsByTagName('nav');
for(var n, j = 0; (n = nav[j]) != null; j++) {
	if(n.className == 'sequence-bottom') {
		unsafeWindow.console.log('Removed broken buttons');
		n.parentNode.removeChild(n);
		break;
	}
}




