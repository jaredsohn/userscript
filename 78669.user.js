// Facebook Notifications Updater
// v0.1
// 2010-06-09
// Copyright (c) 2010, SphaX
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
// configuration pane.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Efficient Refresher", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Force the update of facebook notifications 
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Force Facebook Notifications
// @namespace     None
// @description	  Force the update of facebook notifications.
// @version       0.1
// @date          2010-06-09
// @creator       SphaX
// @include	  http://*facebook.com*
// @include       https://*facebook.com*

// ==/UserScript==


//Get the reference of the facebook logo
var logo=document.getElementById('pageLogo');
	
//Get the reference of the link of logo
var logoLink = logo.childNodes[0];

//Replace the link with the good one
logoLink.setAttribute('href','http://facebook.com');

//Get the reference of the navigation pane
var navPane=document.getElementById('pageNav');

//Get the reference of the 'ul' list
var ulList = navPane.childNodes[0];
	
//Get the reference of the 'Home' link
homeLink = ulList.childNodes[0];

//Replace the link with the good one
homeLink.setAttribute('href','http://facebook.com');
    