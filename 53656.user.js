// QSS Mode Fix
// Made by Jeremy Neiman - docmarionum1
// version 0.0
// First Release: 2009-02-01
// Last Update: 2009-02-01
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// This script will fix the display thread mode when changd to threaded.
//
//
//
// ==UserScript==
// @name          QSSThreadFix
// @namespace     
// @description   Fixes the Thread display mode
// @include       http://ipb.quicksilverscreen.com/*
// @exclude      
// ==/UserScript==

if (location.href.indexOf("mode=threaded") > -1)
{
	location.href = location.href.replace("threaded", "linear");
}


