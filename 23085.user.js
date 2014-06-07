// ==UserScript==
// @name           bitHUmen skipXXX
// @namespace      bithuscipts
// @description    check all checkboxes browse form, except the XXX
// @include        http://bithumen.ath.cx/browse.php
// ==/UserScript==

var a, it, chk;
a = document.evaluate(
    "//input[@type='checkbox']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < a.snapshotLength; i++) {
    it = a.snapshotItem(i);
    chk = ( it.name != 'c30' && it.id != 'onlytitle' );
    it.checked = chk;
}