// ==UserScript==
// @name          Flickr Finder
// @namespace     http://userscripts.org/scripts/show/10204
// @description   Links unlinked Flickr images to their Flickr page.
// @include       *

// ==/UserScript==
var anchoropen, anchorclose, unlinkedflickrimages, thisimage;
unlinkedflickrimages = document.evaluate(
    "//img[contains(@src, 'flickr.com') and not(ancestor::a[@href])]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < unlinkedflickrimages.snapshotLength; i++) {
    thisimage = unlinkedflickrimages.snapshotItem(i);
	anchoropen = document.createElement('a');
	anchorclose = document.createElement('/a');
	a.href="http://www.google.com";
    thisimage.parentNode.insertBefore(anchoropen, thisimage);
	thisimage.parentNode.insertBefore(anchorclose, thisimage.nextSibling);
	}