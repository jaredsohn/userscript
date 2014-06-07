
// ==UserScript==
// @name          Refresh Dragons
// @namespace     http://dragons
// @description	  Automatic Reload for any web page
// @include       http://apps.facebook.com/dragonsofatlantis/
// ==/UserScript==

//
// Use tabsize=4

// Global constants



var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 9 * ONEMIN ;			// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;