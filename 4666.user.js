// LJ Ads Butler
// version 0.1
// 2006-07-12
// Copyright (c) 2006, Mike Jervis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Inspired by Mark Pilgrim's Butler (via BoingBoing)
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
// select "LJ Ads Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            LJ Ads Butler
// @namespace       http://fuckingbrit.com/greasemonkey
// @description     Remove ads from LJ
// @include         http://*.livejournal.com/*
// ==/UserScript==

(function() {

    var LJAdsButler = {

	// remove ads
	removeAds: function() {
	    junk = document.evaluate(
        "//div[contains(@class, 'ljad')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
      for (i = 0; i < junk.snapshotLength; i++) {
       	junkItem = junk.snapshotItem(i);
      	junkItem.parentNode.removeChild(junkItem);
      }

    }
  }


   LJAdsButler.removeAds();

})();
