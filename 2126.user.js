// NRG (Maariv) Talkbacks
// version 0.1 BETA!
// Originally by: 2005, Lior Z.
// NOTES: Beta only. The code should be improved upon and updated.
//	  Please do so, for I don't intend to.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Changelog:
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.2.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           NRG (Maariv) Talkbacks
// @namespace      tag:nrg.co.il,2005-10-29:nrgtalkback.
// @description    Remove all talkbacks from NRG (Maariv) site
// @include        http://www.nrg.co.il/*
// @include        http://nrg.co.il/*
// ==/UserScript==

////////////////////////////////////////////////
// 1. Remove the talkback table
////////////////////////////////////////////////

//Lodate the talkback table
var allElements, thisElement;
allElements = document.evaluate(
    "//div[@id='tguvut']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//Remove the talkback div (there should be only one, contrary to this loop).
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    // delete the selected element(s)
    //thisElement.style.backgroundColor = 'red';
    thisElement.parentNode.removeChild(thisElement);
}






