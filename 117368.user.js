// ==UserScript==
// @name           MyFaceWhen.com
// @namespace      http://www.andrewwise.co.uk/
// @description    Replaces links to images on MyFaceWhen.com with their thumbnails.
// @include        *
// ==/UserScript==

var anchors = document.getElementsByTagName('a'); // Get all links on the page
for(var i = 0; i < anchors.length; i++) { // Cycle through all links on page
	if(anchors[i].href.indexOf("myfacewhen.com") > -1) { // If link is to myfacewhen.com
		anchors[i].target = '_blank'; // Mage link open new tab/window
		var img = anchors[i].href.split("http://www.myfacewhen.com/"); // Get id of image
		var url = 'http://www.myfacewhen.com/thumbs/tn_' + img[1] + '.jpg'; // Build new URL from ID
		anchors[i].innerHTML = '<img src="'  + url + '" />'; // Replace link content with image
		//anchors[i].innerHTML = '<img src="http://www.myfacewhen.com/thumbs/tn_' + img[1] + '.png" />'; // Replace link content with image
	}
}