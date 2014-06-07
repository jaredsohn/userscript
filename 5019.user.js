// MySpace Full Opacity user script
// http://muujware.com/greasemonkey/myspace-full-opacity.user.js
// 2006-08-04
// Copyright (c) 2006, Matthew W. Jackson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "MySpace Full Opacity", and click Uninstall.
//
// --------------------------------------------------------------------
//
// HISTORY
//
// 2006-08-04 [Matthew W. Jackson]
//     * Initial release
//
// 2006-08-08 [Matthew W. Jackson]
//     * Added an exclusion to prevent style attributes
//       from being added to comments in the WYSIWYG editor.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MySpace Full Opacity
// @namespace     http://muujware.com/greasemonkey/
// @description   Script to remove translucent effects from MySpace profiles
// @include       http://*.myspace.com/*
// @exclude       http://blog.myspace.com/index.cfm?fuseaction=blog.comment*
// ==/UserScript==

(function() {
	// get all embed elements	
	var tds = document.getElementsByTagName("td");
	
	// loop through all embed elements
	for(var index = 0; index < tds.length; ++index) {
		var td = tds[index];
		td.style.opacity = 1.0;
	}
})();