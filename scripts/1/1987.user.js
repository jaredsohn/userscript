// Bloglines Butler
// version 0.1
// 2005-10-19
// Copyright (c) 2005, Michael Jervis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Bloglines Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Bloglines Butler
// @namespace       http://fuckingbrit.com/greasmonkey
// @description     Remove Feedburner and Feedster adverts from your feeds.
// @include         http://www.bloglines.com/myblogs_display*
// @include         http://bloglines.com/myblogs_display*
// ==/UserScript==

(function() {
		var i;
		// Seek and destroy the feedburner.com adverts
		var stupidAdverts = document.evaluate(
			"//img[contains(@src,'feeds.feedburner.com/~a/')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

    for (i = 0; i < stupidAdverts.snapshotLength; i++) {
        stupidAdvert = stupidAdverts.snapshotItem(i);
        stupidAdvert.parentNode.removeChild(stupidAdvert);
    }

		// Seek and destroy the feedster adverts
		stupidAdverts = document.evaluate(
        "//a[contains(@href,'http://feedster.com/c.php')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
		for (i = 0; i < stupidAdverts.snapshotLength; i++) {
    	stupidAdvert = stupidAdverts.snapshotItem(i);
    	stupidAdvert.parentNode.parentNode.parentNode.parentNode.removeChild(
    		stupidAdvert.parentNode.parentNode.parentNode
    		);
		}
})();