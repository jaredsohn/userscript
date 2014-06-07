//
// That Ol' Black Magic PageRank
// Displays a Google PageRank icon at the top of any viewed page.  Hover mouse over
// icon to make it disappear.  Hold the Shift key and click anywhere on page
// to make it return.
//
// Version 04 (14 September 2007)
// ZingoTech Labs
//
// Notes:
//
// * Edit this script's @include and @exclude lines to select where the icon is
//   displayed.  Default is to show the image everywhere except pages with 
//   URL parameters (those with a question mark in them), as they're probably 
//   dynamically generated and not indexed by Google.  (This is also wise for
//   security reasons, as they parameters might include sensitive data.)
//
// Changelog:
//
// 01:  - Initial release.
//
// 02:	- Added options to modify placement of icon.
//
// 03:  - Additional excludes to prevent requesting PageRank for pages that
// 		  could never be ranked.  New PageRank logo URL.
//
// 04:  - Switched PageRank service.
//
// ==UserScript==
// @name            That Ol' Black Magic PageRank
// @namespace       tag:zingospace-004
// @description     Displays a Google PageRank icon at the top of any viewed page.  Hover mouse over icon to make it disappear.  Hold the Shift key and click anywhere on page to make it return.
// @include         http://*
// @include			https://*
// @exclude			*?*
// @exclude			*://localhost/*
// @exclude			*://127.*
// @exclude			*://192.168.*
// @exclude         *://172.16.*
// @exclude         *://172.17.*
// @exclude         *://172.18.*
// @exclude         *://172.19.*
// @exclude         *://172.20.*
// @exclude         *://172.21.*
// @exclude         *://172.22.*
// @exclude         *://172.23.*
// @exclude         *://172.24.*
// @exclude         *://172.25.*
// @exclude         *://172.26.*
// @exclude         *://172.27.*
// @exclude         *://172.28.*
// @exclude         *://172.29.*
// @exclude         *://172.30.*
// @exclude         *://172.31.*
// @exclude         *://10.*
// ==/UserScript==
//

(function()
{

	// this variable declares what service is supplying the PageRank image
	// (Sadly, ZingoTech Labs is unable to provide this service.  Sadly.)
	var SERVICE = 
        "http://www.prsitecheck.com/pagerank.php?url=http%3A//"
        + window.location.host
        + "/&action=image";

	// changed to "fixed" for the icon to float in upper left-hand corner of
	// page, even if scrolled ... set to "absolute" to maintain in top of
	// document
	//
	// "absolute" is easier on CPU consumption; "fixed" looks cooler.
	var PLACEMENT = "absolute";
	
	// find the BODY element
	bodies = document.getElementsByTagName("body");
	if(bodies.length != 1)
	{
		// odd, Captain ... I'm detecting an HTML document ... one I've never
		// encountered before.
		// (actually, this might be a FRAMESET document, in which case, ignore)
		return;
	}
	bodyElement = bodies[0];
	
	// create a new IMG element to hold the icon ... the zIndex is to
	// make sure the image floats over everything else in the page
	imgElement = document.createElement("IMG");
	imgElement.setAttribute("SRC", SERVICE);
	imgElement.id = "OBMPR";
	imgElement.style.position = PLACEMENT;
	imgElement.style.top = 0;
	imgElement.style.left = 0;
	imgElement.style.zIndex = 42;
	
	// add events so icon can be hidden and revisibled
	imgElement.addEventListener(
		"mouseover",
		function()
		{ 
			imgElement.style.display = "none"; 
			
			// do *not* allow the default action, although, since it's a plain-Jane
			// IMG element, should be something akin to doJackShit().
			return false;
		},
		false);
	bodyElement.addEventListener(
		"click",
		function(event)
		{
			// only reactivate the PageRank graphic if the Shift key is pressed
			// when the mouse button is clicked
			if(event.shiftKey)
			{
				imgElement.style.display = "block";
			}
			
			// *allow* the default action to occur, as the user might be
			// clicking on something that needs to respond to it
			return true;
		},
		false);
	
	// put IMG at the very end of the document, to (hopefully) make it the last
	// element loaded, as the strategy here is that PageRank is not as important 
    // as PageDisplay.
	bodyElement.appendChild(imgElement);

})();
