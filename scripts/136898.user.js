// ==UserScript==
// @name        Stickpage Whats New Minus RHG
// @namespace   Scarecrow
// @include     http://forums.stickpage.com/*
// @version     1.01
// ==/UserScript==
var links = document.evaluate(
	"//*[@href='search.php?do=getnew&contenttype=vBForum_Post'][not(@class='navtab')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) {
	var link = links.snapshotItem(i);
	link.href='search.php?do=getnew&exclude=51,52,53,54,55,56,57&contenttype=vBForum_Post';
	link.innerHTML="What's New (Minus RHG)?";
}