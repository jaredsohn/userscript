// ==UserScript==
// @name          Finalgear Forum Adjustments
// @namespace     http://forums.finalgear.com
// @description   Adjust Finalgear's forum to stop shouting.
// @include       http://forums.finalgear.com/*
// ==/UserScript==

var allCSS, thisCSS;
allCSS=document.evaluate("//*[@class='tcat']|//*[@class='alt2']|//p|//td|//th|//li|//strong|//textarea|//*[@class='bginput']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allCSS.snapshotLength; i++) {
	thisCSS=allCSS.snapshotItem(i);
	thisCSS.style.fontSize="12px";
}

allCSS=document.evaluate("//*[@class='bigusername']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allCSS.snapshotLength; i++) {
	thisCSS=allCSS.snapshotItem(i);
	thisCSS.style.fontSize="14px";
}
