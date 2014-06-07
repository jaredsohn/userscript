// ==UserScript==
// @name           Slashdot Moderation Helper
// @namespace      http://userscripts.org/people/336
// @description    Keeps track of available mod points and pending moderations.
// @source         http://userscripts.org/scripts/show/2410
// @identifier     http://userscripts.org/scripts/source/2410.user.js
// @version        0.1
// @date           2005-12-20
// @creator        Richard Gibson <FirstName.LastName@gmail.com>
// @include        */slashdot.org/article.pl?*
// @include        *.slashdot.org/article.pl?*
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
// Changelog
// 0.1 (2005-12-20)
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

(function () {

// constants
var SCRIPT = {
	name: "Slashdot Moderation Helper",
	namespace: "http://userscripts.org/people/336",
	description: "Keeps track of available mod points and pending moderations.",
	source: "http://userscripts.org"			// script homepage/description URL
			+ "/scripts/show/2410",
	identifier: "http://userscripts.org"	// script URL
			+ "/scripts/source/2410.user.js",
	version: "0.1",								// version
	date: (new Date(2005, 12 - 1, 20))		// update date
			.valueOf()
};
var COUNT_LABEL = "%points% mod point(s)";

// global variables
var points = 0;
var box = document.createElement("div");
var count = document.createElement("strong");

// update automatically
try {
	window.addEventListener("load", function () { try {
		(unsafeWindow || window.wrappedJSObject || window)
				.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
	} catch (ex) {} }, false);
} catch (ex) {}

// read mod points
try {
	for (var bold = document.getElementById("moderation-content")
			.getElementsByTagName("b"), i = 0; i < bold.length; i++) {
		points = parseInt(bold[i].textContent || bold[i].innerHTML) || 0;
		if (points) { break; }
	}
} catch (ex) {}

// continue if we have points
if (points) {
	// attach and style the box
	document.body.appendChild(box);
	box.className = "SlashdotModerationHelperFloat";
	box.style.position = "fixed";
	box.style.left = box.style.bottom = 0;
	box.style.backgroundColor = "white";
	box.appendChild(count);
	count.appendChild(document.createTextNode(""));
	updateCount(points);
	
	// listen for mod changes
	document.addEventListener("change", function (evt) {
		var	target = evt.target || evt.srcElement,
				number = target.getAttribute("name"),
				link, comment;
		
		// only respond to moderation controls
		if (target.tagName.toLowerCase() != "select"
				|| !/^reason_/.test(number)) { return; }
		
		// search for an existing link
		number = number.substring(7);
		link = document.getElementById("link_" + number);
		
		if (target.value && target.value != "0") {
			if (!link) {
				updateCount(--points);
				comment = document.getElementsByName(number)[0];
				link = box.insertBefore(document.createElement("a"), box.lastChild);
				link.id = "link_" + number;
				link.setAttribute("href", "#" + number);
				if (comment) {
					link.setAttribute("title",
							comment.textContent || comment.innerHTML);
				}
				link.appendChild(document.createTextNode(""));
				link.parentNode.insertBefore(document.createElement("br"),
						link.nextSibling);
			}
			link.firstChild.nodeValue =
					target.options[target.selectedIndex].text;
		}
		else {
			if (link) {
				updateCount(++points);
				link.parentNode.removeChild(link.nextSibling);
				link.parentNode.removeChild(link);
			}
		}
	}, false);
}

function updateCount (points) {
	count.firstChild.nodeValue = COUNT_LABEL.replace("%points%", points);
};

})();
