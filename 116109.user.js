// ==UserScript==
// @name           Remove Twitter Trends and Recommendations
// @namespace      tipmap.org
// @description    Removes Twitter Trends and "who to Follow" from the Sidebar. Works, as of 10/22/12
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

window.setTimeout(function() {var evilDiv, thisDiv;
evilDiv = document.evaluate("//div[@class='trends-inner']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < evilDiv.snapshotLength; i++) {
    thisDiv = evilDiv.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
var evilh, thish;
evilh = document.evaluate("//div[@class='user-rec-inner ']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thish = evilh.snapshotItem(0);
thish.parentNode.removeChild(thish);
}, 5000);