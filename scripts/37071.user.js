// DB current departures user script
// version 1.0.1
// 2008-12-14
// Copyright (c) 2008, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
// ==UserScript==
// @name          DB Current Departures
// @namespace     http://current.departures.org/
// @description   This script extracts the current departures for a given destination.
// @include       http://reiseauskunft.bahn.de/bin/bhftafel.exe/dn?ld=*
// ==/UserScript==

setTimeout("location.reload();",300000);

var refresh = $x("//a[ @class = 'arrowlink floatRight fontNormal' ]")[0].parentNode;
refresh.appendChild(createElement('br'));
var newElem = createElement('a', [['class','arrowlink floatRight fontNormal']]);
newElem.href = "#";
newElem.innerHTML = "Filter &auml;ndern";
newElem.addEventListener('click', changeDestination, false);
refresh.appendChild(newElem);
refresh.appendChild(createElement('br'));

var destination = getDestination();
show();

// <table class="result stboard dep">
function show() {
	var table = $x("//table[ @class = 'result stboard dep' ]")[0];
	table.setAttribute('style','border: 1px solid lightgrey;');
	var rows = table.getElementsByTagName('tr');
	for (var i = 2; i < rows.length; i++) {
		var color = "#33FF66"; // green row color
		var row = rows[i];
		try {
			row.removeAttribute('style');
			row.setAttribute('style','border: 1px solid lightgrey;');
		} catch(e) {}
		var tds = row.childNodes;
		var found = false;
		for (var j = 0; j < tds.length; j++) {
			var td = tds[j];
			var as = td.childNodes;
			for (var k = 0; k < as.length; k++) {
				var a = as[k];
				try {
					if (!found && a.textContent.match(destination)) {
						found = true;
					} else if (j == 10 && k == 1 && !a.textContent.match(/nktlich/)) {
						color = "#FF6666"; // red row color
					}
					a.setAttribute('style','color:black');
				} catch(e) {}
			}
		}
		if (found) {
			for (var j = 0; j < tds.length; j++) {
				var td = tds[j];
				try {
					td.removeAttribute('style');
					td.setAttribute('style','background:' + color);
				} catch (e) {}
			}
		} else {
			try {
				row.removeAttribute('style');
				row.setAttribute('style','display:none');
			} catch (e) {}
			
		}
	}
}

function getDestination() {
	if (GM_getValue("destination") == null || GM_getValue("destination") == '') {
		destination = prompt("Insert a destination", "Destination");
		GM_setValue("destination", destination);
	}
	destination = new RegExp(GM_getValue("destination"));
	return destination;
}

// change the destination
function changeDestination() {
	destination = prompt("Insert a destination", GM_getValue("destination"));
	GM_setValue("destination", destination);
	destination = new RegExp(GM_getValue("destination"));
	show();
}

// creates a new element with the given attribute list
function createElement(type, attributes) {
	var element = document.createElement(type);
	if (attributes != null) {
		for (var i = 0; i < attributes.length; i++) {
			element.setAttribute(attributes[i][0], attributes[i][1]);
		}
	}
	return element;
}

/*
 * Run a particular XPath expression p against the context 
 * node context (or the document, if not provided).
 * Returns the results as an array.
*/
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

// EOF