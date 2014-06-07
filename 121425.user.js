// ==UserScript==
// @name		Single Post
// @version		1.1
// @author		Budr
// @description		Returns a single post instead of highlighting a post in a thread
// @include		*/search.php?searchid=*
// ==/UserScript==

for each (var link in document.links) {
	if(link.href.match(/.+?\/showthread\.php\?p=.+/)) {
		link.href = link.href.replace('showthread', 'showpost');
	}
}