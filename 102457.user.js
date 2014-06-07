// ==UserScript==
// @name FFXIAH.com Wiki Link
// @namespace http://
// @description replaces links to gamersescape.com wiki with links to the ffxiclopedia wiki
// @include http://www.ffxiah.com*
// ==/UserScript==

var links = document.evaluate(
"//a[contains(@href, 'ffxi.gamerescape.com/wiki')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; i++) {
var link = links.snapshotItem(i);
link.href = link.href.replace("ffxi.gamerescape.com","wiki.ffxiclopedia.org")
}
