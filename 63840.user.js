// CBC.ca: Remove Comments
// Version 0.1
// 2009-07-08
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
// select "CBC.ca: Remove Comments", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CBC.ca Remove Comments
// @namespace     http://horrell.ca/
// @description   Remove comment section from cbc.ca articles. 
// @include       http://*cbc.ca/*
//
// ==/UserScript==


var commentDiv = document.getElementById('socialcomments');
if (commentDiv) {
    commentDiv.parentNode.removeChild(commentDiv);
}