// ==UserScript==
// @name BeoWorld image sizing
// @namespace tournedos@beoworld
// @description Control resizing to use 720px width instead of 550px default
// @include http://forum.beoworld.org/forums/*
// @version 1.0.0
// @icon http://forum.beoworld.org/favicon.ico
// @updateURL about:blank
// ==/UserScript==

var fixed_images = 0;
var x;

// Find all inline image urls
var images = document.getElementsByTagName("img");
for(x = 0; x < images.length; x++) {
    // If it contains the resizer component with default parameters,
    // fix it up
    if (images[x].src.search("resized-image.ashx/__size/550x0") != -1) {
	newsrc = images[x].src.replace("550x0", "720x0");
	images[x].src = newsrc;
	fixed_images++;
    }
 }

// Update the window title to show how many items were fixed
if (fixed_images) {
    var s = '';
    s = fixed_images + ' images';
    document.title += ' (' + s + ' resized)';
 }
