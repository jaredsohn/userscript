// phpBB Recent Topics opener
// version 1.0
// 21-03-2006
// Copyright (c) 2006, JAPIO
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "phpBB Recent Topics opener", and click Uninstall.
//
//
// ==UserScript==
// @name           phpBB Recent Topics opener
// @namespace      http://jaap.maos.nl
// @description    phpBB Recent Topics opener
// @include        */search.php?search_id=newposts*
// ==/UserScript==
//
// --------------------------//


GM_registerMenuCommand("Open all recent posts", openRecentPosts);
GM_registerMenuCommand("Open 5 recent posts", open5RecentPosts);
GM_registerMenuCommand("Open 10 recent posts", open10RecentPosts);
GM_registerMenuCommand("Open 15 recent posts", open15RecentPosts);

	var allLink, thisLink;
	allLink = document.evaluate(
	"//th[@class='thCornerR']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < allLink.snapshotLength; i++) {
		thisLink = allLink.snapshotItem(i);
		thisLink.innerHTML = thisLink.innerHTML + ' <a href="#" title="Open All"><img src="templates/subSilver/images/icon_latest_reply.gif" alt="Open latest posts" title="Open latest posts" border="0" /></a>';
		thisLink.addEventListener('click', openRecentPosts, true)
	}
	
	var allLink, thisLink;
	allLink = document.evaluate(
	"//a[contains(@href, 'viewtopic.php?p=')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
		
	function openRecentPosts()
	{
		for (var i = 0; i < allLink.snapshotLength; i++) {
			thisLink = allLink.snapshotItem(i);
			window.open(thisLink.href, '', '');
		}
	}
	
	function open5RecentPosts()
	{
		for (var i = 0; i < allLink.snapshotLength; i++) {
			thisLink = allLink.snapshotItem(i);
			window.open(thisLink.href, '', '');
			if( i + 1 == 5 ) break;
		}
	}
	
	function open10RecentPosts()
	{
		for (var i = 0; i < allLink.snapshotLength; i++) {
			thisLink = allLink.snapshotItem(i);
			window.open(thisLink.href, '', '');
			if( i + 1 == 10 ) break;
		}
	}
	
	function open15RecentPosts()
	{
		for (var i = 0; i < allLink.snapshotLength; i++) {
			thisLink = allLink.snapshotItem(i);
			window.open(thisLink.href, '', '');
			if( i + 1 == 15 ) break;
		}
	}