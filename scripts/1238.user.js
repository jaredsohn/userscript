// ==UserScript==
// @name           Google News Age Updater
// @namespace      http://userscripts.org/people/336
// @description    Automatically updates the age of Google News pages.
// @source         http://userscripts.org/scripts/show/1238
// @identifier     http://userscripts.org/scripts/source/1238.user.js
// @version        0.4
// @date           2005-12-06
// @creator        Richard Gibson <FirstName.LastName@gmail.com>
// @include        http://news.google.com/*
// ==/UserScript==
//
// **COPYRIGHT NOTICE**
// 
// Copyright (C) 2005 and onwards  Richard Gibson
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
// 
// **END COPYRIGHT NOTICE**
//
//
// Changelog:
// 0.4 (2005-12-06)
// 	updated for Greasemonkey 0.6.4 and Firefox 1.5
// 	added automatic updates
// 0.3 (2005-08-31)
// 	added a userscripts.org namespace
// 0.2 (2005-07-19)
// 	updated for GreaseMonkey 0.3.5
// 0.1 (2005-07-06)
// 	original release
// 
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -----------------------------------------------------------------------------

(function() {

var genTime = new Date((new Date()).getTime() - 1000
		* ((unsafeWindow || window.wrappedJSObject || window).sec || 0));
var btn = document.getElementsByName("btn").item(0);
var timestampTag = btn.parentNode.parentNode.nextSibling.firstChild;

// update automatically
try {
	window.addEventListener("load", function () { try {
		(unsafeWindow || window.wrappedJSObject || window)
				.UserScriptUpdates.requestAutomaticUpdates({
			name: "Google News Age Updater",
			namespace: "http://userscripts.org/people/336",
			description: "Automatically updates the age of Google News pages.",
			source: "http://userscripts.org"			// script homepage
				+ "/scripts/show/1238",
			identifier: "http://userscripts.org"	// script URL
				+ "/scripts/source/1238.user.js",
			version: "0.4",								// version
			date: (new Date(2005, 12 - 1, 6))		// update date
				.valueOf()
		});
	} catch (ex) {} }, false);
} catch (ex) {}


// allow user to set generation time presence & format
try {
	GM_registerMenuCommand("Google News Age Updater: disable generation time",
			function(){GM_setValue("timeFormat", showGenerationTime(""));});
	GM_registerMenuCommand("Google News Age Updater: 12-hour (am/pm) generation"
			+ " time",
			function(){GM_setValue("timeFormat", showGenerationTime("ap"));});
	GM_registerMenuCommand("Google News Age Updater: 24-hour generation time",
			function(){GM_setValue("timeFormat", showGenerationTime("24"));});
} catch (ex) {}

function showGenerationTime (timeFormat) {
	var genString = "", date = genTime.getDate();
	if (timeFormat) {
		genString = " (" +
			genTime.toDateString().match(new RegExp(
					"(0?" + date + "\\W+\\w+|\\w+\\W+0?" + date + ")"))[1] + " "
			+ (timeFormat == "24"
				? ("0" + genTime.getHours()).slice(-2) + ":"
						+ ("0" + genTime.getMinutes()).slice(-2)
				: ((genTime.getHours() % 12) || 12) + ":"
						+ ("0" + genTime.getMinutes()).slice(-2)
						+ (genTime.getHours() <= 11 ? "am" : "pm")
			)
		+ ")";
	}
	timestampTag.lastChild.nodeValue = genString;
	return timeFormat;
};

try {
	// add an explicit notice of generation time
	timestampTag.appendChild(document.createTextNode(""));
	try {
		showGenerationTime(GM_getValue("timeFormat", "24"));
	}
	catch (ex) {
		showGenerationTime("24");
	}
	
	// make the age display auto-updating
	var ageTag = timestampTag.childNodes[2];
	window.setInterval(function() {
		var ageSec = Math.round(((new Date()).getTime() - genTime.getTime())
				/ 1000), ageStr = "";
		if (ageSec < 3600) {
			ageStr = Math.round(ageSec/60) + " minute" + (ageSec >= 90 ? "s" : "")
					+ " ago";
		}
		else if (ageSec < 10800) {
			ageStr = Math.round(ageSec/1800)/2 + " hour"
					+ (ageSec >= 4500 ? "s" : "") + " ago";
		}
		else if (ageSec < 86400) {
			ageStr = Math.round(ageSec/3600) + " hour"
					+ (ageSec >= 5400 ? "s" : "") + " ago";
		}
		else {
			ageStr = Math.round(ageSec/86400) + " day"
					+ (ageSec >= 129600 ? "s" : "") + " ago";
		}
		ageTag.replaceChild(document.createTextNode(ageStr), ageTag.firstChild);
	}, 15000);
} catch (ex) {}

})();
