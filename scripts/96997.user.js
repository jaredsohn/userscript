// ==UserScript==
// @name           medie pontiflex
// @namespace      *.pontiflex.com
// @include        https://adleads.pontiflex.com/publisher/reports/placement_report.jsf
// ==/UserScript==

var cell = "";

var divs = document.getElementsByTagName("td");
for (var i = 0; i < divs.length-1; i++) {
	if (divs[i]) {
		if (divs[i].className == 'row_value') {
			cell = divs[i];
		}
	}
}

var total = cell.innerHTML.substring(1);

var divs = document.getElementsByTagName("small");
var dateStr = divs[0].innerHTML;
var parts = dateStr.split(" ");
var am = true;
if (parts[6] == "PM") {
	am = false;
}

parts = parts[5].split(":");

var hour = parts[0]*1+1;
if (!am) {
	hour += 12;
}

var hourly = total / hour;


var projected = hourly*24;

cell.innerHTML = "<b>"+cell.innerHTML+"</b> <br><br><div style=\"font-size:12px\">hourly <b>$"+Math.floor(hourly)+"</b></div> <div style=\"white-space: nowrap;font-size:12px\">projected <b>$"+Math.floor(projected)+"</b></div>";