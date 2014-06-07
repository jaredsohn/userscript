
// moretweet! example user script
// version 0.1 BETA!
// 2010-07-12
// Copyright (c) 2010, Steve Tran
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
// select "moretweet", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          moretweet
// @namespace     http://clu3.com/moretweet
// @description   Trigger more click event to have more tweets displayed in home page
// @include       http://twitter.com/*
// ==/UserScript==

setTimeout("var evt = document.createEvent('MouseEvents'); evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); var el = document.getElementById('more');  el.dispatchEvent(evt);", 3000);
