// ==UserScript==
// @name          Google Calendar find-a-time focuser
// @namespace     http://userscripts.org/scripts/show/110090
// @author        Jacob Bower
// @version       1.01
// @description   When creating/editing an event in Google Calendar the find-a-time
//                tab is selected immediately. This makes it harder to forget to
//                check whether all attendees will be available for meetings.
// @include       https://*.google.com/calendar/*
// @match         https://*.google.com/calendar/*
// ==/UserScript==

//
// Changelog:
//
//  11-Aug-11 - 1.00 - Initial version.
//
//  13-Aug-11 - 1.01 - Added namespace metadata after upload to userscripts.org.
//

window.synthesiseFindATimeClick = function() {
	var find_a_time_div = document.getElementById('ui-dtsr-tab-1');
	event = document.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	find_a_time_div.dispatchEvent(event);
	window.find_a_time_clicked = true;
}

document.addEventListener("DOMNodeInserted", function(event) {
	var find_a_time_div = document.getElementById('ui-dtsr-tab-1');
	if(find_a_time_div && !window.find_a_time_clicked) {
		setTimeout("window.synthesiseFindATimeClick()", 100);
	}
}, false);


document.addEventListener("DOMNodeRemoved", function() {
	var find_a_time_div = document.getElementById('ui-dtsr-tab-1');
	if(!find_a_time_div) {
		window.find_a_time_clicked = false;
	}
}, false);
