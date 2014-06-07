// ==UserScript==
// @name          FP Snow Icon Replacer
// @namespace     http://www.facepunch.com/*
// @description   Replaces the Snow Icon
// @include       http://*.facepunch*.com/*
// ==/UserScript==

var bettersnow = new Object();
bettersnow.src = 

"http://ploader.net/files/9f8784aa6a9f243a1d303a43bfc2af67.png";


var imageList = new Object();
imageList["http://dl.dropbox.com/u/3590255/Bits/snowflake.png"] = 

{remove: false, fg: "#000", newimage:bettersnow.src};



var images = document.evaluate('//img', document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < images.snapshotLength; i++) {
var img = images.snapshotItem(i);
if (imageList[img.src]) {
img.src = imageList[img.src].newimage;
}
}