// Prevent Pandora Timeout
// version 1.0
// 2009-11-06
//
// ==================================================

//

// This is a Greasemonkey user script.

//

// To install, you need the Firefox extension, Greasemonkey: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Greasemonkey". Select "New User Script"
// Fill in the appropriate fields.
//
// ==================================================
//
// ==UserScript==

// @name	Prevent Pandora Timeout
// @author	phithenumber@gmail.com
// @namespace	http://pandora.com

// @description	Refreshes Pandora every 59 minutes to prevent it from timing out after 1 hour (60 minutes)

// @include	http://www.pandora.com/
// @include	http*://*.pandora.com/*
// @include	http://pandora.com/*

// ==/UserScript==



function timedRefresh(timeoutPeriod) 
{

	setTimeout("location.reload(true);",timeoutPeriod);

}



JavaScript:timedRefresh(3540000) // This is set to 59 minutes in milliseconds