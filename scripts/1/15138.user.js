
// Paypal Double Click Remover
// version 0.0.1 Alpha!
// 2007-11-30
// Copyright (c) 2007, Matthew Beacher
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Paypal Double Click Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Paypal Double Click Remover
// @namespace     http://urlxl.com/PayPal_DBClick/
// @description   Remove Double Click Redirects from Paypal Links
// @include       https://www.paypal.com/*
// @include       https://*.paypal.com/*
// @include       http://www.paypal.com/*
// @include       http://*.paypal.com/*
// ==/UserScript==

var allLinks, thisLink, newUrl, a;

allLinks = document.evaluate( '//a[@href]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    var href = thisLink.href;
	if(href.indexOf("doubleclick.net") != -1)
	{
    	a = href.indexOf("https://www.paypal.com");
	if(a==-1){a = href.indexOf("http://altfarm.mediaplex.com");}
    	newUrl = href.slice(a);
    	thisLink.href = newUrl; 
	}
    }

