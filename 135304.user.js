// ==UserScript==
// @name	 NoFFNCimages
// @namespace	
// @description	Removes fanfiction.net cover images
// @include	 http://*fanfiction.net*
// @exclude
// @version	 1.1
// ==/UserScript==

// based off the "remove facebook ads" userscript
// so, credit to them: http://userscripts.org/scripts/show/13650

var allAds, thisAd;
var logging = true;
allAds = document.evaluate("//img[contains(@class, 'lazy cimage')] | //img[contains(@class,'cimage')]",
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
null);

for(var i=0; i < allAds.snapshotLength; i++ ){
thisAd = allAds.snapshotItem(i);
thisAd.style.display = "none";
thisAd.parentNode.removeChild(thisAd);	
}