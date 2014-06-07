// ==UserScript==
// @name        Remove Gmail Ads
// @namespace   https://userscripts.org/users/3102
// @description Remove Gmail Ads
// @include     https://mail.google.com/*
// @include     https://mail.google.com
// @grant       GM_addStyle
// @version     0.1
// ==/UserScript==

// --------------------------------------------------------------------
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Facebook Wall Ads and Suggested Posts", and click Uninstall.
//
// --------------------------------------------------------------------
//
    GM_addStyle('.Zs { display: none}');
    GM_addStyle('.mq { display: none}');
    GM_addStyle('.u5 { display: none}');
//
