
// Google+ Flipped (FriendFeed Style) user script
// version 1
// July 1, 2011
// Copyright (c) 2011, Nathan Chase
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
// select "Google+ Flipped (FriendFeed Style)", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google+ Flipped (FriendFeed Style)
// @namespace     http://userscripts.org
// @description   Flips the left column listing your Circles to the right side of the page
// @include       https://plus.google.com/*
// ==/UserScript==

function changeStyle(){
    var leftCol = document.getElementsByClassName("a-p-la-T");
    var rightCol = document.getElementsByClassName("a-Cs-T");
    [].forEach.call(leftCol, function (item) { 
			item.style.float = "right";
			item.style.left = "-175px";
			});
		[].forEach.call(rightCol, function (item) { 
			item.style.left = "175px";
			});
		}
changeStyle();