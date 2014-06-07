// Hide Safari Section Header
// version 0.1
// 2005-05-23
// Copyright (c) 2005, Joel Reed
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
// select "Hide Safari Section Header" and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hide Safari Section Header
// @description   Hide book name, author, and publisher details for easier reading
// @namespace     http://mozdev.org/code/greasemonkey/safari
// @include       http://search.safaribooksonline.com/?x=1&mode=section*
// @include       http://safari.bvdep.com/?x=1&mode=section*
// ==/UserScript==

(function() {
var allHrs;
allHrs = document.getElementsByTagName('hr');
for (var i = 0; i < allHrs.length; i++) {
	var thisHr = allHrs[i];
	thisHr.parentNode.removeChild(thisHr);
}

var snapshot, tbl;
snapshot = document.evaluate("//div[@id='section']/table[1]",
														 document,
														 null,
														 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
														 null);

if (snapshot.snapshotLength > 0)
{
	var tbl = snapshot.snapshotItem(0);
	tbl.parentNode.removeChild(tbl);
}

})();
