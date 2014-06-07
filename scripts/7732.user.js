// Written by Jeffrey Sharkey
// http://www.jsharkey.org/
// Copyleft, released under GPL

// ==UserScript==
// @name          Two column Google 
// @namespace     http://www.google.com/
// @description   Places Google search results into two columns
// @include       http://www.google.*/search*
// ==/UserScript==

var table = document.createElement("table");
var row = table.insertRow(0);
var left = row.insertCell(0);
var right = row.insertCell(1);

left.setAttribute("valign", "top");
right.setAttribute("valign", "top");

var links, link;
links = document.evaluate("//li[@class='g'] | //div[@class='g']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var half = links.snapshotLength / 2;
var parent;
for(var i = 0; i < links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	link.parentNode.appendChild(table);
	if(i < half)
		left.appendChild(link);
	else
		right.appendChild(link);
}


