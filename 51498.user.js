// MAL Comments Bookmark!
// version 1.0
// 2009-06-14
// Copyright (c) 2009, Bastvera <bastvera@gmail.com>
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
// select "MAL Comments Bookmark", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Comments Bookmark
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/profile/*
// @description    This script adds bookmark to comments on users profiles.
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Get nav for bookmark
var allNavs = document.evaluate(
    "//div[@style='float: right;']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

//Prepare bookmark element
var bookmark = document.createElement('A');
bookmark.appendChild(document.createTextNode('Go to comments'));
bookmark.style.fontSize="10px";
bookmark.href="javascript:;"
				
for (var i = 0; i < allNavs.snapshotLength; i++){
    var linkNav = allNavs.snapshotItem(i);
    linkNav.insertBefore(document.createTextNode('   '), linkNav.firstChild);
    linkNav.insertBefore(bookmark, linkNav.firstChild);
}

//Get comments
comments = document.evaluate(
    "//div[@class='floatRightHeader']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (i = 0; i < comments .snapshotLength; i++){
    var comment = comments .snapshotItem(i);
}		
	
bookmark.addEventListener('click',function () {
    ScrollToElement(comment);
},false)
	
function ScrollToElement(SelectedH2){
    var x = 0;
    var y = 0;
    while(SelectedH2 != null){
        x += SelectedH2.offsetLeft;
        y += SelectedH2.offsetTop;
        SelectedH2 = SelectedH2.offsetParent;
    }            		      
    window.scrollTo(x,y);
}