// eBay Member Items For Sale user script
// version 0.3.10
// 2010-10-26
// Copyright 2006-2010, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Idea and core code by Frauke P. (eBay userID vorsicht_kunde)
// Thanks a lot, Frauke! :-)
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
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Member Items For Sale
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/6096
// @include       http://feedback*.ebay.tld/ws/eBayISAPI.dll?*
// @include       http://cgi*.ebay.tld/*
// @include       http://myworld*.ebay.tld/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

var domain = document.location.href.split("/")[2].split(".ebay.");
var tld = domain[1];
var be = "";
if (tld == "be") {
    var temp = domain[0].split(".");
    be = "." + temp[1];
    domain[0] = temp[0];
}
var userID, viewItems, node;
switch (domain[0]) {
    case "cgi":
        viewItems = document.evaluate("//table[contains(@class, 's-content')]" +
            "//a[contains(@href, '//shop.')]", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (viewItems == null) {
            return;
        }
        userID = document.evaluate("//div[@class='s-details']" +
            "//a[starts-with(@href, " +
            "'http://myworld.')]//span[@class='mbg-nw']", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (userID.singleNodeValue == null) {
            return;
        }
        userID = userID.singleNodeValue.textContent;
        break;
    case "feedback":
        userID = document.evaluate("//td[@id = 'memberBadgeId']" +
            "//a[contains(@href, 'http://myworld.')]" +
            "//span[@class ='mbg-nw']", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue.textContent;
        viewItems = document.evaluate("//a[contains(@href, " +
            "'eBayISAPI.dll?ViewSellersOtherItems')]", document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        if (viewItems == null) {
            return;
        }
        break;
    case "myworld":
        node = document.evaluate("//div[@class='bc g-nav fl']", document, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        if (node == null) {
            return;
        }
        userID = document.evaluate("//ul[@class='in']/li/h2/text()", node,
            null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0).data;
        if (userID.charAt(0) == ">") {
            userID = userID.substr(1);
        } // eBay-Bug
        viewItems = document.evaluate("//div[@class='MyWorldProfilePanel']/" +
            "div[@id='Links']/a[contains(@href, '/_W0QQsassZ')]", document,
            null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        break;
    default:
        return;
        break;
}
var regExp;
switch (tld) {
    case "de":
    case "at":
    case "ch":
        regExp = /b>\s+von\s+(\d*)[^\d]+/;
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
        regExp = /b>\s+of\s+(\d*)[^\d]+/;
        break;
    case "be":
        if (be == ".benl") {
            regExp = /b>\s+van in totaal\s+(\d*)[^\d]+/;
        }
        if (be == ".befr") {
            regExp = /b>\s+Objets sur un total de\s+(\d*)[^\d]+/;
        }
        break;
    case "nl":
        regExp = /b>\s+van in totaal\s+(\d*)[^\d]+/;
        break;
    case "fr":
        regExp = /b>\s+Objets sur un total de\s+(\d*)[^\d]+/;
        break;
    case "it":
        regExp = /b>\s+di\s+(\d*)[^\d]+/;
        break;
    case "pl":
        regExp = /b>\s+z\s+(\d*)[^\d]+/;
        break;
    case "es":
        regExp = /b>\s+de\s+(\d*)[^\d]+/;
        break;
    default:
        regExp = /b>\s+of\s+(\d*)[^\d]+/;
        break;
}
var itemsURL = 'http://cgi6' + be + '.ebay.' + tld +
    '/ws/eBayISAPI.dll?ViewListedItems' +
    '&include=0&since=-1&rdir=0&rows=200&userid='
var items = '0';

GM_xmlhttpRequest({
    method: 'GET',
    url: itemsURL + userID,
    onload: function(result) {
		matches = regExp.exec(result.responseText);
		if (matches) {
		    items = matches[1];
		}
		var node;
		if (viewItems.childNodes && viewItems.childNodes[0].nodeName == 'B') {
		    viewItems.childNodes[0].appendChild(document.createTextNode(' ('
		        + items + ')'));
		} else {
		    viewItems.appendChild(document.createTextNode(' (' + items + ')'));
		}
    },
});

})();