// Hardwarezone Forums Clutter Remover! user script
// version 0.1 BETA!
// 2005-01-13
// Copyright (c) 2006 
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
// select "Minimal Hardwarezone Forums", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hardwarezone Forums Clutter Remover
// @namespace     http://userscripts.org/scripts/show/2595
// @description   Script to reduce screen clutter on Hardwarezone Forums
// @include       http://forums.hardwarezone.com/*
// @include       http://forums.photoi.org/*
// ==/UserScript==

var allElements, thisElement;

allElements = document.evaluate(
    "//table[@class='smallfont'] | //td[@height='104'] | //td[@class='tableSIDELEFT'] | //td[@class='footer_2'] | //td[@class='tableMAINTop']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    	thisElement.parentNode.removeChild(thisElement);
}

allElements = document.evaluate(
    "//col[@width='144']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    	thisElement = thisElement.parentNode;
    	thisElement.parentNode.removeChild(thisElement);
}


allElements = document.evaluate(
    "//td[@class='links_header'] | //td[@class='memberlogin_sidebox']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    	thisElement = thisElement.parentNode.parentNode;
    	thisElement.parentNode.removeChild(thisElement);
}

