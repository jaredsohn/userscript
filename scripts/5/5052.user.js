// eBay Forum Post Ref user script
// version 0.3.6
// 2008-02-11
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
// @name          eBay Forum Post Ref
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5052
// @include       http://forums*.ebay.tld/*thread.jspa?*
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
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

if (document.domain == "community.ebay.de") {
    var threadIDItem = document.evaluate("//a[@class='idm-rsslink']/@href",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
    if (threadIDItem == null) {
        return;
    }
    var threadID = threadIDItem.value.split("=")[1];
    var messageIDs = document.evaluate("//div[@class='idm-post']" +
        "/preceding-sibling::a[@name]/@name", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var tdList = document.evaluate("//div[@class='idm-post']//" +
        "td[@class='idm-ar']", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var strings;
    for (var i = 0; i < tdList.snapshotLength; i++) {
        td = tdList.snapshotItem(i);
        td.setAttribute("style", "white-space: nowrap");
        strings = td.firstChild.data.split(" von ");
        messageID = messageIDs.snapshotItem(i).value;
        td.innerHTML = "<a href=\"http://community.ebay.de/forum/ebay/" +
            "thread.jspa?search=search&threadID=" + threadID + "&messageID=" +
            messageID + "#" + messageID + "\">" + strings[0] + "</a> von " +
            "<a href=\"http://community.ebay.de/forum/ebay/" +
            "thread.jspa?threadID=" + threadID + "\">" + strings[1] +
            "</a>";
    }
    return;
}

var href =
    document.evaluate("//a[contains(@href, 'forum.jspa?forumID=')]/@href",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (href == null) {
    return; // requires function wrapper in Opera
}    
var forumID = href.value.split("=")[1];
var baseURL = document.location.href.split("thread.jspa?")[0];
var threadID = document.evaluate("//link[@rel='alternate']/@href", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value.
    split("threadID=")[1];
var trList =
    document.evaluate("//tr[@class='ebayUserRow' or @class='pinkliner']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var tr, td , strings, messageID;
for (var i = 0; i < trList.snapshotLength; i++) {
    tr = trList.snapshotItem(i);
    td = document.evaluate(".//td[@class='messageBoxDate']", tr, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
    if (td != null) {
        strings = td.firstChild.data.split(" ");
        messageID = document.evaluate(".//a[@name]", tr, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).name;
        td.innerHTML = "<a href=\"" + baseURL +"thread.jspa?messageID=" +
            messageID + "&forumID=" + forumID + "#" + messageID + "\">" +
            strings[0] + "</a> " + strings[1] + " " + "<a href=\"" + baseURL
            +"thread.jspa?threadID=" + threadID + "&start=0" + "\">" +
            strings[2] + "</a>";
    }
}

})(); // function wrapper for Opera