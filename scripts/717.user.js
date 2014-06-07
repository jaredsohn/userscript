// Yahoo! Mail Welcome Skipper user script
// version 0.1 BETA!
// 2005-06-19
// Copyright (c) 2005, Owen Barton
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
// @namespace     http://grugnog.com/download/
// @description   Skip Yahoo Mail 'welcome' page and get straight to the mail. Only tested with mail.yahoo.com
// @include       *mail.yahoo*ym/welcome*
// ==/UserScript==

window.location.href = window.location.href.replace(/welcome.*/,'ShowFolder?rb=Inbox');