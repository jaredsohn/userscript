// 
// Google Cached Text
// 
// version 0.1
//  
// Copyright (c) 2006, Gleb Kozyrev
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
// @name          Google Cached Text
// @namespace     http://f10.kiev.ua/greasemonkey/
// @description   Add a link to "cached text only" version near any "Cached" link
// @include       http://www.google.com/search*
// @include       http://www.google.com.*/search*
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate(
    "//a[contains(@href,'/search?q=cache')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    thisLink = allLinks.snapshotItem(i);
    var txt = document.createElement("a");
    txt.className = thisLink.className;
    txt.href = thisLink.href + "&strip=1";
    txt.insertBefore(document.createTextNode("Text"),null);
    thisLink.parentNode.insertBefore(txt, thisLink.nextSibling);
    thisLink.parentNode.insertBefore(document.createTextNode(" - "),txt);
}
