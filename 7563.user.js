// Amazon.com seller search
// version 0.3 
// 2007-02-14
// Copyright (c) 2007, zuvembi@unixbigots.org
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Amazon.com Seller Search
// @namespace     http://www.amazon.com
// @description   Force amazon.com as the seller on searches
// @include       http://*amazon.com/*
// @include       http://www.amazon.com/*
// @include       http://amazon.com/*
// ==/UserScript==

// get the links

var allLinks, thisLink;
allLinks = document.evaluate( '//a[@href]', document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++)
{
	thisLink = allLinks.snapshotItem(i);
	// for every link that conforms with amazon.com/s/ pattern, add the amazon.com seller to the back of the url
	if (thisLink.href.match(/amazon\.com\/s\//))
	{
		//make sure it hasn't already been added
		if (!(thisLink.href.match(/ATVPDKIKX0DER/))) 
		{
			if (!(thisLink.firstChild.nodeValue.match(/Remove Seller: Amazon.com/)))
			{
				thisLink.href += "&emi=ATVPDKIKX0DER";
			}
		}
	}
}


