// ==UserScript==
// @name           Adsense EPC / CPC
// @version        1.2
// @namespace      http://www.google.com
// @description    Shows an Earnings Per Click column in your Adsense Reports. Also known as Cost Per Click.
// @include        https://www.google.com/adsense/report/aggregate*
// ==/UserScript==


function strip(str)
{
	filteredValues = "1234567890.";
	var i;
	var returnString = "";

	for (i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if (filteredValues.indexOf(c) != -1) returnString += c;
	}
	return returnString;
}

function isdefined(object, variable)
{
	return (typeof(eval(object)[variable]) != 'undefined');
}




report = document.getElementById("report");

var hasTotals = true;
var eColumn; // Earnings Column Index
var cColumn; // Clicks Column Index

var rowOffset = 2; // Depending on the report size, it may or may not show totals.  This offset deal with that.

if (report.childNodes[1].childNodes[2].className != "columntitle")
{
	rowOffset = 0;
	hasTotals = false;
}

for (var i=0; i < report.childNodes[1].childNodes[rowOffset].childNodes.length; i++) {
	
	var str = report.childNodes[1].childNodes[rowOffset].childNodes[i].innerHTML.toLowerCase();
	
	if (str.indexOf('earnings') != -1)
		eColumn = i;
	
	if (str.indexOf('clicks') != -1)
		cColumn = i;
	
	i++;
}


var start = 2;
if (!hasTotals) start = 0;

// Total
if (hasTotals) {
	newElement = document.createElement('td');
	newElement.innerHTML = '';
	target = report.childNodes[1].childNodes[0].childNodes[eColumn];
	target.parentNode.insertBefore(newElement, target.previousSibling);
}

// Heading
newElement = document.createElement('td');
newElement.innerHTML = 'Average EPC';

target = report.childNodes[1].childNodes[start].childNodes[eColumn];
target.parentNode.insertBefore(newElement, target.previousSibling);





var trs = report.childNodes[1].childNodes;
var count = 0;
var total = 0;
for (var i = start + 2; i < trs.length; i++) {
	
	// Calculate CPC
	var earnings = strip(report.childNodes[1].childNodes[i].childNodes[eColumn].innerHTML) * 1;
	var clicks = strip(report.childNodes[1].childNodes[i].childNodes[cColumn].innerHTML) * 1;
	
	
	val = '$' + Math.round(earnings / clicks * 100) / 100;
	if (val == '$Infinity' || val == '$NaN')
		val = '';
	else {
		if (val.lastIndexOf('.') != val.length - 3) val += '0';
	}
	
	if (i < trs.length - 4)
	{
		total += (earnings / clicks);
		count ++;
	}
	
	if (i == trs.length - 2) {
		earnings = strip(report.childNodes[1].childNodes[i-2].childNodes[eColumn+1].innerHTML) * 1;
		clicks = strip(report.childNodes[1].childNodes[i-2].childNodes[cColumn].innerHTML) * 1;
		val = '$' + Math.round(earnings / clicks * 10000) / 10000;
	}
	if (i == trs.length - 4) val = '';
	
	newElement = document.createElement('td');
	newElement.innerHTML = val;
	target = trs[i].childNodes[eColumn];
	target.parentNode.insertBefore(newElement, target.previousSibling);
	
	i++;
}