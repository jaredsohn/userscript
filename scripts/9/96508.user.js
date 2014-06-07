// ==UserScript==
// @name           Žmogai 24
// @namespace      http://userscripts.org/users/288926
// @include        http://www.15min.lt/
// Author: http://twitter.com/Dariu5
// ==/UserScript==




var skaicius=0;
var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[contains(@class,'zmones24')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
   
thisDiv.parentNode.removeChild(thisDiv);
skaicius++;
}

allDivs = document.evaluate(

	"//div//a[contains(@href,'http://www.15min.lt/naujiena/zmones/')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
   

thisDiv.parentNode.style.display = "none";

skaicius++;
}

allDivs = document.evaluate(

	
	"//div[@class=' article-extract article-extract-full row-3 df-left-in-row df-right-in-row df-top-in-row df-bottom-in-row left bg-pilkas img-brd-0']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
   
thisDiv.parentNode.removeChild(thisDiv);
skaicius++;
}

allDivs = document.evaluate(
	"//div[contains(@class,'df-container-skin-zmones')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
   
thisDiv.parentNode.removeChild(thisDiv);
skaicius++;
}

 //alert('Užblokuota: '+ skaicius);