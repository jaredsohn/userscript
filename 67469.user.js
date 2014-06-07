// ==UserScript==
// @name          YouTube JXS
// @namespace     http://userscripts.org/users/jaxo
// @description   Bypass age verification (no account required), auto-clear viewing history, hide front-page feeds, show blocked comments
// @include       http://www.youtube.com/*
// ==/UserScript==


var curl = unescape(location.href);

// Clear viewing history

var req = new XMLHttpRequest();
req.open("GET", "http://www.youtube.com/clear_watch_history", false);
req.send(null);

// Hide front-page feeds

var allItems = document.evaluate("//div[contains(@id,'feed_')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i < allItems.snapshotLength; i++)
    allItems.snapshotItem(i).style.display = "none";

// Play age restricted videos

if (curl.indexOf("verify_age") > -1)
   document.getElementById("verify-age").innerHTML = "<h3>(Playing age restricted video)</h3><object><embed width='640' height='385' allowfullscreen='true' src='http://www.youtube.com/v/"+curl.substr(curl.indexOf("?v=")+3,11)+"&fmt=18&fs=1&autoplay=1'></embed></object>";
document.cookie = "is_adult=1; expires=Mon, 01 Jan 2099 00:00:00 GMT"; // if registered member

// Show blocked comments

allItems = document.evaluate("//div[contains(@id,'comment_body_')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i < allItems.snapshotLength; i++)
    allItems.snapshotItem(i).style.display = "block";