// ==UserScript==
// @name           Greasemungo Cities Counter
// @namespace      kenmooda@gmail.com
// @description    Popmundo: On bookmarks page, summarize how many people are in each city (2008-04-24)
// @include        http://www*.popmundo.com/Common/Telephone.asp?action=BookMarks
// @include        http://www*.popmundo.com/Common/Telephone.asp?action=DeleteBM&*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Cities Counter
//    Copyright (C) 2008  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

var CITIES_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div[2]/table[1]/tbody/tr/td[2]";
var TABLE_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div[2]/table[1]";

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function summarizeByCities(nodes) {
	var cityMap = [];

	// Loop, but skip header
	for (var i = nodes.snapshotLength - 1; i > 0; i--) {
		var node = nodes.snapshotItem(i);
		var city = node.textContent.replace(/^(\n|\s)*/, "").replace(/(\n|\s)*$/, "");	
	
		if (cityMap[city]) {
			cityMap[city]++;
		}
		else {
			cityMap[city] = 1;
		}	
	}
	
	return cityMap;
}

function convertMapToArray(aMap) {
	var arr = [];
	var i = 0;

	for (var k in aMap) {
		arr[i++] = { key: k, value: aMap[k] };
	}
	
	return arr;
}

function citySort(a, b) {
	if (a.value == b.value) {
		return a.key.localeCompare(b.key);
	}
	else {
		return b.value - a.value;
	}
}

function addRowsToBody(tbody, cityArr) {
	for (var i = 0; i < cityArr.length; i++) {
		var td1 = document.createElement("td");
		td1.appendChild(document.createTextNode(
			"\u00a0\u00a0\u00a0"+ cityArr[i].key));
		
		var td2 = document.createElement("td");
		td2.appendChild(document.createTextNode(
			cityArr[i].value));
		
		var tr = document.createElement("tr");
		tr.appendChild(td1);
		tr.appendChild(td2);
	
		if (i % 2 == 0) {	
			tr.className = "DarkColumnHL";
		}
	
		tbody.appendChild(tr);
	}
}

function copyAttributes(toNode, fromNode) {
	var attributes = fromNode.attributes;

	for (i = 0; i < attributes.length; i++) {
		var attr = attributes.item(i);
		toNode.setAttribute(attr.name, attr.value);
	}
}

function insertAsTable(cityArr) {
	// Create table
	var tbody = document.createElement("tbody");
	addRowsToBody(tbody, cityArr);
	
	var table = document.createElement("table");
	table.appendChild(tbody);
	
	var targetTable = xpathNode(TABLE_XPATH);
	copyAttributes(table, targetTable);
	
	targetTable.parentNode.insertBefore(document.createElement("hr"), targetTable.nextSibling);
	targetTable.parentNode.insertBefore(table, targetTable.nextSibling);
	targetTable.parentNode.insertBefore(document.createElement("hr"), targetTable.nextSibling);
}

// Main
var cityArr = convertMapToArray(summarizeByCities(xpathNodes(CITIES_XPATH)));

// Jump out if we have nothing.
if (cityArr.length == 0) { return; }

// Sort and add as table.
cityArr.sort(citySort);
insertAsTable(cityArr);

// EOF