// ==UserScript==
// @name           Remove Scrawlings
// @namespace      http://coyotes.org/greasemonkey/scripts
// @include        http://belfrycomics.net/view/subscriptions
// ==/UserScript==
//div class="board"
var scrawlings = document.evaluate('//div[@class="board"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < scrawlings.snapshotLength; i++) {
    scrawlings.snapshotItem(i).parentNode.removeChild(scrawlings.snapshotItem(i));
}