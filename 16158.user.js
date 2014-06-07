// LJ and Vox markup in Vox
// Presents the <lj user=foo> in Vox as it appears in LJ. Does the same with 
// <vox user=bar>
// version 0.1 BETA!
// 2007-12-10
// Copyright (c) 2007, Dmitry Rubinstein
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
// select "LJ and Vox User", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LJ and Vox User
// @namespace     http://dimrub.vox.com/
// @description   Presents the Livejournal and Vox user in a way familiar to Livejournal users in Vox.
// @include       http://*.vox.com/*
// ==/UserScript==

var textNodes = document.evaluate(
    '//div[@class="asset-body preview-links" or @class="comment-body"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textNodes.snapshotLength; i++) {
    textNode = textNodes.snapshotItem(i);
    var origText = textNode.innerHTML;
    text = origText.replace(/&lt;lj user="?([^"&]*)"?&gt;/g, 
        "<span style='white-space: nowrap;'><a href='http://$1.livejournal.com/profile'>" + 
        "<img src='http://stat.livejournal.com/img/userinfo.gif' alt='[info]' width='17' height='17' style='vertical-align: bottom; border: 0; padding-right: 1px;' />" +
        "</a><a href='http://$1.livejournal.com/'><b>$1</b></a></span>");
    text = text.replace(/&lt;vox user="?([^"&]*)"?&gt;/g, 
        "<span style='white-space: nowrap;'><a href='http://$1.vox.com/profile'>" + 
        "<img src='http://p-static.vox.com/.shared:v39.4:vox:ru/themes/default/icon-vox-this.gif' alt='[info]' width='12' height='14' style='vertical-align: text-bottom; border: 0; padding-right: 1px;' />" +
        "</a><a href='http://$1.vox.com/'><b>$1</b></a></span>");
    if (origText.length != text.length)
        textNode.innerHTML = text;
}
