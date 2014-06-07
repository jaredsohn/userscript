// ==UserScript==
// @name		MTurk Worst & Best Case Scenario
// @author		Austin3600 (WoLF)
// @description	This script will calculate the best and worst
//				case scenario of your pending HITs. The information
//				will be displayed on your dashboard.
// @include		https://www.mturk.com/mturk/dashboard
// @version		1.0
// @grant		none
// ==/UserScript==

// History
// 04-05-2014: v1.0 Released

// Color settings
// Users can change these colors to anything they want by changed this words
// Look up a list of HTML color names, any of those may be used.
// EX: 'red', 'blue', 'orange', 'yellow', 'gold'

var goodColor = 'lightgreen';
var okColor = 'orange';
var badColor = 'red';

// Percentage Settings
// You can change these
// goodP = What's the lowest approval rating you deem as "Good"
// okP = What's the lowest approval rating you deem just "OK"

var goodP = 99.0;
var okP = 95.0;

// End of settings - Don't change anything below this line.

// Variable setup
var pending, submitted, approved, approvalP, rejected, worstCase, bestCase, bestColor;
var results = document.evaluate("//tr[@class]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var x=0;x < results.snapshotLength;x++) {
	var line = results.snapshotItem(x);
	if (line.cells.length == 3) {
		if (line.cells[0].textContent.match('HITs Submitted')) {
			submitted = parseInt(line.cells[1].textContent);
		}
		if (line.cells[0].textContent.match('... Approved')) {
			approved = parseInt(line.cells[1].textContent);
			approvalP = parseFloat(line.cells[2].textContent);
			if (approvalP >= goodP) {
				line.cells[2].style.backgroundColor = goodColor;
			}
			else if (approvalP >= okP) {
				line.cells[2].style.backgroundColor = okColor;
			}
			else {
				line.cells[2].style.backgroundColor = badColor;
			}
		}
		if (line.cells[0].textContent.match('... Rejected')) {
			rejected = parseInt(line.cells[1].textContent);
		}
		if (line.cells[0].textContent.match('... Pending')) {
			pending = parseInt(line.cells[1].textContent);
			line.cells[0].innerHTML += " <small>(Worst Case Scenario)</small>";
			if (goodP < approvalP) {
				var f = 1.0 - goodP/100;
				var i = (rejected-(f*submitted))/(f-1);
				line.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + okColor + "\">(~" + Math.round(i) + " rejects => " + goodP + "%)</span>";
			}
			if (okP < approvalP) {
				var f = 1.0 - okP/100;
				var i = (rejected-(f*submitted))/(f-1);
				line.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + badColor + "\">(~" + Math.round(i) + " rejects => " + okP + "%)</span>";
			}
			worstCase = Math.round(approved/(approved+rejected+pending) * 1000)/10;
			line.cells[2].innerHTML = '(' + worstCase + '%)';
			if (worstCase >= goodP) {
				line.cells[2].style.backgroundColor = goodColor;
			}
			else if (worstCase >= okP) {
				line.cells[2].style.backgroundColor = okColor;
			}
			else {
				line.cells[2].style.backgroundColor = badColor;
			}
			// BestCase Scenario Implementation
			bestCase = ((approved+pending)/(approved+rejected+pending) * 100).toFixed(1);
			if (bestCase >= goodP) {
				bestColor = 'green';
			}
			else if (bestCase >= okP) {
				bestColor = okColor;
			}
			else {
				bestColor = badColor
			}
			line.cells[0].innerHTML += "<br>... Pending <small><span style=\"color:" + bestColor + "\">" + "(Best Case Scenario = " + bestCase + "%)</small></span>";
			if (goodP > approvalP) {
				var f = 1.0 - goodP/100;
				var i = (rejected-(f*submitted))/f;
				line.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + 'green' + "\">(~" + Math.round(i) + " accepts => " + goodP + "%)</span>";
			}
			if (okP > approvalP) {
				var f = 1.0 - okP/100;
				var i = (rejected-(f*submitted))/f;
				line.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + okColor + "\">(~" + Math.round(i) + " accepts => " + okP + "%)</span>";
			}
		}
	}
}