// Google Calendar Import
// Version: 0.1
// 2007-03-18 
// 
// Copyright (c) 2007 Nootech Consulting
//
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
// select "Google Calendar Quick Import", and click Uninstall.
//
// --------------------------------------------------------------------
//
// TODO:
// * add onscreen upload box ala QuickAdd
// * add Import option to individual calendars
//
// ==UserScript==
// @name           Google Calendar Quick Import
// @namespace      http://nootech.net/
// @description    Add quick import button for GCalendar
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// @include        http://calendar.google.tld/*
// @include        https://calendar.google.tld/*
// @include        http://www.google.tld/calendar*
// @include        https://www.google.tld/calendar*
// @include        http://google.tld/calendar*
// @include        https://google.tld/calendar*
// ==/UserScript==

var target = document.getElementById('open-quick-add');
if (target) {

	var parent = target.parentNode.parentNode.parentNode;
	//alert("parent = " + parent);

	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var link = document.createElement('span');
	link.setAttribute('type', 'span');
	link.setAttribute('class', 'lk');
	link.setAttribute('onclick', 'javascript:void((function(){if (3 != 0) {_GenSettings(3);}})())');
	link.setAttribute('id', 'open-quick-import');
	link.innerHTML = "Quick Import";
  //alert("link = " + link);
	td.insertBefore(link, td.nextSibling);
  //alert("td = " + td);
	tr.insertBefore(td, tr.nextSibling);
  //alert("tr = " + tr);
	parent.insertBefore(tr, parent.nextSibling);
}

