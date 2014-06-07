// ==UserScript==
// @name           DoneCard check avail
// @description    auto check avail on oss
// @include        *
// ==/UserScript==
var checks = document.evaluate("//a[contains(@onclick, 'CheckAvaibility')]",document,null,6,null);
for(var i=checks.snapshotLength-1; (check=checks.snapshotItem(i)); i--) {
unsafeWindow.CheckAvaibility(parseInt(check.getAttribute('onclick').match(/\d+/)[0]));
}