// cnn.com: Remove Comments
// Version 0.1
// 2010-03-04
// Copyright (c) 2010, Christopher Horrell
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
// select "cnn.com: Remove Comments", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          cnn.com: Remove Comments
// @namespace     http://horrell.ca/
// @description   Remove comments section from cnn.com articles. 
// @include       http://*cnn.com/*
//
// ==/UserScript==



var commentDiv = document.getElementById('disqus_thread');
if (commentDiv) {
    commentDiv.parentNode.removeChild(commentDiv);
}