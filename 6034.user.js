// eBay Forum Member History user script
// version 0.2.4
// 2008-02-19
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Icon: Humility Icon Set
// by Andrew Fitzsimon and Chad 'gonZo' Rodrigue
// http://art.gnome.org/themes/icon/1136
// Released under the GPL license
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
// @name          eBay Forum Member History
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/6034
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

const QUOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgXEjIB9kwQIgAAAutJREFUOMulk11sU3UYxn//c07b" +
"tXQHXBraDhCaAQWtgE1Yyo1fmSxqsrtd9g4CweiVVya7WuKViYlGQgJ3XnJDlmhAdBhNyPyaOup0" +
"0VmUwDZS2nLO6fn6n9O/F5tVwqXv7fM+v7zJ+zxCKcV/RwhRzORKU4m0WdNT2RJAHDhN6VkLbqs5" +
"p5Rae2T/H4AQQgDTjBydOTT5euV4tcKh0k4AfvnjPt/90ODXax82aP80C1xWW0ahlNo0J3If7Hvp" +
"dP3JZ14wz75WZtuQ4M/bTXQjye7du+j5igsfr/DXrS+s2/MXP0K23lBKKW3rkumxiTP10fIJ89TJ" +
"vfTcHp9f/5RXnt3Ji4eHuTE/T8/tcerkXkbLJ8yxiTN1YBrAEEIUjUJ1JruvZo4fNHnQdQj7Ovnt" +
"SfaXDwPwxLWvadshSS1m/OB2bsiaaRSqM0KIr7RMrjRVmTxXSeFTHMnQsQMcV7J812OpsczCN4us" +
"rEt6rqRjBxRHMqTwqUyeq2RypSkjkTZryeE8w0ZAx3bxghj0Pr7v8+6lKxiGgS/TWF6AiiWhjDCH" +
"BJaeJ5E2a4aeypaEkSSdinjohIRRn76AHdt0Lr3zNgD1t97DciWiLwllzFBCx1ZJ9FS2ZGy+EPww" +
"wnIlUdwnQtHvuoNftx96ZIYlOhJD1/BlhBCbmhEHTlNF8nk3jrHdgLivkCrGkHIACKQk9gIMInRN" +
"4AYxSpfEgdPUpGcthPYGETq2J3E8ie1KfPlvQr0gxna3NE8SoRPaG0jPWtDcVnOucfV8Q0tk6ToR" +
"bcun1fXoeeEAYPcCWl2PtuXTdSK0RJbG1fMNt9WcM5RSa0KI2c7qzYu5A+NmOT+EHykSnQcDQHnP" +
"CKldeVI6rGz4tH67acn172eVUmuPRHn/y2fre55+zpyoFri3eouNtXsgBIXCKMWxCp8trnPn5y+t" +
"369fGET58TLljs0cefXNyvHqEZ4aKwCwvLrOt4tLLH3yfoPWj4+X6f/U+W9I4ZCZoDLglQAAAABJ" +
"RU5ErkJggg==";

var anchors, userIDs;
if (document.domain == "community.ebay.de") {
    anchors = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
        "//td[position()=2]//a[starts-with(@href, " +
        "'javascript:idm_showIdCard') or starts-with(@href, " +
        "'javascript: idm_showIdCard') or contains(@href, " +
        "'http://community.ebay.de/profile.htm?nickname=')]/ancestor::td[1]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var userIDs = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
        "//td[position()=2]//a[starts-with(@href, " +
        "'javascript:idm_showIdCard') or starts-with(@href, " +
        "'javascript: idm_showIdCard') or contains(@href, " +
        "'http://community.ebay.de/profile.htm?nickname=')][position() = 1]" +
        "/@title", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
} else {
    anchors = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
        "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]/ancestor::td[1]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    userIDs = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
        "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]/" +
        "following-sibling::a[1]/text()", document.body, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
var tld = document.domain.split(".ebay.")[1];
var be = "";
if (tld == "be") {
    be = "." + document.domain.split(".ebay.")[0].split("-")[1];
}
for (var i = 0; i < anchors.snapshotLength; i++) {
    anchors.snapshotItem(i).appendChild(createImg("history", i));
    if (document.domain == "community.ebay.de") {
        anchors.snapshotItem(i).setAttribute("style", "white-space: nowrap");
    }
}

function createImg(type, ID) {
    var img =  document.createElement("img");
    switch (type) {
        case "history":
            img.src = QUOPNG;
            img.title = "UserID History";
            img.id = "his" + ID;
            if (document.domain == "community.ebay.de") {
                img.setAttribute("style", "vertical-align: middle;" +
                    "padding-left: 1px; padding-right: 1px; cursor: pointer; ");
            } else {
                img.setAttribute("style", "position: relative; top: 4px; " +
                    "padding-left: 1px; cursor: pointer;");
            }
            img.addEventListener('click',
                function(event) {
                    showUserIDHistory(event);
                }, false // true doesn't work in Opera
            );
            return img;
        default:
            return null;
    }
}

function showUserIDHistory(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    var item = userIDs.snapshotItem(ID);
    var userID;
    if (document.domain == "community.ebay.de") {
        userID = item.value;
    } else {
        userID = item.data;
    }
    window.open("http://contact" + be + ".ebay." + tld + "/ws/eBayISAPI.dll?" +
        "ReturnUserIdHistory&requested=" + userID);
    // GM_openInTab doesn't work in Opera
}

})(); // function wrapper for Opera