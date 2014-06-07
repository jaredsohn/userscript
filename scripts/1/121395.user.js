// Refresh Any
// Version 1.0.1
// Feb 9, 2006
// Copyright (c) 2006, Pete Hanson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Adds an automatic reload capability to any page.  All pages to which this
// script applies are currently refreshed every 3 minutes.  
//
// To add sites to the list of sites for which this script will apply, go to
// Tools, Manage User Scripts, and select Refresh Any in the left panel.  Then
// use the Included pages "Add" button to add additional sites to the included
// pages list.
//
// TODO:  Add refresh interval customization
// TODO:  Add refresh interval per site customization, if possible.
// TODO:  Make it work with POSTDATA confirmation
//
// The TODO list should be treated as a wish list, not a list of promises for
// future functionality.
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later:
//
//     http://greasemonkey.mozdev.org/
//
// You also need Firefox 1.5 or later:
//
//     http://www.mozilla.com/
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Refresh Any
// @namespace     http://www.well.com/user/wolfy/
// @description	  Automatic Reload for any web page
// @include       http*://*.bugcafe.net/manager/_legacy_.bug
// @include       http*://bugcafe.net/manager/_legacy_.bug
// ==/UserScript==
//
// Changelog:
// - 20060206: work started
//     + v0.1 BETA: first working version
// - 20060208: released
//     + v1.0: Initial public release
// - 20060209:
//     + v1.0.1: Cleaned up source.
//
// Use tabsize=4

// Global constants

var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 240 * ONEMIN ;			// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;
