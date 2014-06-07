// ==UserScript==
// @name           Mobile Suncorp Internet Banking Usability Enhancements
// @namespace      http://pinecodes.com/userscripts/
// @description    Various usability enhancements for mobile suncorp internet banking site.
// @include        https://internetbanking.suncorp*.com.au/*
// ==/UserScript==

window.addEventListener('load', function() {
	
	document.getElementsByName('UserId')[0].setAttribute('type', 'number');
	
});
