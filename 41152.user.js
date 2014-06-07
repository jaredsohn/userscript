// ==UserScript==
// @name           SWG Forum
// @namespace      http://userscripts.org/scripts/7671
// @include        http://forums.station.sony.com/swg/forums/*
// ==/UserScript==

var heart = new Object();
heart.src = "http://dl.getdropbox.com/u/525938/top_middle_1.jpg";
var totalstats = new Object();
totalstats.src = "http://dl.getdropbox.com/u/525938/top_left_2.jpg";


//
//// define the images to replace
var imageList = new Object();
imageList["http://forums.station.sony.com/swg/styles/SWG/swg_classic/images/top_left.jpg"] = {remove: false, bg: "#000000", fg: "#000", newimage:

totalstats.src};
imageList["http://forums.station.sony.com/swg/styles/SWG/swg_classic/images/top_stretch.jpg"] = {remove: false, bg: "#000000", fg: "#000", newimage:

heart.src};



// replace images with replacements

// grab all the images on the page
var images = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// loop through all of the images on the page
for (var i = 0; i < images.snapshotLength; i++) {
// place the current image into a variable
var img = images.snapshotItem(i);
// check if the current image is to be replaced with a new version
if (imageList[img.src]) {
// replace the current image with one from above
img.src = imageList[img.src].newimage;
}
} 
