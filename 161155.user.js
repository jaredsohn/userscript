// ==UserScript==
// @name       Fjern VG+ artikler
// @version    0.1
// @description  Fjern VG+ artikler fra www.vg.no
// @match      http://www.vg.no/*
// ==/UserScript==

for (var a=document.evaluate("//a[contains(@href, 'pluss.vg.no')]/ancestor::div[contains(@class,'article-extract')][1]",
                             document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),b=a.snapshotLength-1; b>=0;b--) {
    var c=a.snapshotItem(b);
    c.parentNode.removeChild(c)
}