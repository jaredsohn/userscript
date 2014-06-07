// ==UserScript==
// @name VcdQuality.com Direct Image
// @namespace http://
// @include http://eksiduyuru.com*
// @include http://www.eksiduyuru.com*
// ==/UserScript==

var lianks = document.evaluate(
"//a[contains(@href, 'index.php?m=a&s=0')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace("index.php?m=a&s=0","http://www.eksisozluk.com//sub_etha.asp?name=eksiduyuru")
}