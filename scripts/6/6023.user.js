// Google Calendar Quick Key
// Version 0.0
// ~2006
// Copyright (c) 2005, The World and Everyone In It
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "gcalquickadd", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Calendar Quick Key
// @namespace     http://www.bertelsen.ca/journal/greasemonkey-script-for-quick-add-google-calendar
// @description   Takes selection or direct entry quicktext and adds to google calendar with ctrl+; redirects to details page
// @include       *
// ==/UserScript==

window.addEventListener('keydown', catchKey, true);

function catchKey(e) {
	 if (e.ctrlKey) {
		switch (e.keyCode) {
		case 59: addEvent(); break;
		}
		}
	}

function number_html(i) {
	var num = 16;
	var j ="";
	for(var n = 0; n < i.length; n++) {
		j += ("&#x"+(i.charCodeAt(n)).toString(num)+";");
	}
	return j;
}

function addEvent() {

var s = window.getSelection();
var t=prompt('Please enter a description for the event',s);
if(t){
var text=encodeURI('http://www.google.com/calendar/event?ctext='+t+'&action=TEMPLATE&pprop=HowCreated%3AQUICKADD');
window.location=text;
}
}