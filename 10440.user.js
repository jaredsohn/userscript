// Sensible Flip
// Flips all text
// version 0.3
// 2010-05-19
// Released into the Public Domain. 
//
// CHANGELOG:
// 2007-07-08 Released into public domain.
// 2009-05-05 Fix @version number.
// 2010-05-07 0.2.0 Use switch statement; use getElementsByClassName() resulting
//                  in cleaner results.
//            0.2.1 Handle user names
//            0.2.2 Use XPATHs instead; flip site logo
//            0.3   All CSS all the time
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Flip", and click Uninstall.
//
// ==UserScript==
// @name       Sensible Flip
// @namespace     SEFlip
// @description   Flips text
// @include http://sensibleerection.com/*
// @include http://www.sensibleerection.com/*
// @include http://sensibleerection.com/entry.php/*
// @include http://*.sensibleerection.com/entry.php/*
// @version 0.3
// ==/UserScript==

(function() {
    GM_addStyle('img {-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg);}');
    GM_addStyle('.text_12px, .text_11px, .text_10px, .entry_details_text, .date_header_text, .entry_header_text, .entry_quote_text, .entry_comment_text, .handle, .nav_text {-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg);}');
})();