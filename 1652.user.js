// phpBB User Annotate
// version 0.1 BETA!
// 2005-09-07
//
// --------------------------------------------------------------------
//
// Sometimes it's useful to be able to save notes about other users on
// a phpBB. On one phpBB I frequent, I know many of the members, but I
// have trouble remembering who is using which screen name. This script
// lets me store the real names of each user.
//
// Based on phpBB User Hide script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Underline Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          phpBB User Annotate
// @namespace     http://www.josephwu.com/greasemonkey
// @description   Allows you to attach a short note to user names on phpBB.
// @include       */viewtopic.php*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Joseph Wu

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/copyleft/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
  // JW: version checking
  if (!GM_getValue) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
  }
	// Find all the usernames in the page
	var results = document.evaluate("//span[@class='name']/b", document, null,
		XPathResult.ANY_TYPE, null);
	var resultNodes = [];
	var userNotes = [];  // JW: user notes array
	var aResult;
	var resultUser;
	while (aResult = results.iterateNext()) {
		resultNodes.push(aResult);
		resultUser = aResult.innerHTML.replace(/ /g, '');
		userNotes[resultUser] = ( GM_getValue( resultUser, '' ) ); // JW
	}

	var user;
	// Loop through every user post on the page
	for (var i in resultNodes) {
		var containingRow = resultNodes[i].parentNode.parentNode.parentNode;
		// Collapse whitespace
		user = resultNodes[i].innerHTML.replace(/ /g, '');

		// Add relevant event handlers to user's name
		resultNodes[i].title = userNotes[user] + " [double click to change]";
		resultNodes[i].onmouseover = function(event) { event.target.style.cursor = 'pointer'; };
		resultNodes[i].onmouseout = function(event) { event.target.style.cursor = 'default'; };
		// On double-click, edit this user's notes
		resultNodes[i].ondblclick = function(event) {
			var user = event.target.innerHTML.replace(/ /g, '');
		  GM_setValue( user, prompt( "Edit user note for [" + user + "]:", userNotes[user] ) );
			alert('User note has been updated.\n'
				+ 'You must refresh the page to view the changes.');
		};

	}
})();
