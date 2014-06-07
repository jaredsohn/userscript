// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Browse ImmoScout", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Auto Refresher - 30
// @namespace     http://www.readmore.ch
// @description   Refresh every 20 minutes the defined pages 
// @include       
// ==/UserScript==

// How often is page refreshed (in ms)
var time = 1200000; //= 10sec			
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	time
) ;