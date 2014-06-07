// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hello World
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==
window.setTimeout(function() {
alert('running function');
var allDropDown, thisDropDown;
allDropDown = document.evaluate(
    '//select',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDropDown.snapshotLength; i++) {
	var opt = document.createElement("option");

    	thisDropDown = allDropDown.snapshotItem(i);
alert(thisDropDown.nodeName);
    	// do something with thisLink
	opt.text = "20";
	opt.Value = "20";
	thisDropDown.options.add(opt);
}
}, 30000);