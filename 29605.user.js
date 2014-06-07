// ==UserScript==
// @name           Google Calendar in Gmail
// @namespace      http://mattsarchives.com
// @description	 Adds an iframe to the bottom of your inbox that contains your calendar. Works well with http://userstyles.org/styles/1118
// @include        https://mail.google.com/mail/*
// ==/UserScript==


var gmail;
var gcal_frame;

gcal_frame = document.createElement("iframe");
gcal_frame.src = "https://www.google.com/calendar/";
gcal_frame.width = '99%';
gcal_frame.height = '600';

window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', main);
	}
}, true);


function main(g) {
	gmail = g;
	gmail.registerViewChangeCallback(runGcal);
	runGcal();
}

function runGcal() {
	if (gmail.getActiveViewType() != 'tl') return;
	if (gmail.getActiveViewElement().innerHTML.indexOf('Archive') != -1) gmail.getActiveViewElement().appendChild(gcal_frame);
}
