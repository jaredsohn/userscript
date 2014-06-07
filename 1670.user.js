// ==UserScript==

// @name           StockCharts (ver. 0.0.3)

// @namespace      http://larytet.sf.net/myscripts

// @description    removes green box at the top of the screen
// @include        http://*stockcharts.com/*

// ==/UserScript==



var all, element, elementText;



GM_log("Grease monkey script for Stockcharts");



// discover all tags 

all = document.evaluate(
  "//*[@class='sc2PromoHeader' or @class='banner-header' or @class='sc2PromoFooter' or @class='footer']",
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < all.snapshotLength; i++) 

{
  element = all.snapshotItem(i);

  GM_log("element = "+element+" removed");

  element.parentNode.removeChild(element);

}

