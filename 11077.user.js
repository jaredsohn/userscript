// ==UserScript==
// @name          Slashdot Link New Window
// @namespace     http://dweezil.be/greasemonkey
// @description	  Makes the links on Slashdot open in a new window.
// @include       http://slashdot.org/*
// @include       http://*.slashdot.org/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.target = '_blank';
	}

