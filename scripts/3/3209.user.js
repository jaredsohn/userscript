// ==UserScript==
// @name          NBC Olympic Schedule Localizer
// @description	  Updates the NBC Olympic Schedule Based On Your Time Zone
// @include       http://www.nbcolympics.com/*
// ==/UserScript==
// Lots of ugly code here... script is only useful for less than 2 weeks, so no need spend time making it pretty

if (document.title.indexOf("Results and Schedules") = -1) return;

var divs = document.getElementsByTagName("div");

var now = new Date();
var offset = 0 - ((now.getTimezoneOffset() / 60) + 2);			// +2 is Turino offset

var isDay = false
if (document.getElementById("breadcrumbs").innerHTML.indexOf("Day") > -1) isDay = true;
if (isDay) var d = getDayDate();

for (var i = 0; i < divs.length; i++) {
	
	if (divs[i].className == "ibstable olysched") {
		var rows = divs[i].getElementsByTagName("tr");
		if (!isDay) var d = getEventDate(rows[0].getElementsByTagName("td")[0].innerHTML)
		
		tdCell = rows[1].getElementsByTagName("td")[0]
		tdCell.innerHTML = "Your time*";
		tdCell.style.backgroundColor = "#ffffdf";
		for (var q = 2; q < rows.length; q++) {
			cell = 	rows[q].getElementsByTagName("td")[0]
			cell.style.backgroundColor = "#ffffdf";
			t = getEventTime(cell.innerHTML, d, offset);
			cell.innerHTML = "&nbsp;" + getFormattedDate(t);
		}
	} else if (divs[i].className == "torinotime") {
		var newText = divs[i].innerHTML + "<br /><div style='background-color:#ffffdf; padding:10px'>Local Time Brought To You By ";
		newText += "<a style='color:#00f' href='http://greasemonkey.mozdev.org/'>Greasemonkey</a> and ";
		newText += "<a style='color:#00f' href='http://bob-obringer.com'>bob-obringer.com</a></div>";
		divs[i].innerHTML = newText;
	}
}


function trim(str) {return str.replace(/^\s*|\s*$/g,"")}

function getDayDate() {
	var h = document.getElementsByTagName("h1");
	for (var i = 0; i < h.length; i ++) {
		if (h[i].className == "titlebar titlebarschedbyday") {
			var t = h[i].innerHTML;
			var d1 = t.substring(t.indexOf(",") + 2, t.length);
			var d2 = d1.substring(0, d1.indexOf(","));
			return (d2 + ", 2006");
		}
	}
}

function getEventDate(innerh) {
	var fullDate = trim(innerh.substring(innerh.indexOf("D") + 8, innerh.length))	// Ugly... get everything after the first "D"
	var shortDate = fullDate.substring(fullDate.substring(fullDate.indexOf(" "), fullDate.length))	// Ugly... remove the weekday
	return (shortDate + ", 2006");
}

function getEventTime(innerh, dateString, offset) {
	var ispm = innerh.indexOf("p.m.") > -1
	var roughTime = innerh.substring(9, innerh.length - 5) + ":00";
	var d = new Date(dateString + " " + roughTime);
	var	pmAdj = (ispm) ? 12 : 0;
	pmAdj += (innerh.substring(9,11) == "12") ? - 12 : 0;
	var finalDate = new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours() + pmAdj + offset,d.getMinutes(),d.getSeconds());
	return (finalDate);
}

function getFormattedDate(adjDate) {
	var ampm = "";
	var d = new Date(adjDate);

	var h = d.getHours();
	if (h < 12) {
		ampm = "a.m.";
	} else {
		ampm = "p.m.";
	}
	if (h == 0)	h = 12;
	if (h > 12) h = h - 12;

	var m = d.getMinutes();

	return (h + ":" + ((m < 10) ? "0" : "") + m + " " + ampm);
}
