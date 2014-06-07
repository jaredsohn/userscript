// Edited by Eduard Fornés Català & Luis M Mahiques Carrasco
// based on
// Written by Jeffrey Sharkey
// http://www.jsharkey.org/
// Copyleft, released under GPL

// ==UserScript==
// @name          Two column Youtube 
// @namespace     http://laforca.info
// @description   Places Youtube search results into two columns
// @include       http://*.youtube.*/*
// ==/UserScript==

var table = document.createElement("table");
var row = table.insertRow(0);
var left = row.insertCell(0);
var right = row.insertCell(1);

left.setAttribute("valign", "top");
right.setAttribute("valign", "top");

var links, link;
links = document.evaluate("//div[@class='vlcell']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var half = links.snapshotLength / 2;
var parent;
for(var i = 0; i < links.snapshotLength; i++) {
	link = links.snapshotItem(i);
	link.parentNode.parentNode.appendChild(table);
	if(i < half)
		left.appendChild(link);
	else
		right.appendChild(link);
}


