// ==UserScript==

// @name          FP Funny Icon Replacer

// @namespace     http://www.facepunch.com/*

// @description   Replaces the Funny Icon

// @include       http://*.facepunch*.com/*

// ==/UserScript==



var betterfunny = new Object();

betterfunny.src = "http://www.facepunch.com/fp/emoot/v.gif"; 





var imageList = new Object();

imageList["http://cdn.fpcontent.net/fp/ratings/funny2.png"] = {remove: false, fg: "#000", newimage:betterfunny.src};







var images = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < images.snapshotLength; i++) {

var img = images.snapshotItem(i);

if (imageList[img.src]) {

img.src = imageList[img.src].newimage;

}

}