// youtube.com: Remove Comments
// Version 0.1
// 2009-11-20
// Copyright (c) 2009, Christopher Horrell
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
// select "youtube.com: Remove Comments", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          youtube.com: Remove Comments
// @namespace     http://horrell.ca/
// @description   Remove comments section from youtube.co videos. 
// @include       http://*youtube.com/*
//
// ==/UserScript==



var commentDiv = document.getElementById('div_main_comment2');
if (commentDiv) {
    commentDiv.parentNode.removeChild(commentDiv);
}
var commentDiv = document.getElementById('recent_comments');
if (commentDiv) {
    commentDiv.parentNode.removeChild(commentDiv);
}