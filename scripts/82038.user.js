// ==UserScript==
// @name           phpMyAdmin Data-Dictionary PageBreaks Remover
// @namespace      http://userscripts.org/users/195705
// @description    Remove pagebreak div marks on phpMyAdmin Data Dictionary page to save spaces while printing out.
// @include        *db_datadict.php*
// ==/UserScript==

//<div style="page-break-before: always;">
var attrvalue = "page-break-before: always;";

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@style='"+attrvalue+"']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.style.pageBreakBefore = "avoid";
}

var printBtn = document.getElementById('print');
printBtn.className = "print-ignore";

/*thanks to: 
http://www.firefox.net.cn/dig/patterns/match-attribute.html
http://www.firefox.net.cn/dig/patterns/set-style.html
*/
