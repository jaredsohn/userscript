// Bodybuilding.com Single Window
// version 0.1
// 2005-10-29
// Copyright (c) 2007, Joe Grossberg
// under Creative Commons License: http://creativecommons.org/licenses/by-nc-sa/2.0/
// Based on "Hotmail Single Window" : http://www.arantius.com/article/arantius/hotmail+single+window/
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
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bodybuilding.com Single Window
// @namespace     http://www.joegrossberg.com/bodybuilding_single_window.user.js
// @description   Remove javascript from some links, especially those which open a window for viewing profiles.
// @include       http://*bodybuilding.com/*
// ==/UserScript==


(function(){
var results=document.evaluate('//a[starts-with(@href, "javascript:")]', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var m, el=null, i=0; el=results.snapshotItem(i); i++) {
	if (m=el.href.match(/^javascript:(popUp)\(\'([^\']+)\'.*$/)) {
		el.href=unescape(m[2]);
	}
}
})();

// 
// Version History:
//  1.1
//   - Based on "Hotmail Single Window" at http://www.arantius.com/article/arantius/hotmail+single+window/
//

