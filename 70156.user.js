// ==UserScript==
// @name           /tv/ original spoiler image
// @description    Replaces the custom spoiler images with the old one on http://boards.4chan.org/tv/
// @include        http://boards.4chan.org/*
// ==/UserScript==

var Original = new Object(); 
Original.src = 'http://static.4chan.org/image/spoiler.png';
var imageList = new Object();
imageList["http://static.4chan.org/image/spoiler-tv.png"] = {remove: false, newimage:Original.src};
imageList["http://static.4chan.org/image/spoiler-tv2.png"] = {remove: false, newimage:Original.src};
imageList["http://static.4chan.org/image/spoiler-tv3.png"] = {remove: false, newimage:Original.src};
imageList["http://static.4chan.org/image/spoiler-tv4.png"] = {remove: false, newimage:Original.src};
imageList["http://static.4chan.org/image/spoiler-tv5.png"] = {remove: false, newimage:Original.src};

var images = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < images.snapshotLength; i++) {
var img = images.snapshotItem(i);
if (imageList[img.src]) {
img.src = imageList[img.src].newimage;
}
}