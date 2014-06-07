// ==UserScript==
// @name           Renaming articles.2
// @include        http://www.iop.org*
// ==/UserScript==

var links, authors, titles, i, a, b, c;
links=document.evaluate("//a[contains(@title, 'Acrobat')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
authors=document.evaluate("//em[@class='tocAuth']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
titles=document.evaluate("//strong[@class='tocTitle']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < titles.snapshotLength; i++) {
  a = links.snapshotItem(i);
  b = authors.snapshotItem(i);
  c = titles.snapshotItem(i);
  a.innerHTML = b.innerHTML + " - " + c.innerHTML;
}
