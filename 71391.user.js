// ==UserScript==
// @name           Wikia Interstitial Killer
// @namespace      http://userscripts.org/users/52197
// @description    Removes occasional links to interstitials
// @author         darkip
// @version        0.1
// @include        http://wikia.com*
// @include        http://*.wikia.com*
// ==/UserScript==

links = document.getElementsByTagName('a');
regexp = /title=Special:Interstitial&u=([\s\S]*)/im;

for(i=0; i < links.length; i++) {
	match = regexp.exec(links[i].href);
	
	if(match != null) {
		links[i].href = links[i].protocol + '//' + links[i].host + unescape(match[1]);
	}
}