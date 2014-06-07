// Westlaw Title
// Version 0.1
// 2006-09-16
// Copyright (c) 2006, Andrew Flusche
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Westlaw Title", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==

// @name           Westlaw Title

// @namespace      http://www.legalandrew.com

// @description    Gives Westlaw windows helpful titles based on document name.

// @include        *.westlaw.*

// ==/UserScript==

// Only execute if this is a "find" page.
if (window.location.href.search(/find/i) <= 0) {
	return;
}

// Make sure user has appropriate Greasemonkey version.
if (!GM_setValue || !GM_getValue) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// Prepare "load" listener to change the title.
window.addEventListener(
    "load", 
    function() {
		document.title = GM_getValue("myTitle");
	},
    true);

// Grab page's title, clean it up.
newTitle = document.getElementById('headerTitleTruncate1').innerHTML;
newTitle = newTitle.replace(/&nbsp;/gi, "");

// Store the page's title, so listener can use it.
GM_setValue("myTitle", newTitle);


/* Change Log

0.1 - 2006-09-16 - initial version

*/