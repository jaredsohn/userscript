// ==UserScript==
// @name	   Link Modifier_Mandy-FB.mebrowse.php
// @description    Furk direct download by Mandy Magic
// @include        *

// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


			
var lianks = document.evaluate(
"//a[contains(@href, 'http://')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace("http://fb.me/browse.php?u=http://","")
}