// PBASE.COM comments remove script
// version 0.1 BETA!
// 2008-05-08
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
// select "PBase Comments", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PBase Comments
// @namespace     
// @description   Remove comments from PBase pages
// @include       http://www.pbase.com/*
// ==/UserScript==

var comments = document.getElementById('commentlist');
if (comments) {
    comments.parentNode.removeChild(comments);
}