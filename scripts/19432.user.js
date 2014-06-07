// No More Mister
// Version 1.1 Beta
// 2008-01-07
// Copyright (c) 2008, Paul Venuti
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
// select "No More Mister", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Change History
//
// Version 1 Beta (2008-01-07)
// -- Initial version
//
// Version 1.1 Beta (2008-01-08)
// -- Remove titles from photo captions
//
//
// ==UserScript==
// @name          No More Mister
// @namespace     http://landlordcheck.org/namespace
// @description   Removes the annoying titles (e.g., "Mr.") that the NYTimes feels it must add before a person's last name
// @include       www.nytimes.com/*
// @include       nytimes.com/*
// @include       *.nytimes.com/*
// ==/UserScript==

var all = Array();

// Remove from article text
all = document.getElementsByTagName("p");

for(var i=0; i<all.length; i++)
{
  all[i].innerHTML = all[i].innerHTML.replace(/Mr. /g, "");
  all[i].innerHTML = all[i].innerHTML.replace(/Mrs. /g, "");
  all[i].innerHTML = all[i].innerHTML.replace(/Ms. /g, "");
}

// Remove from divs with "callout" class (photo captions)
all = document.evaluate('//div[@class = "callout"]',
			document, null,
	                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                null);
			      
for (var i=0; i<all.snapshotLength; i++)
{
  all.snapshotItem(i).innerHTML = 
  all.snapshotItem(i).innerHTML.replace(/Mr. /g, "");
  
  all.snapshotItem(i).innerHTML = 
  all.snapshotItem(i).innerHTML.replace(/Mrs. /g, "");
  
  all.snapshotItem(i).innerHTML = 
  all.snapshotItem(i).innerHTML.replace(/Ms. /g, "");
}

// Remove from captions in slideshows
all = document.evaluate('//div[@class = "caption"]',
			document, null,
	                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                null);
			      
for (var i=0; i<all.snapshotLength; i++)
{
  all.snapshotItem(i).innerHTML = 
  all.snapshotItem(i).innerHTML.replace(/Mr. /g, "");
  
  all.snapshotItem(i).innerHTML = 
  all.snapshotItem(i).innerHTML.replace(/Mrs. /g, "");
  
  all.snapshotItem(i).innerHTML = 
  all.snapshotItem(i).innerHTML.replace(/Ms. /g, "");
}