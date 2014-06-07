// ==UserScript==
// @name           Mr. Jack
// @namespace      http://userscripts.org/scripts/show/31817
// @description    Shows the standard Mr. Jack game board for Olympic games.
// @include        http://mrjack.hurricangames.com/*
// ==/UserScript==

var allImages, thisImage, newSource;
allImages = document.evaluate(
    '//img[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImages.snapshotLength; i++) {
    thisImage = allImages.snapshotItem(i);
    // do something with thisImage
    newSource = thisImage.src.replace('imgoly','images');
    thisImage.src = newSource;
}
