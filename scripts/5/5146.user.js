// heise.de Cleaner user script
// version 0.2
// 2008-03-14
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
// @name          heise.de Cleaner
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5146
// @include       http://www.heise.de/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var patterns = new Array(
    "//div[@class='adbottom_itmarkt']",
    "//div[@class='adbottom_jobs']",
    "//div[@class='adbottom']",
    "//div[@class='werbung']",
    "//span[text() = 'Anzeige']/ancestor::table[@class='druck'][1]",
    "//cadv/following::table[1]",
    "//cadv",
    "//bcadv/following::table[1]",
    "//div[@class='skyscraper']",
    "//div[@class='heiseadvert']",
    "//div[@class='contentbanner']",
    "//div[@class='sales']",
    "//div[@class='leaderboard']",
    "//div[@class='ISI_IGNORE']"
);
var results;
for (var i = 0; i < patterns.length; i++) {
    results = document.evaluate(patterns[i], document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < results.snapshotLength; j++) {
        results.snapshotItem(j).style.display = "none";
    }
}

var href = window.location.href;
var index = href.indexOf("/meldung/");
if (index > -1) {
    var h2 = document.evaluate("//h2", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    var title = document.evaluate("./text()", h2, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).data;    
    h2.innerHTML = '<a href="http://www.heise.de/newsticker/meldung/' +
        href.split("/newsticker/")[1].split("/meldung/")[1].split("/")[0] +
        '">' + title + '</a>';
}

})(); // function wrapper for Opera