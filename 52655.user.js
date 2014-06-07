// ==UserScript==
// @name           swampadsremover
// @namespace      my
// @include        *forum.swamp.ru*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
   "//span[@class='genmed']",//"//script[@src='http://www.swamp.ru/expb/1/']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);
for (var i = 1; i < 2; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);
}