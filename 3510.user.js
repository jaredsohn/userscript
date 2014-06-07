// ==UserScript==
// @name          craigslist home page links to rss
// @namespace     http://www.japaninyourpalm.com
// @description   change all craigslist home page links to RSS links.
// @include       http://*.craigslist.org/
// @include       http://*.craigslist.com/

// ==/UserScript==

var sections = Array("community", "personals", "housing", "for sale", "services", "jobs", "gigs");


// July 6, 2008 updated
var craigTitle = document.evaluate("//div[@id='logo']/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
var rssLink = document.createElement('a');
rssLink.href = 'http://www.craigslist.org/about/rss.html';
var rssBoldElem = document.createElement('b');
rssBoldElem.style.color='#FF6600';
var rssBoldText = document.createTextNode('/RSS');
rssBoldElem.appendChild(rssBoldText);
rssLink.appendChild(rssBoldElem);
craigTitle.parentNode.insertBefore(rssLink, craigTitle.nextSibling);

for (var i=0; i<sections.length; i++) {
   var rssSection = document.evaluate("//table[@summary='"+sections[i]+"']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   rssSection.style.border = '2px #FF6600 solid';
}

for (var i=0; i<sections.length; i++) {
   var links = document.evaluate("//table[@summary='"+sections[i]+"']//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
   for (var j = 0; j < links.snapshotLength; j++) {
      link = links.snapshotItem(j);
      link.href = link.href + 'index.rss';
   }
}