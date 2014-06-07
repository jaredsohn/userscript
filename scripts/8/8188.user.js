// eBay Forum Link Reset user script
// version 0.3.9
// 2008-10-16
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
// @name          eBay Forum Link Reset
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/8188
// @include       http://forums*.ebay.tld/*thread.jspa?*
// @include       http://answercent*.ebay.tld/*
// @include       http://community.ebay.de/*
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

const anon = true;
const anonURL = "http://anonymouse.org/cgi-bin/anon-www.cgi/";

if (document.domain == "community.ebay.de") {
    
    function resetJSLink(elem) {
        var strings = elem.href.split("'");
        var para = document.evaluate("//p[@class='idm-messagecenter-pinboard']",
            document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
        var userID = para.innerHTML.split(",")[0].split("Hallo ")[1];
        if (anon && userID != null) {
            elem.href = anonURL +
                "http://community.ebay.de/profile.htm?nickname=" +
                strings[3];
        } else {
            elem.href = "http://community.ebay.de/profile.htm?nickname=" +
                strings[3];
        }
    }
    
    function setPrivateLink(elem) {
        var parent = elem.parentNode;
        var a = document.createElement("a");
        a.href = "http://feedback.ebay.de/ws/eBayISAPI.dll?ViewFeedback2&" +
            "userid=" + parent.title.split("#")[0];
        a.innerHTML = "privat";
        newText = document.createTextNode(") ");
        parent.replaceChild(newText, elem);
        parent.insertBefore(a, newText);
        parent.insertBefore(document.createTextNode(" ("), a);
    }
    
    var anchors = document.evaluate("//a[contains(@href, " + 
        "'idm_showIdCard')]", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < anchors.snapshotLength; i++) {
        resetJSLink(anchors.snapshotItem(i));
    }
    
    anchors = document.evaluate("//a[contains(@href, " +
        "'http://community.ebay.de/profile.htm?nickname=')]" +
        "/following-sibling::text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < anchors.snapshotLength; i++) {
        if (anchors.snapshotItem(i).data.indexOf("(privat)") > -1) {
            setPrivateLink(anchors.snapshotItem(i));
        }
    }
    
    anchors = document.evaluate("//a[@class='idm-threadname']", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < anchors.snapshotLength; i++) {
        a = anchors.snapshotItem(i);
        a.innerHTML = a.title;
    }
    if (document.cookie.indexOf("idm-firstpost-trigger") < 0) {
        document.cookie = "idm-firstpost-trigger=idm-closed;";
    }
    if (document.cookie.indexOf("idm-description-trigger") < 0) {
        document.cookie = "idm-description-trigger=idm-closed;";
    }
    return; 
}   
    
var tld = document.domain.split("ebay.")[1];
var be = "";
if (tld == "be") {
    be = "." + document.domain.split(".ebay.")[0].split("-")[1];
}
var myworld = document.evaluate("//a[contains(@href, " + 
    "'contactUser.jspa?requested=')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var feedback = document.evaluate("//a[contains(@href, " + 
    "'viewFeedback.jspa?userid=')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var node;
var newNode;
var uid, score;
for (var i = 0; i < myworld.snapshotLength; i++) {
    node = myworld.snapshotItem(i);
    uid = node.innerHTML;
    newNode = document.createElement("a");
    newNode.href = "http://myworld" + be + ".ebay." + tld + "/" + uid;
    newNode.innerHTML = uid;
    node.parentNode.replaceChild(newNode, node);
}
for (var i = 0; i < feedback.snapshotLength; i++) {
    node = feedback.snapshotItem(i);
    uid = node.href.split("userid=")[1];
    score = node.innerHTML;
    newNode = document.createElement("a");
    newNode.href = "http://feedback" + be + ".ebay." + tld +
        "/ws/eBayISAPI.dll?ViewFeedback2&userid=" + uid;
    newNode.innerHTML = score;
    node.parentNode.replaceChild(newNode, node);
}

})(); // function wrapper for Opera