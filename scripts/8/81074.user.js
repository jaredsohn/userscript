// ==UserScript==
// @name           Basil Time
// @namespace      basilmarket.com
// @description    Turns the Basil clock to a menu item that can display different timezones
// @include        http://www.basilmarket.com/*
// ==/UserScript==

//******************************************************************
// Script Options
//******************************************************************

// Append timezones to display here.  The array key is the displayed name and the value is the offset from BT
var display_times = new Array();
display_times['PST'] = "-2";
display_times['EST'] = "+1";
display_times['GMT'] = "+5";

// Display format for time. 24 hour format = 0, 12 hour (AM/PM) = 1
var display_format = 0;

//******************************************************************





//******************************************************************
// Actual Code (DO NOT MODIFY UNLESS YOU KNOW WHAT YOU ARE DOING)
//******************************************************************
var clock = document.getElementById('clock');
var menu = clock.parentNode;
menu.removeChild(clock);
var clearfix = menu.getElementsByTagName('li')[7];
menu.removeChild(clearfix);
var bt_hour = clock.innerHTML.substring(0, 2);
var bt_min = clock.innerHTML.substring(3, 5);
var tmp = "<li style=\"float: right;\" class=\"mm-item\"><a href=\"#\" class=\"navtop mm-item-link\">" + formatTimeString(bt_hour,bt_min) + " BT</a>" + "<div style=\"display: none;\" class=\"snWrap mm-item-content\"><div class=\"mm-content-base\">"
var c_hour;
for (var t in display_times) {
	c_hour = eval(bt_hour + display_times[t]);
	if(c_hour < 0)
		c_hour += 24;
	else if(c_hour > 23)
		c_hour -= 24;
	tmp += "<div class=\"snsWrap cb\"><strong>" + formatTimeString(c_hour,bt_min) + " " + t + " (BT" + display_times[t] + ")</div>";
}
tmp += "</div></div></li>";
menu.innerHTML += tmp;
menu.appendChild(clearfix);

function formatTimeString(hour,min) {
	var dt = ""
	if(display_format == 0) {
		dt = hour + ":" + min;
	} else {
		if(hour > 12) {
			dt = (hour - 12) + ":" + min + " PM";
		} else if(hour == 0) {
			dt = "12:" + min + " AM";
		} else {
			dt = hour + ":" + min + " AM";
		}
	}
	return dt;
}