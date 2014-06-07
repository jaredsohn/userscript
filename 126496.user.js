// ==UserScript==
// @name           Digi-Key Price Break Calculator
// @namespace      dojoe.net
// @include        http://search.digikey.com/*/products/*
// @include        http://www.digikey.*/product-detail/*
// @version        1.1
// ==/UserScript==

var rows = document.evaluate("//table[@id='pricing']/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (rows.snapshotLength < 3)
	return;

var node = document.createElement("TH");
node.textContent = "Max";
rows.snapshotItem(0).appendChild(node);

for (var i = 1; i < rows.snapshotLength - 1; i++)
{
	var thisUnitPrice = rows.snapshotItem(i).getElementsByTagName('TD')[1].textContent.replace(',', ''),
		nextTotalPrice = rows.snapshotItem(i + 1).getElementsByTagName('TD')[2].textContent.replace(',', '');
	node = document.createElement("TD");
	node.textContent = Math.floor(nextTotalPrice / thisUnitPrice);
	node.setAttribute('align', 'right');
	rows.snapshotItem(i).appendChild(node);
}