// ==UserScript==
// @name           wifa-blink
// @namespace      userscripts.org
// @description    change wifa.ru
// @include        http://wifa.ru/*
// ==/UserScript==
var blink = new Object();
blink.src = "https://lh3.googleusercontent.com/_tWjtNT2t3oo/TUb2FOsI45I/AAAAAAAAAVE/AhDh2GwRwWQ/squad_new.gif";
var imageList = new Object();
imageList["http://wifa.ru/images_ng/squad_new.gif"] = {remove: false, fg: "#000", newimage:blink.src};
var images = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < images.snapshotLength; i++) {
var img = images.snapshotItem(i);
if (imageList[img.src]) {
img.src = imageList[img.src].newimage;
}
} 
