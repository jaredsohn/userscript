// Qype premium ads blocker
// version 0.7
// 2009-10-30
// Copyright (c) 2008, Axel Bock
// Released under the GPL license
// 
//
// --------------------------------------------------------------------
// Version history
//
// v0.7 * cleaning-ads on top? better, but no. 
// v0.6 * Another update. Still hate those idiot ads.
// v0.5 * Update for new Qype versions. Ads still annoying. 
// v0.4 * Update for the new Qype layout. Should work with both. 
// v0.3 * made removeFirst really working :-)
// v0.2 * also remove paid places, not only paid category ads
//      * detect border divs, and remove them, too 
// v0.1 * initial release
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Qype AdBlocker for the purists
// @namespace     http://www.the-me.de
// @description   Blocks the "Premium Partner Ads" on the Qype pages
// @include       http://www.qype.com/*
// ==/UserScript==


// ==========================================================================
// options. edit below to control behavior.
// ==========================================================================

// these are the div class keywords to remove.
var lookFor = new Array('Clear', 'adl_multi-adsize', 'AdsSuperbannerContainer', 'paid_listing', 'premium', 'PremiumLink', 'PaidListingForCategory','PaidListingForPlace', 'BusinessListing')

// remove the first N ads or -1 for all ads on the page
var disableFirst = -1


// ==========================================================================
// internal options. should not be edited.
// ==========================================================================

// none right now


// ==========================================================================
// here we go.
// ==========================================================================

GM_log("will remove " + (disableFirst == -1 ? "all" : String(disableFirst)) + " ad(s)")

var allDivs = document.getElementsByTagName("div");
var i=0
var foundAds = 0
// iterate through the divs by CLASS
for (i=0; i<allDivs.length; i++) { 
	// look for our premium paid links
	curDiv = allDivs[i]
	var j = 0
	// check for all keywords
	for (j = 0; j < lookFor.length; j++) {
		keywordToLookFor = lookFor[j]
		// check if we have an outer green border
		if (curDiv.className && curDiv.className.indexOf(keywordToLookFor) != -1) {
			curDiv.style.display = 'none'
			// increase ad counter
			foundAds ++
			// exit - we found a keyword
			j = lookFor.length
		}
	}
	// compare ad counter and exit if neccessary
	if (disableFirst != -1 && foundAds == disableFirst) { 
		GM_log("maximum ads to remove reached. exiting.")
		break; 
	}
}


// iterate through the divs by ID
for (i=0; i<lookFor.length; i++) {
    allDivs = document.getElementById(lookFor[i]);
    if (allDivs != null) {
        allDivs.style.display = 'none';
        foundAds++;
    }
}

GM_log("found " + String(foundAds) + " ad(s)")