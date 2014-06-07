// ==UserScript==
// @name          FP Snow Icon Remover
// @namespace     http://www.facepunch.com/*
// @description   Attempts to remove snow
// @include       http://*.facepunch*.com/*
// ==/UserScript==

var bettersnow = new Object();
bettersnow.src = 

"nil";


var imageList = new Object();
imageList["http://dl.dropbox.com/u/3590255/Bits/snowflake.png"] = 

{remove: true};



var images = document.evaluate('//img', document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < images.snapshotLength; i++) {
var img = images.snapshotItem(i);
if (imageList[img.src]) {
img.src = imageList[img.src].newimage;
}
}