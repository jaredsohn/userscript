// Knol reload
// Version 1.0.1
// 2006-08-24
// Copyright (c) 2008, William Merriam
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This very simple script reloads Knol pages every 10 minutes.
// Only pages addressed with a fragment identifier of "#edit-suggestions" are reloaded.
//
//
// This is a trivial edit of Refresh Any: http://userscripts.org/scripts/show/3237
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
// @name          Knol reload
// @namespace     http://spodcast.net/greasemonkey
// @description	  regular reload of Knol pages addressed with "#edit-suggestions"
// @include       http://knol.google.com/*#edit-suggestions
// ==/UserScript==
//
// Changelog:
// 2008-08-24: first version
// 2008-08-28: "#reload_this" changed to "#edit-suggestions"
// 2008-09-06: interval changed from 10 minutes to 30 minutes

// Global constants

var ONESEC   = 1000 ;			// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 30 * ONEMIN ;		// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;

