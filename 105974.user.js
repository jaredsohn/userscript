// ==UserScript==
// @name      いい…
// @namespace http://twitter.com/cxx
// @include   http://www.facebook.com/plugins/like.php?*
// @version   1.2.1
// ==/UserScript==

var texts = document.evaluate('.//text()', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0, len = texts.snapshotLength; i < len; i++) {
    var t = texts.snapshotItem(i);
    t.data = t.data.replace('いいね！', 'いい…');
}
