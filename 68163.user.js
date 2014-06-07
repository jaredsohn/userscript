// Greasemonkey script
// ==UserScript==
// @name          Sleek Google Interface
// @description   Radically simplifies the Google home page.
// @include       http://*.google.com/
// @include       http://google.com/
// @author        Charles R Greathouse IV
// @version       0.10 (alpha), 02010-06-25
// ==/UserScript==

var sty = '* {visibility: hidden}\n' +
	'#body * {visibility: visible}\n' +
	'#body font * {visibility: hidden !important}\n' +
	'img {opacity: 0.04}\n' +
	'input[name="btnI"] {display: none}';
var norm = '* {visibility: visible}\n' +
	'#body font * {visibility: normal !important}\n' +
	'img {opacity: 1}\n' +
	'input[name="btnI"] {display: block}';

if (!GM_addStyle) {	// Introduced in Greasemonkey 0.6.1
	function GM_addStyle(s) {
		var formatstring = document.createElement('style');
		formatstring.type = 'text/css';
		formatstring.innerHTML = s;
		document.getElementsByTagName('head')[0].appendChild(formatstring);
	}
}

var isNormal = true;
function checkStyle() {
	if (location.href.match(/google\.com\/?$/)) {
		if (isNormal)
			GM_addStyle(sty);
		isNormal = false;
	} else {
		if (!isNormal)
			GM_addStyle(norm);
		isNormal = true;
	}
	setTimeout (checkStyle, 100);
}

checkStyle();