// YouTube Video Hit Increase / Refresh
// Version 1
// Jun 30, 2010
// Copyright (c) 2010, Samkio
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Adds an automatic reload capability to any page.  All pages to which this
// script applies are currently refreshed every 4 seconds.  
//
// To add sites to the list of sites for which this script will apply, go to
// Tools, Manage User Scripts, and select Refresh Any in the left panel.  Then
// use the Included pages "Add" button to add additional sites to the included
// pages list.
//
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
// @name          YouTube Video Hit Increase / Refresh
// @namespace     http://www.sam.technoxic.com
// @description	  Automatic Reload for any web page inc YouTube
// ==/UserScript==
//
//
// Use tabsize=4

// Global constants

var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 4 * ONESEC ;			// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;