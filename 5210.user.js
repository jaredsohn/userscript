// Twisting Elbo.ws 
// version 0.1
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
// select "Twisting Elbo.ws", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Twisting Elbo.ws
// @namespace     http://CrynoIndustries.com/gm
// @description   Removes, on the music blog aggregator elbo.ws, all the "onclick" attributes from their links. (AKA: No More Redirects!)
// @include       http://elbo.ws/*
// ==/UserScript==

var onclickLinks = document.evaluate(
    '//a[@onclick]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (i = 0; i < onclickLinks.snapshotLength; i++) {
		aLink = onclickLinks.snapshotItem(i);
		var fixedLink = aLink
	  	fixedLink.removeAttribute('onclick');
	}