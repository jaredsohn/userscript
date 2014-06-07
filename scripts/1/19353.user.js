// 
// Amazon Link 2 ISBN Search
// 
// version 0.1
//  
// Copyright (c) 2008, Deathalicious
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
// select "Google cached text", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Amazon Link to ISBN search
// @namespace     None
// @description   Add a link to every amazon link that points to a product lookup
// @include       *
// ==/UserScript==

var allLinks;

var lookupURL='http://www.google.com/products?scoring=p&q='; // Change this to change the search page
var iconText='[i]'; // Change this to change how the ISBN search button appears

allLinks = document.evaluate(
    "//a[contains(@href,'www.amazon.com/exec/obidos/ASIN/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    doLink(allLinks.snapshotItem(i));
}
allLinks = document.evaluate(
    "//a[contains(@href,'www.amazon.com/gp/product/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    doLink(allLinks.snapshotItem(i));
}

function doLink(thisLink) {
	var isbn = thisLink.href.replace(/.*(ASIN|gp\/product)[^0-9]([^\/]+)\/.*$/,'$2');
    var txt = document.createElement("a");
    txt.className = thisLink.className;
	txt.style.fontSize='smaller';
    txt.href = lookupURL + isbn;
    txt.insertBefore(document.createTextNode(iconText),null);
    var holder=document.createElement('sup');
    holder.appendChild(txt);
    thisLink.parentNode.insertBefore(holder, thisLink.nextSibling);
}