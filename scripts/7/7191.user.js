// Alluc Faimly Guy episode list
// version 1
// 2007-01-22
// Copyright (c) 2006, Russell Small
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
// select "GMailSecure", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Alluc Family guy Episode list
// @namespace     http://users.aber.ac.uk/ris6/greasemonkey/
// @description   opens a new tap with a List of Family Guy episodes form Wikipedia
// @include       http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=354
// ==/UserScript==





GM_openInTab('http://en.wikipedia.org/wiki/List_of_Family_Guy_episodes');
