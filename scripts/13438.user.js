
// Freerice user script to make input more simple: Just hit 1-4
// version 0.1
// 2007-10-29
// Copyright (c) 2007, Alexander Elbs
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
// @name          Freerice
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Make free rice more usable. Use 1-4 to select word.
// @include       http://freerice.com/*
// @include       http://www.freerice.com/*
// ==/UserScript==


window.handleKeypressed = function(e) {
    if ( e.which >= 49 && e.which <= 52 ) {
        var v = document.createAttribute("value");
        v.nodeValue = e.which - 48;
        document.getElementsByName("SELECTED")[0].setAttributeNode(v);
        document.getElementsByName("form1")[0].submit();
    }
}

var allDivs, thisDiv;
allDivs = document.evaluate("//div[@class='wordSelection']//noscript",
                            document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    newElement = document.createTextNode( (i+1) + '. ');
    thisDiv.parentNode.insertBefore(newElement, thisDiv);
}

document.addEventListener('keypress', window.handleKeypressed, true);
