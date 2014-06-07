// Lakersblog blacklist script
// version 0.1 BETA!
// 2007-03-12
// Copyright (c) 2007, RDaneel
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
// select "Lakersblog blacklist", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Lakersblog blacklist
// @description   block comments by name of commenter
// @include       http://lakersblog.latimes.com/lakersblog/*
// ==/UserScript==

function xpath(query) {
  return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Comments posted by the following people will be removed
var blacklist= new Array("abcd", "xyz");

//get all the lines end comments (they start with 'Posted by', and have class 'comment-footer')
var footers = xpath("//p[@class='comment-footer']");

//look through all the footers to find the ones which are by blacklisted people
for (var i = 0; i < footers.snapshotLength; i++) {
  for (var j = 0; j < blacklist.length; j++) {
    if (footers.snapshotItem(i).textContent.match(blacklist[j])) {
	var altText = document.createTextNode("Comment blocked.");
        var comment = footers.snapshotItem(i).parentNode.childNodes[1];
  	footers.snapshotItem(i).parentNode.replaceChild(altText, comment);
    }
  }
}


