// blogg.de Cleaner user script
// version 0.1.5
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          blogg.de Cleaner
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5145
// @include       http://*.blogg.de/*
// @include       http://blogg.de/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var patterns = new Array(
    "//div[@id='orange_ad_top']",
    "//img[contains(@src, 'h2_sidebar_werbeanzeige.gif')]/ancestor::h2",
    "//a[@target]/ancestor::div[@class='side']",
    "//a[contains(@href, 'ebay')]/ancestor::div[@class='side']",
    "//div[contains(@id, 'box_')]/ancestor::div[@class='side']",
    "//div[@id='foot-partner']",
    "//div[@id='skyscraper']",
    "//div[@id='fullbanner']",
    "//div[@class='anzeige']",
    "//div[@id='bigsizebanner']"
);
var results;
for (var i = 0; i < patterns.length; i++) {
    results = document.evaluate(patterns[i], document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < results.snapshotLength; j++) {
        results.snapshotItem(j).style.display = "none";
    }
}

})(); // function wrapper for Opera