// ==UserScript==
// @name           hatene diary archive + hatena bookmark
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://d.hatena.ne.jp/*/archive*
// ==/UserScript==

var e = document.evaluate('//li[contains(@class,"archive-section")]/a[not(@class)]',document,null,7,null);
for(var i=0;i<e.snapshotLength;i++) {
  var img = document.createElement("img");
  img.src = "http://b.hatena.ne.jp/entry/image/" + e.snapshotItem(i).href;
  var link = document.createElement("a");
  link.href = "http://b.hatena.ne.jp/entry/" + e.snapshotItem(i).href;
  link.appendChild(img);
  e.snapshotItem(i).parentNode.insertBefore(link,e.snapshotItem(i).nextSibling);
}