// ==UserScript==
// @name        GetIcon
// @namespace   http://userscripts.org/users/470857
// @include     http://android.d.cn/*
// @version     1.0
// ==/UserScript==

var allAds, thisAd;
var logging = true;
allAds = document.evaluate("//span[contains(@class, 'yingyong')]",
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
null);

for(var i=0; i < allAds.snapshotLength; i++ ){
thisAd = allAds.snapshotItem(i);
thisAd.style.display = "none";
}