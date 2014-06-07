// ==UserScript==
// @name        Ricardo Bewertungen Artikel mit Link
// @namespace   http://lbreuss.ch/
// @description Die Artikelnummern auf der Bewertungsseite werden mit Link versehen.
// @include     *://www.ricardo.ch/online-shop/*
// @include     *://*.ricardo.ch/accdb/ViewUser.asp*
// @version     1.1
// @grant       none
// Credits go to yagi, author of "Ricardo Evaluation Links".
// ==/UserScript==

document.getElementsByXPath = function(xpath) {
  var xpathResults = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var items = [];
  for (var i = 0; i < xpathResults.snapshotLength; i++) {
    items.push(xpathResults.snapshotItem(i));
  }
  return items;
}

// XPath, get the TD elements with the article number inside from the appropriate table
var tds = document.getElementsByXPath('//table[@class="table userRatings"]/tbody/tr/td[4]');
for(var i = 0; i<tds.length; ++i) {
  var td = tds[i];
  var article = td.innerHTML.trim();
  // replace the plain text article number with a link to the article
  td.innerHTML = '<a href="http://www.ricardo.ch/v/an'+article+'">'+article+'</a>';
}
