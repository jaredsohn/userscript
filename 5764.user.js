// eBay Feedback Sold Items user script
// Version 0.4.4
// 2010-10-26
// Copyright 2006-2010, thorbenhauer
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
// @name          eBay Feedback Sold Items
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5764
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

var linkText, userID, anchor;
var tld = document.domain.split(".ebay.")[1];
var be = "";
switch (tld) {
    case "de":
    case "at":
    case "ch":
        linkText = 'Artikel der letzten 31 Tage';
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
        linkText = 'Items for the last 31 days';
        break;
    case "be":
        be = document.domain.split(".ebay.")[0].split("feedback")[1];
    default:
        linkText = 'Items for the last 31 days';
        break;
}
userID = document.evaluate("//td[@id = 'memberBadgeId']" +
    "//a[contains(@href, 'http://myworld.')]" +
    "//span[@class ='mbg-nw']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
var a = document.createElement("a");
a.href = 'http://cgi6' + be + '.ebay.' + tld +
    '/ws/eBayISAPI.dll?ViewListedItems&sort=3&page=1&rows=200&since=31' +
    '&rdir=0&userid=' + userID;
a.innerHTML = linkText;
anchor = document.evaluate("//div[@class = 'memberQuickLinkTitle']" +
    "/ancestor::div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
if (anchor) {
   a.setAttribute("style", "display: table; color: rgb(0, 61, 173);");
   var newDiv = document.createElement("div");
   anchor.appendChild(newDiv);
   newDiv.appendChild(a);
   return;
}
anchor = document.evaluate("//div[@class = 'horizontalMenu']", document,
    null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (anchor) {
    a.setAttribute("class", "horizontalMenu-item");
    anchor.insertBefore(a, anchor.lastChild.previousSibling);
    return;
}
anchor = document.evaluate("//div[@id = 'horizontalMenu-drop-yukon-" +
    "PulldownMenu']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
if (anchor) {
    a.setAttribute("class", "menuLayerLinksYukon");
    anchor.parentNode.insertBefore(a, anchor);
    return;
}

})(); // function wrapper for Opera