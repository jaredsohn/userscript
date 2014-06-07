// ==UserScript==
// @name       PoE_Goods_currency_display
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://poe.xyz.is/search/*
// @copyright  2012+, You
// ==/UserScript==

var allData,thisData; 

allData = document.evaluate('//tbody[@data-buyout]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var i=0;
for (i;i<allData.snapshotLength;i++) { 
    var thisData = allData.snapshotItem(i); 
    var buyout = thisData.getAttribute("data-buyout");
    var t = document.createTextNode(buyout);
    
    var thisChild = thisData.childNodes[3].childNodes[3].childNodes[1].childNodes[1];
    thisChild.replaceChild(t,thisChild.childNodes[0]);
    
}