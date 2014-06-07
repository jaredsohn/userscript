// Ars Technica OpenForum Kill File user script
// version 0.1 beta
// 2005-06-09
// Copyright (c) 2005, Reify Software - Matt McCarthy (a.k.a. dnl2ba)
//
// --------------------------------------------------------------------
//
// This user script hides posts by users you specify.
//
// To install for Internet Explorer, you need Turnabout:
// http://www.reifysoft.com/turnabout.php
// See instructions for using Turnabout here:
// http://www.reifysoft.com/turnabout.php?p=u
//
// To install for Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ars Technica OpenForum Kill File
// @namespace     http://www.reifysoft.com/?scr=arstechnicaopenforumkillfile
// @description   Hides posts by users you specify.
// @include       http://episteme.arstechnica.com/eve/ubb.x/a/tpc/f/*
// ==/UserScript==

// List usernames, each in quotation marks.
// All but the last must have a comma following;
// the last must not have a comma following.
// This list is case insensitive.

var ignoreTheseUsers =
[
 	"apk",
 	"aphelion",
 	"visigothan"
];

var postWrapper = document.getElementById("ev_common_master_div1");
if (!postWrapper || ignoreTheseUsers.length == 0) return;
var postTables = postWrapper.getElementsByTagName("table");

for (var i = 0; i < postTables.length; i++)	// for each post
{
	var memberNameLink = postTables[i].getElementsByTagName("a")[0];
	if
	(
		memberNameLink &&
		memberNameLink.className == "ev_member_link" &&
		memberNameLink.firstChild &&
		memberNameLink.firstChild.nodeValue.toLowerCase().match(ignoreTheseUsers.join("|").toLowerCase(), "i")
	)
	{
		postTables[i].style.display = "none";
	}
	// Else, one of the following is true:
	//  - not a post table (there are other random tables for layout)
	//  - no member link in this post (might be unregistered)
	//  - not a killfiled username

}