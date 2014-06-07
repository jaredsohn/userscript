// ==UserScript==
// @name          PirateBay Proxy Fix
// @namespace     http://userscripts.org/users/Zasurus
// @description   Redirects google search results for ThePirateBay.se to go directly to PirateProxy.net instead (works for "Google Instant" searches aswell) BUT causes redirect msg. Fix with: http://userscripts.org/scripts/show/10448)
// @include       *.google.*/*
// ==/UserScript==

checkLinks();
document.addEventListener('DOMNodeInserted', checkLinks, false);

function checkLinks() {	
	var theLinks = document.links;
	for(i=0; i<theLinks.length; i++) {
		if(theLinks[i].href.toLowerCase().indexOf('thepiratebay.se') != -1) {
			theLinks[i].href = theLinks[i].href.replace("thepiratebay.se", "pirateproxy.net");
		}
	}
}
