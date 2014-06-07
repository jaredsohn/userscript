// ==UserScript==
// @name           Just Testing
// @namespace      http:// 
// @description    test
// @include        http://www.iloveinterracial.com*
// @include        http://www.domywife.com*
// @include        http://www.personalclips.com*
// ==/UserScript==

var lianks = document.evaluate("//a[contains(@href, 'photos/display/pos_-')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var lianks2 = document.evaluate("//a[contains(@href, 'profiles/photos-display/pos_-')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace("photos/display/pos_-","displayimage.php?pid=")+'&fullsize=1'
}
for (var i = 0; i < lianks2.snapshotLength; i++){
var link2 = lianks2.snapshotItem(i);
link2.href = link.href.replace("profiles/photos-display/pos_-","displayimage.php?pid=")+'&fullsize=1'
}