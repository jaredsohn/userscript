// friendfeed avatars (not in comments)
// version 0.1 BETA!
// 2008-06-23
// Copyright (c) 2008, Jason Wehmhoener
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
// select "friendfeed avatars", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          friendfeed avatars (not in comments)
// @namespace     http://cloudforest.us/greasemonkey/
// @description   adds avatar images to friendfeed posts (but not comments)
// @include       http://friendfeed.com/*
// ==/UserScript==

var friendlinks = document.evaluate('//div[@class="summary"]/a[@uid][1]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<friendlinks.snapshotLength;i++) {
	var thisfriend = friendlinks.snapshotItem(i);
	var thisuid = thisfriend.getAttribute('uid');
	thisuid = thisuid.replace(/-/g,'');
	thisfriend.style.padding = "5px 5px 5px 30px";
	thisfriend.style.background = "url(http://friendfeed.s3.amazonaws.com/pictures-" + thisuid + "-small.jpg?v=1) no-repeat";	
}