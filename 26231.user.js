// ==UserScript==
// @name           Internet Archive Image Hider
// @namespace      http://www.williams.edu/library/staff/about.php?id=1
// @description    Hides those annoying flashing images on the Internet Archive
// @include        http://www.archive.org/*
// ==/UserScript==

// Updates:
//
// 2008-10-15
// - Now uses image alt text as well to find and hide even more annoying thumbs.
//
// 2008-05-01
// - Updated to show in the brief display as well, made it easier to 
//   change the default quick note.


// Define unique strings in the src or alt text of images we want to hide
var ImagesToHide = new Array(
	'get-item-image.php', 
	'.gif?cnt=', 
	'http://www.archive.org/download',
	'http://www.archive.org/serve/',
	'[item image]',
	'[thumbnail]');

// Create a style sheet that will make the images nearly transparent, but show on mouse over
var cssNode = document.createElement('style');
// define some attributes of the style sheet
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.media = 'screen';
// define the styles that will hide and show the images
cssNode.innerHTML = '.subtleImg { opacity:.05; } ' +
	'.subtleImg:hover { opacity:1; } ';
// if we can find the head tag, append our style sheet to it.
if(document.getElementsByTagName("head")[0]) {
	document.getElementsByTagName("head")[0].appendChild(cssNode);
}

// Define a function to add the subtle style for all images that match our patterns
var FadeOutImages = function() {
	// get an array of all the img tags in the document
	var imgs = document.getElementsByTagName("img");
	
	// if the image tags are found...
	if(imgs) {
		// for each image in the array...
		for(var i=0; i<imgs.length; i++) {
			// for each pattern to match...
			for(var j=0; j<ImagesToHide.length; j++) {
				// If the image src contains the pattern...
				if(imgs[i].src.indexOf(ImagesToHide[j]) >= 0 || imgs[i].alt.indexOf(ImagesToHide[j]) >= 0) {
					// hide the image
					imgs[i].className = 'subtleImg';
					// stop checking patterns
					break;
				}
			}
		}
	}
}

// Fade out the images after 3 seconds
setTimeout(FadeOutImages, 3 * 1000);