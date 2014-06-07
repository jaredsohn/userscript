// Open Economist Articles in New Windows
// Copyright (c) 2006, Adam Skory
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
// select "Offsite Blank", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ecnmst Article in New Win
// @description   force economist article links to open in a new window
// @include       *economist.com*
// ==/UserScript==

var a, links;
links = document.getElementsByTagName('a');
var re = /(cfm\?(story_id|bg)=\d\d\d\d\d\d\d|briefing\.cfm)/;
for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.href.search(re) !== -1) {
	a.target = "_blank";
    }
}
