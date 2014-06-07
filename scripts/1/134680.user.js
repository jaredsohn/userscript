// ==UserScript==
// @name OTD D3-ignore
// @namespace com.gmail.kenyon.mike.otdd3
// @description Automatically opens all unread links in the Diablo III forum
// @include http://www.olderthandos.us/phpBB3/search.php?search_id=unreadposts
// ==/UserScript==	
	
var as = document.getElementsByTagName('a');
var pattern = /olderthandos\.us\/phpBB3\/viewtopic\.php\?f=114/;
for (var i = 0, a; a = as[i]; i++) {
	if (a.hasAttribute('href')) {
		if (!a.href.match(/^javascript:/i)) {
			if (pattern.test(a.href)) {
				GM_xmlhttpRequest({
					method: "GET",
					url: a.href
				});
			}
		}
	}
}
