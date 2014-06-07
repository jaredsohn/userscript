// NY Times Real Estate Linkerator
// version 0.1 BETA!
// 2006-01-30
// Copyright (c) 2006, Corey Menscher (corey.menscher@yahoo.com)
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
// select "Stop The Presses!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NY Times Real Estate Linkerator
// @namespace     http://www.menscher.com
// @description   De-obfuscates realestate.nytimes.com links from js functions to actual URL's
// @include       http://realestate.nytimes.com*
// ==/UserScript==

var pageAddr, links, a, href, listingID;
pageAddr = window.location.href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);
    href = a.href;
    // NYTimes
    //current link format:
    //"javascript:LookDetails('U','LINK_ID_VAL',SOME_CNT)
	if (href.match(/\javascript\:LookDetails/i)) {
	test = new String(href);
	rexp1 = /\javascript\:LookDetails\('.','/i;
	rexp1(test);
	s=RegExp.rightContext;
	rexp2 = /'/i;
	rexp2(s);
	listingID = RegExp.leftContext;
	a.href = 'http://realestate.nytimes.com/+comshare/vulisting.asp?Lid='+listingID;
	}
}
