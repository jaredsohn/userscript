//
// Your Mum News
// version 1.0
// by Tom Scott
// http://www.tomscott.com
//
// includes code from Dive into Greasemonkey by Mark Pilgrim
// http://diveintogreasemonkey.org
//
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
// select "Your Mum News", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Your Mum News
// @namespace     http://www.tomscott.com/
// @description   Adds puerile playground humour to news sites
// @include       http://news.bbc.co.uk/*
// @include       http://*.cnn.com/*
// @include       http://cnn.com/*
// @include       http://www.guardian.co.uk/*
// @include       http://*.guardian.co.uk/*
// @include       http://guardian.co.uk/*
// ==/UserScript==


var textnodes;

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    node.data = s.replace(/ (the )?[A-Z][a-z]* [A-Z][a-z]* ([a-z])/,' your mum $2');
}