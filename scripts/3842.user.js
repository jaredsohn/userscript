// ==UserScript==
// @name           Douban, Rewrite n people link
// @namespace      
// @description    Rewrite the n people link in my collection page to the page of people who collect the subject
// @include        http://www.douban.com/collection/*
// ==/UserScript==

function xpath(query) {
  return document.evaluate(query, document, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

alinks = xpath("//table/tbody/tr/td/p/a");
for(var i=0; i<alinks.snapshotLength; ++i)  {
  if (alinks.snapshotItem(i).href.match(/\/subject\/\d+/))
    alinks.snapshotItem(i).href += 'collections';
}