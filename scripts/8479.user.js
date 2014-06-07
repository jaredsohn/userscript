
// Backslash Images
// version 0.1 
// 2007-04-14
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// copied and modified by Nadav Kavalerchik
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
// select "Backslash Images", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BackSlash Images
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   converts images with backslashed folders to forwardslash folders
// @include       http://www.hava.co.il/*
// ==/UserScript==
// based on : http://diveintogreasemonkey.org/casestudy/dumbquotes.html

var textnodes, node, s;

textnodes = document.evaluate(
    "//img[@src]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
	s = node.src;
	s = s.replace("/hava/farms","/");
// a little bit jokery but works :-)
	s = s.replace("%5C","/");
	s = s.replace("%5C","/");
	s = s.replace("%5C","/");
	s = s.replace("%5C","/");
	s = s.replace("%5C","/");
	//alert(s);
	node.src=s;
}

//
// ChangeLog
// 2007-04-12 - 0.1 - created :-)
//
