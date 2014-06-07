// ==UserScript==
// @name        Peterborough Telegraph Unbuggerer
// @namespace   none
// @description Fix all the Peterborough Telegraph annoyances (ads, social media nonsense, animations)
// @include     http://www.peterboroughtoday.co.uk/*
// @version     1.0
// @grant       none
// ==/UserScript==

function HideSection(xpath)
{
var snapResults = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.display="none"; 
}
}

function ExpandSection(xpath)
{
var snapResults = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.width="100%"; 
}
}

// Everything uses horrible arbitrary IDs, would you expect anything different?

// TODO:
// - Stop the animated panels from animating

// Jobs
HideSection("//div[@class='g324 flt-r m20-r clear-r']");

// Tweets
HideSection("//div[@class='m20-b']");

// Carousel of Doom
//HideSection("//div[@class='g324 flt-r m20-r']");

// Expand the body
//ExpandSection("//div[@class='g648']");