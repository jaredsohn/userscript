// eBay Feedback Extender user script
// version 0.3
// 2008-02-28
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
// @name          eBay Feedback Extender
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5293
// @include       http://feedback*.ebay.tld/ws/eBayISAPI.dll?*
//                for Opera (which doesn't understand tld):
// @include       http://feedback.ebay.com.au/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.at/ws/eBayISAPI.dll?*
// @include       http://feedback.befr.ebay.be/ws/eBayISAPI.dll?*
// @include       http://feedback.benl.ebay.be/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ca/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.fr/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.de/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.hk/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.in/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ie/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.it/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.my/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.nl/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ph/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.pl/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.sg/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.es/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ch/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.co.uk/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com/ws/eBayISAPI.dll?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var itemID;
var tld = document.domain.split(".ebay.")[1];
var be = "";
switch (tld) {
    case "de":
    case "at":
    case "ch":
        viewItem = "Artikel aufrufen";
        break;
    case "com":
    case "com.au":
    case "ca":
    case "in":
    case "ie":
    case "com.my":
    case "ph":
    case "com.sg":
    case "co.uk":
        viewItem = "View Item";
        break;
    case "be":
        be = document.domain.split(".ebay.")[0].split("feedback")[1];
    default:
        viewItem = "View Item";
        break;
}
var td, temp, anchor;
tds = document.evaluate("//table[@class='fbOuter']//tr[@class='bot']/" +
    "td[contains(text(), '-- (')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (tds.snapshotLength == 0) {
    tds = document.evaluate("//table[@class='FbOuterYukon']//" +
        "tr[@class='bot']/td[contains(text(), '-- (')]", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
for (var i = 0; i < tds.snapshotLength; i++) {
    td = tds.snapshotItem(i);
    anchor = td.parentNode.lastChild;
    temp = td.innerHTML;
    itemID = temp.match(/(\d+)/)[1];
    anchor.innerHTML = '<a href="http://cgi' + be + '.ebay.' + tld +
        '/ws/eBayISAPI.dll?ViewItem&item=' + itemID + '">' + viewItem + '</a>';
}

})(); // function wrapper for Opera