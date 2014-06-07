// ==UserScript==
// @name       Tonedøv
// @version    0.2
// @description  Fjern artikler om Tone Damli på Dagbladet.no
// @match      http://www.dagbladet.no/*
// ==/UserScript==

for (var a=document.evaluate("//a[contains(@href, 'tone_damli') or contains(@href, 'tone_og_aksel')]/ancestor::div[contains(@class,'ddCell')][1]",
                             document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),b=a.snapshotLength-1; b>=0;b--) {
    var c=a.snapshotItem(b);
    c.parentNode.removeChild(c)
}