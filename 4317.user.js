// DeviantART - Shoehorn v0.3
// Made By Luke Stevenson {http://lucanos.deviantart.com}
// Distributed and Maintained via GMVC
// Last updated: 23 November 2006
//
//   This script modifies the dimensions of deviations so that the image
// can be seen without excessive scrolling.
//
// ==UserScript==
// @name              DeviantART - Shoehorn
// @namespace         http://gmvc.lucanos.com/
// @description       (v0.3) Resizes deviations so that image width is the maximum.
// @include           http://www.deviantart.com/view/*
// @include           http://www.deviantart.com/deviation/*
// ==/UserScript==

var imageW, imageH;

(function () {
	var screenW, screenH, paddingW, imageOrigW, imageOrigH, imageOrigS, imageNewW, imageNewH, imageNewS, imageZoomIn;

	// Get Screen dimensions. Only code for Firefox required.
	screenW    = window.innerWidth-19; // 19px for scrollbar
	screenH    = window.innerHeight-19; // 19px for scrollbar

	// Add the deviantART padding values
	paddingW   = 95;

	// Get Main Deviation Attributes
	imageOrigW  = unsafeWindow.deviantART.pageData.fullview.width;
	imageOrigH  = unsafeWindow.deviantART.pageData.fullview.height;
	imageOrigS  = unsafeWindow.deviantART.pageData.fullview.src;
	imageZoomIn = document.evaluate("//span[@id='zoomed-in']/a/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
	
	// Calculate Shoehorned Attributes
	imageNewW  = screenW-paddingW;
	imageNewH  = Math.round( imageOrigH*(imageNewW/imageOrigW) );
	imageNewS  = "http://resize.lucanos.com/thumb.php?url="+unsafeWindow.deviantART.pageData.fullview.src+"&width="+imageNewW
	
	if ( imageNewW<imageOrigW ) {
		// Set Main Deviation Attributes
		unsafeWindow.deviantART.pageData.fullview.width  = imageNewW;
		unsafeWindow.deviantART.pageData.fullview.height = imageNewH;
		unsafeWindow.deviantART.pageData.fullview.src    = imageNewS;
		imageZoomIn.width                                = imageNewW;
		imageZoomIn.height                               = imageNewH;
		imageZoomIn.src                                  = imageNewS;
	} else {
		// No Change Required - Fullview will fit inside current page
	}

})();