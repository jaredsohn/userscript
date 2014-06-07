// ==UserScript==
// @name           Greasemungo Employee Counter
// @description    Popmundo: Counts your employees by role (2008-04-24)
// @namespace      kenmooda@gmail.com
// @include        http://www*.popmundo.com/Common/Company.asp?action=Employments&LocaleID=*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Employee Counter
//    Copyright (C) 2007  Tommi Rautava
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

var TABLE_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr/td/table[1]/tbody";
var EMPLOYEE_XPATH = TABLE_XPATH + "/tr/td[1]/a";

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


var roles = {};
var nodes = xpathNodes(EMPLOYEE_XPATH);

for (var i = nodes.snapshotLength - 1; i >= 0; i--) {
	var node = nodes.snapshotItem(i);
	
	var role = node.textContent;
	
	if (roles[role]) {
		roles[role]++;
	}
	else {
		roles[role] = 1;
	}
}

var parentNode = xpathNode(TABLE_XPATH);
var lastRow = nodes.snapshotItem(nodes.snapshotLength - 1).parentNode.parentNode;
var targetNode = lastRow.nextSibling;
var n = 0;

for (var r in roles) {
	var td1 = document.createElement('td');
	td1.setAttribute('colspan', 3);
	td1.appendChild(document.createTextNode('\u00a0'+ r +' x '+ roles[r]));
	
	var tr1 = document.createElement('tr');
	tr1.appendChild(td1);
	
	parentNode.insertBefore(tr1, targetNode);
	n++;
}

if (n) {
	var hr1 = document.createElement('hr');

	var td2 = document.createElement('td');
	td2.setAttribute('colspan', 3);
	td2.appendChild(hr1);

	var tr2 = document.createElement('tr');
	tr2.appendChild(td2);

	parentNode.insertBefore(tr2, lastRow.nextSibling);
}

// EOF