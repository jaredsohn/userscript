// BaseCampDay4Date
// version 0.1 BETA!
// 2007-04-04
// Copyright (c) 2007, the mad scientist, the.mad.scientist@gmx.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Licensed under Creative Commons Attribution
// http://creativecommons.org/licenses/by/1.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BaseCampDay4Date", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BaseCampDay4Date
// @description   Adds weekday info (Mo, Tu, etc) to the date that is displayed on the time tracking pages.
// @include       https://*.grouphub.com/*
// ==/UserScript==

var dates, date, currDate, currYear, dateText, dateYear, replacementtext;
currDate = new Date();
currYear = currDate.getFullYear();
dates = document.evaluate(
    "//td[@class='date']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < dates.snapshotLength; i++) {
    date = dates.snapshotItem(i);
	dateText = date.innerHTML;
	if (dateText.length>6) {
		dateYear ='20'+dateText.substr(8,2);
	} else {
		dateYear = currYear;
	}
	currDate = new Date(dateText.substr(0,6) + ', ' + dateYear);
	replacementtext = currDate.toString().substr(0,15);
	date.innerHTML = replacementtext;
}