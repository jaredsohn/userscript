// ==UserScript==
// @name          WoWWiki's dead. Long live Wowpedia
// @namespace     http://userscripts.org/users/Zasurus
// @description   Redirects google search results for wowwiki.com to go directly to wowpedia.org instead (works for "Google Instant" searches aswell) BUT causes redirect msg. Fix with: http://userscripts.org/scripts/show/10448)
// @include       *.google.*/*
// ==/UserScript==

checkLinks();
document.addEventListener('DOMNodeInserted', checkLinks, false);

function checkLinks() {	
	var theLinks = document.links;
	for(i=0; i<theLinks.length; i++) {
		if(theLinks[i].href.toLowerCase().indexOf('wowwiki.com') != -1) {
			theLinks[i].href = theLinks[i].href.replace("wowwiki.com", "wowpedia.org")
		}
	}
}