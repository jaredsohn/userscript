// Force Globe and Mail Print View
// version 0.3, 2007-10-24
// Copyright (c) 2005 by Dave Rogers
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Based on the Business2.0PrinterFriendly and HowStuffWorksPrinterFriendly
// scripts, both (c) 2005 by Julien Couvreur
// [blog.monstuff.com/archives/images/Business2.0PrinterFriendly.user.js]
// [blog.monstuff.com/archives/images/HowStuffWorksPrinterFriendly.user.js]
//
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Force Globe and Mail Print View", and click Uninstall.
//
// -----------------------------------------------------------------------------
//
// This script rewrites article links on the Globe and Mail's ("Canada's
// National Newspaper") main news and globetechnology sites to point to the
// print-friendly version of the article (normally not directly viewable without
// some annoying URL tweaking). Unlike the other scripts by Julien Couvreur, 
// upon which this is based, it does not redirect automatically to the
// print-friendly version of a page if you somehow end up there via a link from
// another site.
//
// -----------------------------------------------------------------------------
// ==UserScript==
// @name            Force Globe and Mail Print View
// @namespace       http://yukondude.com/
// @description     Re-writes article links to the printer-friendly version of Globe and Mail pages. 
// @include         http://*.theglobeandmail.com/*
// @include         http://*.globetechnology.com/*
// ==/UserScript==

(function() {
    // Re-write the first kind of url to the second format:
    // http://www.theglobeandmail.com/servlet/story/RTGAM.*/BNStory/.*
    // http://www.theglobeandmail.com/servlet/story/RTGAM.*/BNPrint/.*

    var xpath = "//a[contains(@href,'/BNStory/') or contains(@href,'/TPStory/')]";
    var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                    
    for (var linkIndex = 0; linkIndex < res.snapshotLength; linkIndex++) { 
        var articleLink = res.snapshotItem(linkIndex);
        var matches = articleLink.href.match(/^(.*)\/(BN|TP)Story\/(.*)$/);
        var newLink = matches[1] + "/" + matches[2] + "Print/" + matches[3];
        articleLink.href = newLink;
    } 
})();
