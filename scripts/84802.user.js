// ==UserScript==
// @name          FP Funny Icon Replacer
// @namespace     http://www.facepunch.com/*
// @description   Replaces the Funny Icon
// @include       http://*.facepunch*.com/*
// ==/UserScript==

var betterfunny = new Object();
betterfunny.src = 

"http://ploader.net/files/3c7db7e12c5c48a0fbe6dfb41cd0f0c3.png"; 


var imageList = new Object();
imageList["http://www.facepunch.com/fp/rating/emoticon_tongue.png"] = 

{remove: false, fg: "#000", newimage:betterfunny.src};



var images = document.evaluate('//img', document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < images.snapshotLength; i++) {
var img = images.snapshotItem(i);
if (imageList[img.src]) {
img.src = imageList[img.src].newimage;
}
}