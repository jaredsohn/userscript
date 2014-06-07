// ==UserScript==
// @name           Ilbe TodayHomor Link
// @author         Anonymous_6e3
// @include        http://*.ilbe.com/*
// ==/UserScript==

var link = document.evaluate("//a[contains(@href, 'todayhumor.co.kr')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < link.snapshotLength; i++) {
    var thisLink = link.snapshotItem(i); 
    thisLink.href = "http://hidemyass.com/?" + encodeURIComponent(thisLink.href);
}