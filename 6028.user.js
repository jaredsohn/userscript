// eBay Forum Item ID user script
// version 0.4.5
// 2008-02-12
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
// @name          eBay Forum Item ID
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/6028
// @include       http://forums*.ebay.tld/*thread.jspa?*
// @include       http://answercent*.ebay.tld/*.jspa?*
// @include       http://community.ebay.de/forum/ebay/thread.jspa?*
//                for Opera (which doesn't understand tld):
// @include       http://forums.ebay.com/*thread.jspa?*
// @include       http://forums.ebay.com.au/*thread.jspa?*
// @include       http://forums-be*.ebay.be/*thread.jspa?*
// @include       http://forums.ebay.ca/*thread.jspa?*
// @include       http://forums.ebay.fr/*thread.jspa?*
// @include       http://forums.ebay.com.hk/*thread.jspa?*
// @include       http://forums.ebay.in/*thread.jspa?*
// @include       http://forums.ebay.co.uk/*thread.jspa?*
// @include       http://forums.ebay.it/*thread.jspa?*
// @include       http://forums.ebay.com.my/*thread.jspa?*
// @include       http://forums.ebay.nl/*thread.jspa?*
// @include       http://forums.ebay.ph/*thread.jspa?*
// @include       http://forums.ebay.pl/*thread.jspa?*
// @include       http://forums.ebay.com.sg/*thread.jspa?*
// @include       http://forums.ebay.es/*thread.jspa?*
// @include       http://answercenter.ebay.com/*
// @include       http://answercenter.ebay.com.au/*
// @include       http://answercenter.ebay.ca/*
// @include       http://answercenter.ebay.com.hk/*
// @include       http://answercenter.ebay.com.my/*
// @include       http://answercenter.ebay.com.sg/*
// @include       http://answercenter.ebay.pl/*
// @include       http://answercentre.ebay.co.uk/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var textNodes = document.evaluate("//td[@class='jive-description']//text()|" +
    "//div[@class='ebayACMessageBody']//text()|" +
    "//td[@class='ac-thread-box']/table/tbody/tr/td[@colspan]//text()|" +
    "//td[@class='small-print']//text()|//div[contains(@class, " +
    "'idm-posttext')]//text()", document.body, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var tld = document.domain.split(".ebay.")[1];
var be = "";
if (tld == "be") {
    be = "." + document.domain.split(".ebay.")[0].split("-")[1];
}
var node, itemID, matches, index, parent, link, tempNode;
var textNodesArray = new Array();
for (var i = 0; i < textNodes.snapshotLength; i++) {
    textNodesArray.push(textNodes.snapshotItem(i));
}
for (var i = 0; i < textNodesArray.length; i++) {
    node = textNodesArray[i];
    itemID = /(^|\s|\(|\,|\.|:)([0-9]{12})($|\s|\)|\,|\;|\.|\()/;
    matches = itemID.exec(node.data);
    if (matches) {
        index = node.data.search(matches[2]);
        if (index >= 0) {
            node.splitText(index);
            parent = node.parentNode;
            link = document.createElement("a");
            link.href = "http://cgi" + be + ".ebay." + tld +
                "/ws/eBayISAPI.dll?ViewItem&item=" + matches[2];
            link.appendChild(document.createTextNode(matches[2]));
            tempNode = node.nextSibling;
            parent.insertBefore(link, tempNode);
            tempNode.splitText(12);
            parent.removeChild(tempNode);
            textNodesArray[i] = link.nextSibling;
            i--;
        }
    }
}

})(); // function wrapper for Opera