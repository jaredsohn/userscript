// ==UserScript==
// @name           lightboxRemover
// @namespace      http://www.hartleybermuda.com/
// @description    lightboxRemover
// @include        http://*
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate
(
    "//a[contains(@rel,'lightbox')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
);

for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    	thisLink = allLinks.snapshotItem(i);
    	// do something with thisLink
	thisLink.rel = ''
}