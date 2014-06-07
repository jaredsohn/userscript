// By Michael Bierman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// comments, suggestions, complaints to: greasemonkey@thebiermans.net
// ==UserScript==
// @name          My.TV.YAHOO.COM  - V 0.1
// @description	  Takes you directly to local listings.
// @include       http://tv.yahoo.com/

// based on IkkySleepy's Bofa Login ( http://s89285124.onlinehome.us/bofa.user.js )

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
// select "My TV.Yahoo.com", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//  This script redirects users from the generic tv.yahoo.com to 
//  your local listings.

// ==/UserScript==


var response = confirm("Go to local listings?");

if (response == true)
   {
   	// edit this to match your local zip code (replace this url as appropriate
   	// be sure and escape &'s and ?'s
	window.location="http://tv.yahoo.com/grid\?lineup=us_CA63664\&zip=95054";

   }