// ==UserScript==
// @name           HXXP to HTTP Replacer v1
// @namespace      Empty
// @include        *
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate('//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink = allLinks.snapshotItem(i);
if 	(thisLink.href.match(/hxxp:/)) {
	thisLink.href = thisLink.href.replace(/hxxp:/, 'http:');
	}
}
