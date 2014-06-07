// ==UserScript==
// @name        Facebook Event export to google calendar
// @namespace   userscripts
// @description In stead of saving an .ics file on 'Export', it wil offer a webcal url for Google Calendar
// @include     http://www.facebook.com/events/*
// @include     https://www.facebook.com/events/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// @version     0.1
// ==/UserScript==


// Globals
var links = $("#pagelet_event_actions");
var link = $("#pagelet_event_actions a:first");

if (!!link.length) {
	var google = link.clone();
	var url = link.attr('href');
	var id = url.match(/\d+$/);
	
	var href = 'webcal://www.facebook.com/ical/event.php?eid=' + id + '&ext=.ics';
	
	google.html('Add to Google Calendar');
	google.attr('id','googleCalendar').attr('href',href).attr('rel','').attr('role','');
	links.prepend(google);
    links.prepend('<hr>');
}
