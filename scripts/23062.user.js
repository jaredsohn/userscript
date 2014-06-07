// ==UserScript==
// @name           One-letter ads removal
// @namespace      http://dimrub.vox.com/
// @description    Remove ads, consisting a link on a single letter of a word. (actually, all the links that have the class attribute set to freelink-a).
// @include        http://*kommersant.ru/*
// @include        http://*sostav.ru/*
// ==/UserScript==

var allCrazyLinks
allCrazyLinks = document.evaluate(
    "//a[@class='freelink-a']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (i = 0; i < allCrazyLinks.snapshotLength; i++) {
	crazyLink = allCrazyLinks.snapshotItem(i);
	var letter = '';
	for (j = 0; j < crazyLink.childNodes.length; j++) {
		if (crazyLink.childNodes[j].nodeName == "STRONG") {
			letter = crazyLink.childNodes[j].innerHTML;
			break;
		}
	}
	if (letter == '')
		letter = crazyLink.innerHTML;
	crazyLink.parentNode.replaceChild(document.createTextNode(letter), crazyLink);
}
