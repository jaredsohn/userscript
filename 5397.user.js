// eBay Forum Highlight Mod user script
// version 0.2.3
// 2008-05-14
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
// @name          eBay Forum Highlight Mod
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5397
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

const colors = new Array(
    
);

const highlight = new Array(
    
);

var userIDs, anchors;
if (document.domain == "community.ebay.de") {
    userIDs = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
        "//td[position()=2]//a[starts-with(@href, " +
        "'javascript:idm_showIdCard') or starts-with(@href, " +
        "'javascript: idm_showIdCard') or contains(@href, " +
        "'http://community.ebay.de/profile.htm?nickname=')][position() = 1]" +
        "/ancestor::span/@title", document.body, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    anchors = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
        "//table", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
} else {
    userIDs = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
        "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]/" +
        "following-sibling::a[1]/text()", document.body, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    anchors = document.evaluate("//a[@name]/ancestor::tr[@class = " + 
        "'ebayUserRow' or @class = 'ebayRootUserRow' or @class = 'pinkliner']",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
    
var index, userID;
for (var i = 0; i < userIDs.snapshotLength; i++) {
    if (document.domain == "community.ebay.de") {
        userID = userIDs.snapshotItem(i).value.split("#")[0];
    } else {
        userID = userIDs.snapshotItem(i).data;
    }
    index = checkList(highlight, userID);
    if (index >= 0) {
        anchors.snapshotItem(i).style.backgroundColor = colors[index];
    }
}

function checkList(list, ID) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == ID) {
            return i;
        }
    }
    return -1;
}

})(); // function wrapper for Opera