// ==UserScript==
// @name        Webshots Unflash
// @namespace   None
// @description Replaces the flash image viewer on webshots with the real image
// @include     http://*.webshots.com/photo/*

// ==/UserScript==


var allElements, thisElement;
var imageURL = document.getElementById("hqimage");

src = imageURL.src.split("=");
endsrc = unescape(src[5]);

var flashViewer = '<img src="'+endsrc+'" style="width: 100%">';
allElements = document.evaluate(
    "//div[@class='wrap']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
thisElement = allElements.snapshotItem(i);
thisElement.innerHTML = flashViewer;
}