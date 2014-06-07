// ==UserScript==
// @name          FP Snow Icon Remover
// @namespace     http://www.facepunch.com/*
// @description   Removes the Snow Icon
// @include       http://*.facepunch*.com/*
// ==/UserScript==

var bettersnow = new Object();
bettersnow.src = 

"http://www.ucl.ac.uk/internet-grammar/function/blank.gif";


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