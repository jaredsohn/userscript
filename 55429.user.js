// H*R Resize
// version 0.2
// 2009-08-10
// Copyright (c) 2009, Luke Renaud
// Released under the GPL license
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// GreeseMonkey scripts can also be installed for Safari using the
// GreaseKit SIMBL extension. http://8-p.info/greasekit/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			HstarR Resize
// @namespace		http://luker.org/
// @description		A script to resize the flash video boxes on HomestarRunner.com.
// @include			http://www.homestarrunner.com/*
// @include			http://homestarrunner.com/*
// ==/UserScript==
/****************************************************************/
/* ------- This is where preferences should be changed! ------- */
/****************************************************************/
/* When this option is set to true then all videos are resized to the selected
 * however, if this is set to false than videos are only resized if they are
 * standard aspect ratio. Leaving widescreen videos such as sbemailahundred at
 * their normal size. */
var allVideosGetResized = false;

/* Now we set the hight of the page. This will be applied to all primary flash
 * files on the site. What you need to know though, is that if you enable for
 * all files that pages may become very wide. The widest page should be a width
 * of (1.875 * height). The default height for pages is 400px. So 600 would give
 * you an enlargement factor of 1.5, and a total area increese of 2.25x.
 * 
 * the use720p and use1080p will disable the customHeight option, and will also
 * override the allVideosGetResized option. If either of them are set to true
 * then the video is resied (even if it is too wide) to a 720p video frame size.
 * 720p takes precidence over 1080p in this case. Should the option useFrame be
 * set to true, then a red frame is put arround the video box. This is to make
 * it very easy to set video recorders to the correct height and width for
 * recording H*R into an HD format. */
var use720p = false;
var use1080p = false;
var maxHeight = 600;
// in px
var useFrame = false;

/****************************************************************/
/* ----- END CUSTOM OPTIONS! DO NOT EDIT PAST THIS POINT! ----- */
/****************************************************************/

// define our function
window.resizeObject = function(objectObj, allVideos, maxHeight, maxWidth, useFrame) {
	// Store widht and height
	var oldWidth = objectObj.width;
	var oldHeight = objectObj.height;
	
	// Calculate Aspect Ratio
	var aspectRatio = oldWidth / oldHeight;
	
	// If the aspect ratio is ok, or if we have the override set
	// then do the resize
	if (aspectRatio <= 1.625 || allVideos) {
		// predefine
		var newWidth = 0;
		var newHeight = 0;
		
		// cacluate the new sizes and set them.
		if (Math.round(aspectRatio * maxHeight) <= maxWidth) {
			newWidth = Math.round(aspectRatio * maxHeight);
			newHeight = maxHeight;
		} else {
			newWidth = maxWidth;
			newHeight = Math.round(aspectRatio / maxWidth);
		}
		
		// and perform the resize
		objectObj.width = newWidth;
		objectObj.height = newHeight;
	}
	
	// add the border if defined as such.
	if (useFrame) {
		objectObj.style.border = "5px solid red";
	}
}

/****************************************************************/
/* --------- END DEFINE CUSTOM RESIZE FUNCTIONS HERE ---------- */
/****************************************************************/


if (use720p) {
    maxHeight = 720;
    maxWidth = 1280;
	allVideosGetResized = true; // this is the override
} else if (use1080p) {
    maxHeight = 1080;
    maxWidth = 1920;
	allVideosGetResized = true; // this is the override
} else {
    maxWidth = 100000;
    // A large enough number to avoid problems
    // While I could use a 0 for simplicity of readability
    // that requires an extra conditional later on, which slows
    // down the code.
}

var object;

if (document.getElementsByTagName('object')[0] != null) {
	object = document.getElementsByTagName('object')[0];
	resizeObject(object, allVideosGetResized, maxHeight, maxWidth, useFrame);
}
if (document.getElementsByTagName('embed')[0] != null) {
	object = document.getElementsByTagName('embed')[0];
	resizeObject(object, allVideosGetResized, maxHeight, maxWidth, useFrame);
}