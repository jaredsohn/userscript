// Planner Google link
// version 0.1
// 2011-11-15
// Copyright (c) 2011, Bartosz Piec
// Released under the MPL license
// http://www.mozilla.org/MPL/
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// If you want, you can configure the Included and Excluded pages in 
//  the GreaseMonkey configuration.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ogicom Panel Autofocus", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Adds a link to Planner issue page on embedded Google Calendar.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Planner Google link
// @namespace       http://www.dabarto.pl/projects/greasemonkey/planner_google_link
// @description     Adds a link to Planner issue page on embedded Google Calendar
// @include         http://www.google.com/calendar/embed*
// @include         https://www.google.com/calendar/embed*
// ==/UserScript==

setTimeout(addclick, 1000);

function addclick() {
	var tags = document.getElementsByTagName('dl');
	for (i in tags) {
		var tag = tags[i];
		if (window.addEventListener) { // W3C standard
			window.addEventListener('click', clickhandler, false); // NB **not** 'onclick'
		}
		else if (window.attachEvent) { // Microsoft
			window.attachEvent('onclick', clickhandler);
		}
	}
}

function clickhandler(e) {
	var targ;
	if (!e) {
		var e = window.event;
	}
	if (e.target) {
		targ = e.target;
	}
	else if (e.srcElement) {
		targ = e.srcElement;
	}
	if (targ.nodeType == 3) { // defeat Safari bug
		targ = targ.parentNode;
	}
	
	if (targ) {
		var html = targ.innerHTML;
		var reg = new RegExp('#[0-9]+:');
		var match = reg.exec(html);
		if (match) {
			var id = match[0].replace('#', '').replace(':', '');
			var tags = document.getElementsByClassName('bubble');
			if (tags.length > 0) {
				var tag = tags[0];
				var spans = tag.getElementsByClassName('links');
				if (spans.length > 0) {
					var span = spans[0];
					span.innerHTML = '<a href="http://planner.metrohouse.net/Issue.aspx?id=' + id + '" target="_parent">przejdź do zadania #' + id + ' »</a> ';
				}
			}
		}
	}
}