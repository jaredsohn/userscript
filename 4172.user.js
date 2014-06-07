// version 1
// June 6, 2007
// Copyright (c) 2006, Miles Libbey
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
// select "SouthWest Airline A group", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	SouthWest Airline A group
// @description    Changes SouthWest Airline Boarding Passes from group B or C to an A, allowing you to get on board (somewhat) early.  Just checkin through their website and print your new Boarding Pass.  
// @include        http://southwest.com/cgi-bin/viewBoardingPass
// ==/UserScript==

(function() {

var images=document.getElementsByTagName("img");
for (var loop=0; loop < images.length; loop++){
	var cand=images[loop];
	if (cand.src.match(/boardingB/i)){cand.src="/images/boardingA.gif";}
	if (cand.src.match(/boardingC/i)){cand.src="/images/boardingA.gif";}	
	}	
	
})();