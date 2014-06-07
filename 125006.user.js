// ==UserScript==
// @name	   FurkExt_Mandy
// @description    Furk direct download by Mandy Magic
// @include        http://www.furk.net/*
// @include        https://www.furk.net/*
// @include	   http://furk.net/*
// @include	   https://furk.net/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


			
var lianks = document.evaluate(
"//a[contains(@href, '/r/')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace("/r/","/R/")
}