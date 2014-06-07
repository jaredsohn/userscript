// Removing butsa ads user script
// version 0.1.3
// 2008-12-16
// Copyright (c) 2008, Bytamine
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
// select "Remove butsa ads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove butsa ads
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Remove ads on players transfer from page
// @include       http://butsa.ru/*
// @include       http://www.butsa.ru/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==


var alltd = document.evaluate(
    '//td[@valign="middle"][@align="center"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < alltd.snapshotLength; i++) {
    thistd = alltd.snapshotItem(i);
    if (thistd.innerHTML.match(/<div>.*<b>.*<img src.*<a href/)){
    	//GM_log(thistd.innerHTML);
		thistd.parentNode.removeChild(thistd);
	}
}

