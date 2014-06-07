
// ORF.at Resizer
// version 0.1 BETA!
// 2008-04-16
// Copyright (c) 2008, Christoph Rettinger
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
// select "ORF.at Resizer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ORF.at Resizer
// @namespace     http://rettinger.cc/greasemonkey
// @description   Uses the whole window width to display the articles
// @include       *orf.at/*
// ==/UserScript==

//GM_log("story");
//GM_log(document.getElementById("story"));

if (document.getElementById("story") != null) {
//    GM_log("center");
//    GM_log(document.getElementById("story").parentNode);
    document.getElementById("story").style.paddingRight = "20";
    document.getElementById("story").parentNode.style.width = "100%";
}
