// UniWatchBlog Image Here
// version 0.15 BETA!
// 2008-03-06
// Copyright (c) 2007, Tyrone Mitchell
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
// select "UniWatchBlog Image Here", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          UniWatchBlog Image Here
// @namespace     http://mitchellonline.com/uwbih
// @description   Script to place inline images alongside those ubiquitous "here" or "this, this and this" links.
// @include       http://www.uniwatchblog.com/*
// @include       http://www.uniwatchblog.com
// ==/UserScript==

function swapUWImages() {
    var allElements, thisElement;
    var maxLength = 300;
    var allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //_log("Evaluating Link: ");
    for (var i=0; i<allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        //get the lower case href
        lchr = thisLink.href.toLowerCase();
        //ending of the href
        ehr = thisLink.href.length - 4;
        if (lchr.indexOf('.jpg')==ehr || lchr.indexOf('.gif')==ehr || lchr.indexOf('.png')==ehr) {
            ni = document.createElement('img');
            ni.src = thisLink.href;

            imagecheck = new Image();
            imagecheck.src = thisLink.href;
            if (imagecheck.width < maxLength) {
                ni.width = imagecheck.width;
            } else {
                ni.width = 300;
            }

            thisLink.parentNode.insertBefore(ni, thisLink.nextSibling);
        }
    }
}

window.addEventListener('load', swapUWImages, true);