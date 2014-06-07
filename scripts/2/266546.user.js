// ==UserScript==
// @name       	Hide Gmail Ads
// @namespace  	http://turnerharris.com/
// @description Remove ad column from DOM in gmail and kill the remaining margin-right css property.
// @match      	https://mail.google.com/
// @include		https://mail.google.com/*
// @include		https://mail.google.com
// @grant 		GM_addStyle
// @version    	0.3
// @copyright  	2014+, You
// ==/UserScript==

function removeAds() {
	var y3 = document.getElementsByClassName('y3'),
		ps = document.getElementsByClassName('PS');
	if (y3.length) {
		y3[0].remove();
		console.log('removed ad panel');
	}
	if (ps.length) {
		ps[0].parentElement.remove();
		console.log('removed lower ad panel');
	}
}
window.onhashchange = removeAds;
window.setTimeout( removeAds, 5000 );
GM_addStyle('.if{margin-right: 0px !important;}');
