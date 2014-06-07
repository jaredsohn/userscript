// ==UserScript==
// @name           Image Replacer
// @namespace      imagereplace
// @include        https://adminportal.cymax.com/*
// ==/UserScript==


var findString = ['https://adminportal.cymax.com/images/loading.gif']; // array of image src
var newString = ['http://imgur.com/zJ2hv.gif']; // array of new image src

var allImages, thisImage;

allImages = document.evaluate(
    '//img[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImages.snapshotLength; i++) {
    thisImage = allImages.snapshotItem(i);
    for (var j = 0; j < findString.length; j++) {
        if (thisImage.src.match(findString)) {
            thisImage.src = thisImage.src.replace(findString[j], newString[j]);
        }
    }
}