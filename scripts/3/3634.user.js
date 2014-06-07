// DeviantArt Skip Click-Throughs
// version 0.2 alpha
// 2006-03-23
// Copyright (c) 2006, James Mulholland
// Based on a script by Mark Pilgrim, www.diveintogreasemonkey.org
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
// select "DeviantArt Skip Ads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DeviantArt Skip Ads
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   skip those fascist full-page ads when browsing DeviantArt
// @include       http://deviantart.com/*
// @include       http://*.deviantart.com/*
// ==/UserScript==

if (document.body.textContent.match(/Click here to continue to deviantART/)) {
	document.body.textContent = "<html><body></body></html>";
	window.location.reload();
}

//
// ChangeLog
// 2005-05-02 - 0.5 - MAP - remove anon function wrapper, require GM 0.3
// 2005-04-18 - 0.4 - MAP - fixed @include to match domain without prefix
//
