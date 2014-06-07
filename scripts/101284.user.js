// ==UserScript==
// @name           Outgoing Link Fixer
// @namespace      net.aib42.userscripts
// @description    Fixes "go.php?addr=http://example.com&redir=maybe" type links
// @include        *
// ==/UserScript==

var simpleLinkMatch = /[^?]*\?.*(http:\/\/[^&]*)/i;

var allLinks = document.getElementsByTagName("a");

for (var i in allLinks) {
	var actualLink = simpleLinkMatch.exec(allLinks[i].href);
	
	if (actualLink != null) {
		allLinks[i].href = actualLink[1];
	}
}
