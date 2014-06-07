// ICHC simplifier, a Greasemonkey user script
// Version 0.1 - Jan 04, 2008
//
// modified from Jordon Kalilich's comment remover script
//
// ==UserScript==
// @name          ICHC simplifier
// @namespace     http://userscripts.org/
// @description   Removes clutter on icanhascheezburger.com.
// @include       http://icanhascheezburger.com/
// @include       http://icanhascheezburger.com/page/*

// ==/UserScript==

// Remove/change link(s) to the comment form(s)
var commentLinks = document.evaluate("//p[@class='commentnow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (commentLinks) {
   for (i = 0; i < commentLinks.snapshotLength; i++) {
      commentLinks.snapshotItem(i).parentNode.removeChild(commentLinks.snapshotItem(i));
   }
}

// Remove sharing section
var commentLinks = document.evaluate("//p[@class='shareit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (commentLinks) {
   for (i = 0; i < commentLinks.snapshotLength; i++) {
      commentLinks.snapshotItem(i).parentNode.removeChild(commentLinks.snapshotItem(i));
   }
}

var commentLinks = document.evaluate("//p[@class='socmarks']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (commentLinks) {
   for (i = 0; i < commentLinks.snapshotLength; i++) {
      commentLinks.snapshotItem(i).parentNode.removeChild(commentLinks.snapshotItem(i));
   }
}


// Remove sharing section
var commentLinks = document.evaluate("//div[@class='socmark']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (commentLinks) {
   for (i = 0; i < commentLinks.snapshotLength; i++) {
      commentLinks.snapshotItem(i).parentNode.removeChild(commentLinks.snapshotItem(i));
   }
}

//remove easyshare input form with url
var snapHidden = document.evaluate("//input[@name='easyshare2']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		var elmHidden = snapHidden.snapshotItem(i);
		elmHidden.type = 'hidden';
		(elmHidden.name || elmHidden.id) + '"';
   }
