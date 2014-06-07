// eBay New Community Me Import user script
// version 0.1.3
// 2008-05-13
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
// @name          eBay New Community Me Import
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/22934
// @include       http://community.ebay.de/forum/ebay/thread.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

var anchors = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
    "//td[position()=2]//a[starts-with(@href, " +
    "'javascript:idm_showIdCard') or starts-with(@href, " +
    "'javascript: idm_showIdCard') or contains(@href, " +
    "'http://community.ebay.de/profile.htm?nickname=')]//ancestor::td[1]",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var userIDs = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
    "//td[position()=2]//a[starts-with(@href, " +
    "'javascript:idm_showIdCard') or starts-with(@href, " +
    "'javascript: idm_showIdCard') or contains(@href, " +
    "'http://community.ebay.de/profile.htm?nickname=')][position() = 1]" +
    "/ancestor::span/@title", document.body, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var me = new Array(), index, uid, link, anchor, span, anchors2 = new Array();
for (var i = 0; i < userIDs.snapshotLength; i++) {
    uid = userIDs.snapshotItem(i).value.split("#")[0];
    index = checkList(me, uid);
    if (index < 0) {
        me.push(new Array(uid, false, false, false, false));
    }
}
var regExpMe = /http:\/\/pics\.ebaystatic\.com\/aw\/pics\/de\/aboutme-small\.gif/;
var regExpChangeID = /http:\/\/pics\.ebaystatic\.com\/aw\/pics\/de\/icon\/iconChangeID_20x20\.gif.*a href="http:\/\/contact\.ebay\./;
var regExpNewID = /http:\/\/pics\.ebaystatic\.com\/aw\/pics\/de\/icon\/iconNewId_16x16\.gif.*a href="http:\/\/contact\.ebay\./;
for (var i = 0; i < anchors.snapshotLength; i++) {
    anchor = anchors.snapshotItem(i);
    span = document.createElement("span");
    span.setAttribute("class", "encmi");
    span.innerHTML = "Pr&uuml;fe...";
    anchor.insertBefore(span, anchor.lastChild);
    anchor.setAttribute("style", "white-space: nowrap");
}
for (var i = 0; i < me.length; i++) {
    uid = me[i][0];
    GM_xmlhttpRequest({
        XHRindex: i,
        method: 'GET',
        url: 'http://feedback.ebay.de/ws/eBayISAPI.dll?ViewFeedback2&userid='
            + uid,
        onload: function(responseDetails) {
            if (responseDetails.status == 200) {
                var matches = regExpMe.exec(responseDetails.responseText);
	            if (matches != null) {
	                me[this.XHRindex][1] = true;        
	            }
	            matches = regExpChangeID.exec(responseDetails.responseText);
	            if (matches != null) {
	                me[this.XHRindex][2] = true;        
	            }
	            matches = regExpNewID.exec(responseDetails.responseText);
	            if (matches != null) {
	                me[this.XHRindex][3] = true;        
	            }
	            me[this.XHRindex][4] = true;
	            var all = true;
	            for (var i = 0; i < me.length; i++) {
	                all = all && me[i][4];
	            }
	            if (all) {
	                aftermath();
	            }
	        }
        }
    });
}

function aftermath() {   
    for (var i = 0; i < anchors.snapshotLength; i++) {
        uid = userIDs.snapshotItem(i).value.split("#")[0];;
        anchor = document.evaluate("./span[@class = 'encmi']",
            anchors.snapshotItem(i), null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        anchor.innerHTML = "";
        index = checkList(me, uid);
        if (me[index][3]) {
            anchor.insertBefore(createImg("newID"), anchor.lastChild);
        }
        if (me[index][2]) {
            link = document.createElement("a");
            link.href = "http://contact.ebay.de/ws/eBayISAPI.dll?" +
                "ReturnUserIdHistory&requested=" + uid;
            link.appendChild(createImg("changeID"));
            anchor.insertBefore(link, anchor.lastChild);
        }
        if (me[index][1]) {
            link = document.createElement("a");
            link.href = "http://members.ebay.de/ws/eBayISAPI.dll?ViewUserPage" +
                "&userid=" + uid;
            link.appendChild(createImg("me"));
            anchor.insertBefore(link, anchor.lastChild);
        }
    }
}

function createImg(type) {
    var img =  document.createElement("img");
    switch (type) {
        case "me":
            img.src = "http://pics.ebaystatic.com/aw/pics/de/aboutme-small.gif";
            img.title = "Mich-Seite";
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 1px; padding-right: 1px; cursor: pointer;");
            return img;
        case "changeID":
            img.src = "http://pics.ebaystatic.com/aw/pics/de/icon/iconChange" +
                "ID_20x20.gif";
            img.title = "Neuer eBay-Mitgliedsname";
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 1px; padding-right: 1px; cursor: pointer;");
            return img;
        case "newID":
            img.src = "http://pics.ebaystatic.com/aw/pics/de/icon/iconNewId" +
                "_16x16.gif";
            img.title = "Neues Mitglied";
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 1px; padding-right: 1px; position: relative; " +
                "top: -2px;");
            return img;            
        default:
            return null;
    }
}

function checkList(list, ID) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][0] == ID) {
            return i;
        }
    }
    return -1;
}

})();