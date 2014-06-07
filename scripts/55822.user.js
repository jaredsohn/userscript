// version 0.2 BETA!
// 2009-11-16
// Copyright (c) 2009, Will McDonald
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
// select "NowTorrents Cleaner", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           TorrentFly/NowTorrents Cleaner
// @description    Make TorrentFly more user-friendly by removing click-tracking and usenext links
// @include        http://www.nowtorrents.com/torrents/*
// @include        http://torrentfly.com/torrents/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Remove the stupid Usenext links
var fake_results = document.getElementById('results_show_2');
fake_results.parentNode.removeChild(fake_results);

// Remove ads/tracking
var scripts = xpath('//body/script');
scripts.snapshotItem(0).parentNode.removeChild(scripts.snapshotItem(0));
scripts.snapshotItem(1).parentNode.removeChild(scripts.snapshotItem(1));
scripts.snapshotItem(2).parentNode.removeChild(scripts.snapshotItem(2));
scripts.snapshotItem(3).parentNode.removeChild(scripts.snapshotItem(3));

// Remove click-through tracking
var script = xpath("//div[@id='content_left']/script").snapshotItem(0);
var newscript = document.createElement("script");
newscript.text = script.innerHTML.replace(/http:\/\/clicklog.info\/tf_out\/out.php\?e=[0-9]+&url=/g, "");
script.parentNode.replaceChild(newscript, script);