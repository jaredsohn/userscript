// ==UserScript==
// @name           Greasemungo Data Dumper
// @namespace      kenmooda@gmail.com
// @description    Dump form data (2008-02-25)
// @include        http://*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Data Dumper
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

var path = document.location.pathname.toLowerCase();
GM_log("page="+ path);

DumpForms();


function DumpForms() {
	var formList = document.getElementsByTagName("form");
	
	if (formList.length > 0) {
		document.body.appendChild(document.createElement("hr"));
		
		var h1 = document.createElement("h1");
		h1.appendChild(document.createTextNode("document: "+ document.location.pathname));
		document.body.appendChild(h1);
		
		for (var i=0; i<formList.length; i++) {
			DumpFormElem(formList[i]);
	
			if (i+1 < formList.length) document.body.appendChild(document.createElement("hr"));
		}
	}
}


function DumpFormElem(formElem) {
	var elemList = formElem.elements;
	
	var rows = [];

	var ht2 = "form: "+ formElem.name;
	var h2 = makeElement("td", [
		makeElement("h2", [document.createTextNode(ht2)])
	]);

	var formAttr = DumpAttributes(formElem);

	var thr = makeElement("tr", [h2, makeElement("td", [formAttr])])
	thr.style.backgroundColor = "#EFFFEF";

	rows[0] = thr;
	
	
	for (var i=0; i<elemList.length; i++) {
		var elem = elemList.item(i);
		
		var cells = [];

		var ht = elem.tagName.toLowerCase() +": "+ elem.name;
		var h = makeElement("td", [
			makeElement("h3", [document.createTextNode(ht)])
		]);
		
		if (elem.hasAttributes()) {
			cells[cells.length] = DumpAttributes(elem);
		}	

		var data;
		switch (elem.tagName) {
			case "SELECT": 
				cells[cells.length] = DumpOptions(elem);
				break;
			default:
				// nothing
		}
		
		rows[i+1] = makeElement("tr", [h,	makeElement("td", cells)]);
		rows[i+1].style.backgroundColor = (i%2 == 0) ? "#EFFFEF" : "#DFFFDF";
	}
	
	var table = makeElement("table", [
		makeElement("tbody", rows)
	]);
	table.style.border = "1px solid #000000";
	
	document.body.appendChild(table);
}


function DumpOptions(elem) {
	var options = elem.options;
	
	var rows = [];

	for (var i=0; i < options.length; i++) {
		var opt = options.item(i);
		
		rows[i] = makeElement("tr", [
			makeElement("td", [
				document.createTextNode(opt.value)
			]),
			makeElement("td", [
				document.createTextNode(opt.text)
			])
		]);
		rows[i].style.backgroundColor = (i%2 == 0) ? "#EFEFFF" : "#DFDFFF";
	}
	
	var table = makeElement("table", [
		makeElement("thead", [
			makeElement("tr", [
				makeElement("th", [
					document.createTextNode("Value")
				]),
				makeElement("th", [
					document.createTextNode("Text")
				])
			])
		]),
		makeElement("tbody", rows)
	]);

	return table;
}


function DumpAttributes(elem) {
	var attributes = elem.attributes;
	
	var rows = [];

	for (var i=0; i < attributes.length; i++) {
		var opt = attributes.item(i);
		
		rows[i] = makeElement("tr", [
			makeElement("td", [
				document.createTextNode(opt.name)
			]),
			makeElement("td", [
				document.createTextNode(opt.value)
			])
		]);
		rows[i].style.backgroundColor = (i%2 == 0) ? "#FFEFEF" : "#FFDFDF";
	}
	
	var table = makeElement("table", [
		makeElement("thead", [
			makeElement("tr", [
				makeElement("th", [
					document.createTextNode("Attribute")
				]),
				makeElement("th", [
					document.createTextNode("Value")
				])
			])
		]),
		makeElement("tbody", rows)
	]);

	return table;
}


function makeElement(t, childArr) {
	var elem = document.createElement(t);
	
	if (childArr && childArr.length > 0) {
		for (var i=0; i<childArr.length; i++) {
			elem.appendChild(childArr[i]);
		}
	}
	
	return elem;
}


// EOF
