// ==UserScript==
// @id             FaLocalTime
// @name           FA Local Time
// @version        1.4
// @namespace      FA Local Time
// @author         Michael Ooms
// @description    Fixes the time to the Local one
// @include        http*://www.furaffinity.net/*
// @run-at         document-end
// ==/UserScript==

// Create an array with all the span elements
var elems = document.getElementsByTagName('span'), i;
// Loop trough the array
for (i in elems) {
// Checks if the span element is made for holding the time
	if ((' ' + elems[i].className + ' ').indexOf(' ' + 'popup_date' + ' ') > -1) {
// Add to the variable after clearing the string of non-time relevant characters using subString and ordinal number suffixes using replace with regex
		var FAdate = new Date(elems[i].innerHTML.substring(0, elems[i].innerHTML.length - 3).replace(/(th|st|rd|nd|on)/gi, ""));
// Create the correct time using the retrieved time and the local time offset and submit it the the date variable
		FAdate.setHours(FAdate.getHours() + (FAdate.getTimezoneOffset() / 60));
// Select the original element and append the correct time after converting it to the local lay-out, removing the day name prefix
		elems[i].innerHTML = FAdate.toLocaleString().replace(localDay(FAdate), "").slice(0, -3);
	}
}

// Please add your own localised words here, otherwise you'll get standard English day prefixes!!!
function localDay(d) {
	var weekday = new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";

	var n = weekday[d.getDay()];
	return n;
}