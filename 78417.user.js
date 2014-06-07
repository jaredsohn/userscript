// Efficient AutoRefresh
// v0.1
// 2008-01-08
// Copyright (c) 2008, Arkticool - arkticcool@hotmail.com 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// You should configure the Included and Excluded pages in the GreaseMonkey 
//      configuration pane.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Efficient Refresher", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//  Allows one to AutoRefresh a site, for any reason, whether it be checking your internet connection during a long download, or checking a constantly changing site.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Efficient AutoRefresh
// @namespace     http://greasemonkey.sitesbr.net
// @description	Allows one to AutoRefresh a site, for any reason, whether it be checking your internet connection during a long download, or checking a constantly changing site.
// @version       0.1
// @date          2008-01-08
// @creator       Arkticcool(arkticcool@hotmail.com)
// @include		*


// ==/UserScript==
// Change the number after document.location etc. in the following format "10" part is the seconds, ignore the 000, but leave them after changing to your preferred time.


setTimeout(function() { document.location.reload(); } , 3000);