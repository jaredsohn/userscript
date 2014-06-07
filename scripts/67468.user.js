// VA Supreme Court Rules Page Title
// Version 0.2.1 2010-01-28
// Copyright (c) 2010 by Andrew S. <attorneytech@gmail.com>
// Released under the GPL General Public License, available at:
// http://www.gnu.org/licenses/gpl.html
//
// LICENSE SUMMARY:
// This script is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This script is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for complete details.
// 
// This summary description of the license is provided for your benefit only.
// The actual terms of the license are found in the GNU General Public License
// avaliable at: <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------------------
// LEGAL DISCLAIMER: This script is NOT sponsored, endorsed, authorized, provided
// by, or associated with the Commonwealth of Virginia or any of its subdivisions,
// agencies, or entities, including the Supreme Court of Virginia. The names and
// logos are used merely to identify the service with which this script works.
// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://www.greasespot.net/
// --------------------------------------------------------------------
//
// ==UserScript==

// @name           VA Supreme Court Rules Page Title
// @namespace      http://www.attorneytech.net/gmscripts
// @version        0.2.1
// @description    Clean up page title from Virginia's Legislative Information System Supreme Court Rules website (http://leg1.state.va.us/000/srs.htm)
// @copyright      2010, Andrew S. (http://www.attorneytech.net/gmscripts/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://leg1.state.va.us/cgi-bin/legp504.exe*
//
// @uso:script     scriptid
// @uso:version    versionid
// @uso:timestamp  timestamp
// @uso:hash       hash

// ==/UserScript==

// Make sure user has appropriate Greasemonkey version.
if (!GM_setValue || !GM_getValue) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// Prepare "load" listener to change the title.
window.addEventListener(
    "load", 
    function() {
		document.title = GM_getValue("myTitle");
	},
    true);

/********* Get page title and clean it up *********/

newTitle = document.title;

// Fix Title for Get a Document
originalTitle = newTitle;
newTitle = newTitle.replace("LIS > Supreme Court Rules > vscr-", "VSCR ");
newTitle = newTitle + " (VA Supreme Court Rules)";

// Store the page's title, so listener can use it.
GM_setValue("myTitle", newTitle);


/* Change Log

0.2.1 - 2010-01-28 - changed namespace, updated license, added legal disclaimer, and prepared for publication
0.2 - 2010-01-21 - minor changes
0.1 - 2009-09-21 - initial beta version

*/