// ==UserScript==
// @name           Delphiforums: Extend Search Timeframe
// @namespace      http://www.nyboria.de
// @description    Adds the options of searching a full year back and 'from the beginning'.
// @include        http://forums.delphiforums.com/n/find/find.asp*
// ==/UserScript==


var threeMonths = document.evaluate("//option[@value='93']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = threeMonths.snapshotLength - 1; i >= 0; i--) {
	var elm = threeMonths.snapshotItem(i);
	var anyTime = document.createElement('option');
	anyTime.value = '10000';
	anyTime.appendChild(document.createTextNode('Any Time'));
	elm.parentNode.insertBefore(anyTime, elm.nextSibling);
	var oneYear = document.createElement('option');
	oneYear.value = '365';
	oneYear.appendChild(document.createTextNode('One Year Ago'));
	elm.parentNode.insertBefore(oneYear, elm.nextSibling);
}
