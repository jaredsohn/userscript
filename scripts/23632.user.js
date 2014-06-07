// LokiAdsHead - The Lokalisten Header Deleter
// Also use LokiAds
// Version 1.0
// 2008-03-07
// Copyright (c) 2008, Janosch Maier (Phylu)
// janosch_maier@online.de
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
// select "LokiAdsHead", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LokiAdsHead
// @namespace     http://phylu.ph.funpic.de/phylu/
// @description   Deletes the header from Lokalisten.de -- Version: 1.0
// @include       http://*lokalisten.de/*
// ==/UserScript==


// deleting header
header = document.getElementById('l_headerTop');
if (header) {
    header.parentNode.removeChild(header);
}