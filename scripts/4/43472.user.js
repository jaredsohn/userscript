// A script to remove advertisements from Baidu search result
// version 0.1 BETA!
// 2009-02-27
// 2009-07-10
// Copyright (c) 2009, stardust@nsfocus.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Baidu Advertisements Remover
// @namespace     http://www.baidu.com/
// @description   remove advertisement links from Baidu search result
// @include       http://www.baidu.com/*
// @exclude       
// ==/UserScript==

// remove right column ads
var allRightAds, rightAd;
allRightAds = document.evaluate(
    "//table[@align='right']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allRightAds.snapshotLength; i++) {
    rightAd = allRightAds.snapshotItem(i);
    rightAd.parentNode.removeChild(rightAd);
}

// remove left column ads
var allLinks, thisLink;
var adcount = 0;
allLinks = document.evaluate(
    "//a[@class='m']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.text == "推广") {
    	  br = thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling
    	  br.parentNode.removeChild(br)
    	  thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode.parentNode);
    	  adcount++;
    }
}

allTables = document.evaluate(
    "//table[@bgcolor='#f5f5f5']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTables.snapshotLength; i++) {
    thisTable = allTables.snapshotItem(i);
    thisTable.parentNode.removeChild(thisTable)
    adcount++;
}

// add information about purged ads
if (adcount > 0) {
    var allTds, rightTd;
    allTds = document.evaluate(
        "//td[@align='right']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allTds.snapshotLength; i++) {
        rightTd = allTds.snapshotItem(i);
        if (rightTd.innerHTML.indexOf('百度一下') != -1) {
            rightTd.innerHTML += '清除广告链接' + adcount + '条';
        }
    }
}

// if current page is full of ads, load the next page
if (window.location.href.indexOf('&rn=') != -1) {
    rn = window.location.href.match(/&rn=(\d+)&/)[1];
} else {
    rn = 10
}

if (rn <= adcount) {
    var allLinkDivs, linkDiv;
    allLinkDivs = document.evaluate(
    "//div[@class='p']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    for (var i = 0; i < allLinkDivs.snapshotLength; i++) {
        linkDiv = allLinkDivs.snapshotItem(i);
        window.location.href = linkDiv.lastChild.href;
    }
}