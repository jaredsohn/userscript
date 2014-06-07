
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
// @name          RT Auto Reload
// @description	  Automatic Reload for CC RT games
// @include       *conquerclub.com/gamespace.php?game=*
// ==/UserScript==
//
//
// Use tabsize=4

// Global constants

var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 1 * ONEMIN ;			// How often is page refreshed (in ms)

window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;
