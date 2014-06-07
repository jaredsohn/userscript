// mozillazine.org Cleaner user script
// version 0.1.4
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Based on MozillaZine Forums Sidebar Toggle user script by LouCypher
// Homepage: http://loucypher.wordpress.com/
// Script location: http://userscripts.org/scripts/show/1262
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
// @name          mozillazine.org Cleaner
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5148
// @include       http://forums.mozillazine.org/*
// @include       http://kb.mozillazine.org/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var patterns = new Array(
    "//table[@class='supportHeader']",
    "//td[@id='sidebar']"
);
var results;
for (var i = 0; i < patterns.length; i++) {
    results = document.evaluate(patterns[i], document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < results.snapshotLength; j++) {
        results.snapshotItem(j).style.display = "none";
    }
}

var sprite = document.getElementById('sprite');
sprite.title = 'Show sidebar';
sprite.style.cursor = 'pointer';
sprite.addEventListener('click',
    function () {
        var sidebar = document.getElementById('sidebar');
        if(sidebar.style.display != "none") {
            sidebar.style.display = 'none';
            this.title = 'Show sidebar';
        } else {
            sidebar.style.display = "";
            this.title = 'Hide sidebar';
        }
    }, false // true doesn't work in Opera
);

})(); // function wrapper for Opera