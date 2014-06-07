// ==UserScript==
// @name           notes popup
// @namespace      mansionhillvets.co.uk
// @description    pop up for notable conditions
// @include        /^https://www\.vet-one[0-9]+\.net:18443/[a-z]+/servlet/GemVetOne\?module=GemAnimalManage&method=doAnimalOverview&id=[0-9]+$/
// @include        /^http://www\.vet-one[0-9]+\.net:8080/[a-z]+/servlet/GemVetOne\?module=GemAnimalManage&method=doAnimalOverview&id=[0-9]+$/
// ==/UserScript==

textNodes = document.evaluate(
		  "/html/body/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td/table/tbody/tr[15]/td[1]/strong",
		  document,
		  null,
		  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		  null);
var node = textNodes.snapshotItem(0);
if(node.innerHTML=="Notable Conditions"){
	textNodes = document.evaluate(
			  "/html/body/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td/table/tbody/tr[15]/td[2]",
			  document,
			  null,
			  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			  null);
	if(textNodes.snapshotItem(0).innerHTML!="")alert(textNodes.snapshotItem(0).innerHTML.replace(/<br>/g, "\n"));
}
