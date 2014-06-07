// dict.leo.org Cleaner user script
// Version 0.1.9
// 2008-07-18
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
// 
// With contributions from Patrik Spieß and euro22.
// Thanks for the hints and improvements!
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
// @name          dict.leo.org Cleaner
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5404
// @include       http://dict.leo.org/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var patterns = new Array(
    "//a[starts-with(@href, 'http://advert.leo.org/')]/ancestor::td[1]",
    "//td[contains(table/tbody/tr/td/table/tbody/tr/th, 'LEO wird')]",
    "//td[contains(table/tbody/tr/td/table/tbody/tr/th, 'LEO is')]",
    "//td[contains(table/tbody/tr/td/table/tbody/tr/th, 'LEO est')]",
    "//td[contains(table/tbody/tr/td/table/tbody/tr/th, 'LEO ha')]",
    "//td[contains(table/tbody/tr/th, 'Werbung')]",
    "//td[contains(small, 'Werbung')]",
    "//td[contains(table/tbody/tr/th, 'Advertisement')]",
    "//td[contains(small, 'Advertisement')]",
    "//td[contains(table/tbody/tr/th, 'Publicité')]",
    "//td[contains(table/tbody/tr/th, 'Publicidad')]",
    "//td[contains(table/tbody/tr/th, 'Pubblicità')]",
    "//table[contains(tbody/tr/td/a/text(), 'Online-Service')]",
    "//table[contains(tbody/tr/td/a/text(), 'Online Service')]",
    "//table[contains(tbody/tr/td/a/text(), 'service en ligne')]",
    "//table[contains(tbody/tr/td/a/text(), 'servicio online')]",
    "//table[contains(tbody/tr/td/a/text(), 'servizio online')]"
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