// ==UserScript==
// @name        Google News: Hide social media links
// @namespace   none
// @description Hide sharing links from Google News
// @include     http*://news.google.*/*
// @version     1
// @grant       none
// ==/UserScript==

// Hide from page body
var snapResults = document.evaluate(".//td[@class='al-attribution-cell sharebar-cell']", document.body, null, 
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.visibility="hidden"; 
}

// Hide from sidebar
var snapResults = document.evaluate(".//div[@class='share-icons']", document.body, null, 
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.visibility="hidden"; 
}