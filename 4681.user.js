// phpBB Recent Topics opener (first unread tabs)
// 19-08-2008v1.2.0 fheub
//	+ experimental phpBB3 support (tested only on mozillazine)
// 07-03-2007v1.1.2 fheub
//	+ correcetd CR/LF - works now on linux
// 19-07-2006v1.1.1 fheub
//	+ added asterisk for include (*/search.php?*search_id=newposts*)
// 13-07-2006v1.1.0 fheub
// adaption of original Greasemonkey user script by JAPIO:
//	+ open "first unread" posts instead of most recent ones.
//	+ open new tabs instead of windows.
//	+ try to use icon_newest_reply provided by theme/template.
//	+ search in TH or TD for class thCornerR: more flexible link insertion.
//	+ forum view pages included.
//	+ corrected some minor bugs: double definitions etc.
// version 1.0:
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
// @name           phpBB Recent Topics opener (first unread tabs)
// @namespace      http://fheub.at.tf/
// @description    phpBB Recent Topics opener (first unread tabs)
// @include        */search.php?*search_id=newposts*
// @include        */viewforum.php?f=*
// ==/UserScript==
//
// --------------------------//

var strLabel;
var allLinks, thisLink, thisImg;
var i;

LabelAll = "Open recent posts in tabs";
LabelOnly05 = "Open recent posts of 5 threads in tabs";
LabelOnly10 = "Open recent posts of 10 threads in tabs";

GM_registerMenuCommand(LabelAll, openRecentPostsAll);
GM_registerMenuCommand(LabelOnly05, openRecentPosts05);
GM_registerMenuCommand(LabelOnly10, openRecentPosts10);

// INSERT LINK TO INVOKE THE DISPLAY FUNCTION
// Get link icon (evaluate only last part of path,
// because we'll respect the current theme/template instead of only SubSilver)
allLinks = document.evaluate(
	"//img[contains(@src, 'images/icon_newest_reply.gif')]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
// Try for phpBB3 called icon, if needed.
if (allLinks.snapshotLength < 1) {
	allLinks = document.evaluate(
		"//img[contains(@src, 'imageset/icon_topic_newest.gif')]",
		document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);
	};
// We only need one (the first) of all found icons.
thisImg = allLinks.snapshotItem(0);


// Get insertion location
allLinks = document.evaluate(
	"//th[contains(@class, 'thCornerR')]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
// Search for alternate location (e.g. mozillazine old)
if (allLinks.snapshotLength < 1) {
	allLinks = document.evaluate(
		"//td[contains(@class, 'thCornerR')]",
		document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);	
	};
// Search for alternate location (phpBB3)
if (allLinks.snapshotLength < 1) {
	allLinks = document.evaluate(
		"//ul[contains(@class, 'topiclist')]",
		document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);	
	// Refine selection
	allLinks = document.evaluate(
		"//dd[contains(@class, 'lastpost')]",
		allLinks.snapshotItem(0), null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);	
	};
// Insert link(s)
//for (i = 0; i < allLinks.snapshotLength; i++) {
//	thisLink = allLinks.snapshotItem(i);
	thisLink = allLinks.snapshotItem(0);
	thisLink.innerHTML = thisLink.innerHTML + '&nbsp;<a href="#" title="' + LabelAll + '"><img src="' + thisImg.src + '" alt="' + LabelAll + '" title="' + LabelAll + '" border="0" /></a>';
	thisLink.addEventListener('click', openRecentPostsAll, true)
//	}

// LINKS TO RECENT POSTINGS	
// Select links
allLinks = document.evaluate(
	"//a[contains(@href, '&view=newest')]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
// Try for phpBB3 called links, if needed.
if (allLinks.snapshotLength < 1) {
	allLinks = document.evaluate(
		"//a[contains(@href, '&view=unread')]",
		document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);
	};
// Open links in new tabs		
function openRecentPosts(maxLinks) {
	if (maxLinks == 0) {
		maxLinks = allLinks.snapshotLength;
		}
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		if (i == maxLinks) {
			break;
			}
		thisLink = allLinks.snapshotItem(i);
		GM_openInTab(thisLink.href);
		}
	}
// Wrapper functions, since GM_registerMenuCommand seemed unable
// to handle function arguments directly
function openRecentPostsAll() {
	openRecentPosts(0);
	}
function openRecentPosts05() {
	openRecentPosts(5);
	}
function openRecentPosts10() {
	openRecentPosts(10);
	}

