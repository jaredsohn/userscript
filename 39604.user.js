// Copyright (c) 2005, Kai Mai(www.kai-mai.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// VGApp/hnw/CorporatePortal
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          show shared connections and groups on linkedin's search result
// @namespace     http://kai-mai.com/
// @description   by default, linkedin requires clicking a link to show shared connections and groups to each user found in search result page.  This script automatically show the shared connections and shared groups
// @include	  http://www.linkedin.com/search*
// @include	  https://www.linkedin.com/search*
// ==/UserScript==


function km_show_div(allDivs){
for (var i = 0; i < allDivs.snapshotLength; i++) 
{ 
	thisDiv = allDivs.snapshotItem(i); 
	thisDiv.style.display = "block";
}
}

// display shared connections
allSharedConnDivs = document.evaluate( "//div[@class='shared-connections']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
km_show_div(allSharedConnDivs);

// display shared groups
allSharedGroupsDivs = document.evaluate( "//div[@class='shared-groups']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
km_show_div(allSharedGroupsDivs);


