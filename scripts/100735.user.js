// ==UserScript==
// @name           WRT Timelog Script
// @namespace      http://www.wirelessronin.com
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


function setCalendarDates()

{
	var loc = window.location.href.toString();
	var index = loc.indexOf("CalendarDate");

	if(index != -1) {
	
		var cdateSplit = unescape(loc).split("CalendarDate=");
		var d = unescape(cdateSplit[1]).split("&")[0];
		//alert(d);

		$("[id$='DateTimeFieldDate']")[0].value = d;
		$("[id$='DateTimeFieldDate']")[1].value = d;
	}
}

var h1;
var h2;
var m1;
var m2;

function setHourAlerts() {

if(!$("[id$='DateTimeFieldDateHours']")[0]) { return; }

h1 = $("[id$='DateTimeFieldDateHours']")[0];
h2 = $("[id$='DateTimeFieldDateHours']")[1];

m1 = $("[id$='DateTimeFieldDateMinutes']")[0];
m2 = $("[id$='DateTimeFieldDateMinutes']")[1];

h1.selectedIndex = 9;
h2.selectedIndex = 17;

$("[id$='DateTimeFieldDateHours']").change(function() {
	checkTimes();
});

$("[id$='DateTimeFieldDateMinutes']").change(function() {
	checkTimes();
});
}

function checkTimes() {
	if(h1.selectedIndex > h2.selectedIndex) {
		alert("Time is negative.");
	} else if(h1.selectedIndex == h2.selectedIndex && m1.selectedIndex > m2.selectedIndex) {
		alert("Time is negative.");
	}
}


setCalendarDates();
setHourAlerts();