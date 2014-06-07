// Yahoo! Mail Welcome Skipper user script
// 2005-12-29
// Copyright (c) 2005, Kai Mai(www.kai-mai.com)
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
// select "Yahoo! Mail Welcome Skipper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Mail Welcome Skipper
// @namespace     http://www.kai-mai.com
// @description   Skip that anooying Yahoo Mail 'welcome' page and go straight to inbox page
// @include       *abmail.yahoo*/ym/weclome?*
// @include       *mail.yahoo*/ym/login?*
// @include	  *.mail.yahoo.com/ym/welcome?*
// ==/UserScript==

//window.location.href = window.location.href.replace(/welcome\?.*/,'ShowFolder?box=Inbox');
window.location.href = window.location.href.replace(/login.*/,'ShowFolder?box=Inbox');
