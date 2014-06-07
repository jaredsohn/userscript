// ==UserScript==
// @name           Youtube HD links append
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Appends all Youtube links with hd=1
// @include        http://*
// ==/UserScript==


var lianks = document.evaluate(
"//a[contains(@href, 'watch?v=')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href += "&hd=1";
}



var itemsai = document.evaluate(
"//embed[contains(@src, 'http://www.youtube.com/')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < itemsai.snapshotLength; i++) {
var sitas = itemsai.snapshotItem(i);
sitas.src += "&hd=1";
}