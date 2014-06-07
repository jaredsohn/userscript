// ==UserScript==
// @name           bravoerotica redirect fix
// @namespace      none
// @description    fixes bravoerotica redirects
// @include        http://www.bravoerotica.com/*
// @license      GPL version 2 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// based upon Outgoing Links Page Removal by Kasumi Ghia

var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i)
{
	// archives
	if(links[i].href.indexOf('http://www.bravoerotica.com/st/st.php?url=') > -1) {
		links[i].setAttribute("href", links[i].href.substring(links[i].href.search('=') + 1));
		links[i].setAttribute("href", links[i].href.substring(0,links[i].href.search('&')));
	}
	// main area
	if(links[i].href.indexOf('http://www.bravoerotica.com/st/st.php?id=') > -1) {
		links[i].setAttribute("href", links[i].href.substring(links[i].href.search('&') + 5));
		links[i].setAttribute("href", links[i].href.substring(0,links[i].href.search('&')));
	}
	// niches
	if(links[i].href.indexOf('http://www.bravoerotica.com/st/st.php?cat=') > -1) {
		links[i].setAttribute("href", links[i].href.substring(links[i].href.search('&') + 5));
		links[i].setAttribute("href", links[i].href.substring(0,links[i].href.search('&')));
	}
}
