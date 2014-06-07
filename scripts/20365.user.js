// Digium rewrite script 
// version 0.1
// 2008-01-16
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
// select "Digium Rewrite", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Digium Rewrite 
// @description   remove redirect on digium downloads 
// @include       http://ftp.digium.com/* 
// @include	  http://downloads.digium.com/pub/*
// ==/UserScript==

// remove annoying:
// http://www.digium.com/elqNow/elqRedir.htm?ref=
// prefix from ftp.digium.com links

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
    if (thisLink.href.match("digium")) {
       //alert(thisLink.href);
       thisLink.href = thisLink.href.replace("http://www.digium.com/elqNow/elqRedir.htm?ref=", "" )
    }
}
