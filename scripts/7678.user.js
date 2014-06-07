// OIFY Fix
// version 1.1
// 2006-09-24
// Copyright (c) 2006, Tristan Pemble
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
// select "OIFY Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OIFY Fix
// @namespace     http://forums.facepunchstudios.com/forumdisplay.php?f=56
// @description   NOT MADE BY ME, MADE BY TRISTAN PEMBLE, AS INDICATED, gets rid of annoying flashing in OIFY
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==

var allOIFYLinks, thisOIFYLink;

allOIFYLinks = document.evaluate(
    "//link[@href='/OIFY.css']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    

if ( allOIFYLinks.snapshotLength == 0 ) { exit; }

for (var i = 0; i < allOIFYLinks.snapshotLength; i++) {
    thisOIFYLink = allOIFYLinks.snapshotItem(i);
    thisOIFYLink.href = 'styles.css?6';
}

var allOIFYBanners, thisOIFYBanner;

allOIFYBanners = document.evaluate(
    "//center/a[@href='http://forums.facepunchstudios.com/forumdisplay.php?f=56']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allOIFYBanners.snapshotLength; i++) {
    thisOIFYBanner = allOIFYBanners.snapshotItem(i);
    thisOIFYBanner.parentNode.parentNode.removeChild(thisOIFYBanner.parentNode);
}

var allHeaders, thisHeader;

allHeaders = document.evaluate(
    "//div[@class='page']/div[1]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
thisHeader = allHeaders.snapshotItem(0);

var newElement = document.createElement('p');
newElement.innerHTML = TopBar;

thisHeader.parentNode.insertBefore(newElement, thisHeader);

