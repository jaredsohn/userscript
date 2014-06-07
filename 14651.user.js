// ==UserScript==
// @name           NoLightbox
// @description    I can't possibly be the only one who can't stand lightboxes, so here's a quick script to get rid of 'em
// @namespace      me
// @include        http://*
// ==/UserScript==
var allLinks, thisLink;
allLinks = document.evaluate('//a[@rel]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if (thisLink.rel.match("lightbox"))
		thisLink.rel = '';
}