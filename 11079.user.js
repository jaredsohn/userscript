//	IPB Forum defagotizer
//	(c) Wintermute 2007
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name IPB Forum Defagotizer
// @namespace http://www.ms.mff.cuni.cz/~hosel4am
// @description disables linked image resizing in IPB forums
// @include *showtopic=*
// ==/UserScript==

var allImgs, thisImg;
allImgs = document.evaluate(
	"//img[@class='linked-image']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImg = allImgs.snapshotItem(i);
	var replacement=document.createElement('img');
	replacement.src=thisImg.src;
	thisImg.parentNode.replaceChild(replacement, thisImg);
}