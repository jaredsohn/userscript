// ==UserScript==
// @name Klassic Kiffe
// @description He's our little uncut cutie
// @author The Snake
// @include http://boards.endoftheinter.net/showmessages.php*
// @include https://boards.endoftheinter.net/showmessages.php*
// @include http://links.endoftheinter.net/linkme.php*
// @include https://links.endoftheinter.net/linkme.php*
// ==/UserScript==

var heart = new Object();
heart.src = "http://images.endoftheinter.net/img/320249dfbf2b625d9a5eee5680060aa1/itsme.jpg";
var totalstats = new Object();
totalstats.src = "http://images.endoftheinter.net/img/4df7db60c0aabf6350c868eded06500b/EB.jpg";


//
//// define the images to replace
var imageList = new Object();
imageList["http://images.endoftheinter.net/img/320249dfbf2b625d9a5eee5680060aa1/itsme.jpg"] = {remove: false, bg: "#000000", fg: "#000", newimage:

totalstats.src};
imageList["http://images.endoftheinter.net/img/4df7db60c0aabf6350c868eded06500b/EB.jpg"] = {remove: false, fg: "#000", newimage:

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