// LexisNexis Page Title
// Version 0.2.3 2010-04-14
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
// ------------------------------------------------------------------------------
// LEGAL DISCLAIMER: LexisNexis®, Lexis®, lexisONE®, and the related logos are
// trademarks of Reed Elsevier®. The names and logos are used merely to identify
// the service with which this script works. This script is NOT sponsored, 
// endorsed, authorized, provided by, or associated with LexisNexis®, Lexis®,
// lexisONE®, or Reed Elsevier®.
//
// ------------------------------------------------------------------------------
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://www.greasespot.net/
// --------------------------------------------------------------------
//
// ==UserScript==

// @name           LexisNexis Page Title
// @namespace      http://www.attorneytech.net/gmscripts
// @version        0.2.3
// @description    Strips extraneous information from LexisNexis page titles
// @copyright      2010, Andrew S. (http://www.attorneytech.net/gmscripts/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.lexis.com/research/retrieve*
// @include        http://w3.lexis.com/research2/*
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

/*

	IDEA: Replace FOCUS ... with [F] and Search ... with [S]

*/

newTitle = document.title;

// Fix Title for Get a Document by Citation
originalTitle = newTitle;
newTitle = newTitle.replace("Get a Document - by Citation - ", "");

// Fix Title for Check a Citation
originalTitle = newTitle;
newTitle = newTitle.replace("Check a Citation - ", "");

// Fix Title for FOCUS
if (originalTitle == newTitle)
{
	newTitle = newTitle.replace("FOCUS - 1 Result - ", ""); // When 1 Result
	i = 1;
	while (i<=500)
	{
		newTitle = newTitle.replace("FOCUS - " + i + " Results - ", "");
		// Don't keep looping once replacement is made
		if (originalTitle != newTitle)
		{
			break;
		}
		i=i+1;
	}
}

// Fix Title for Search
if (originalTitle == newTitle)
{
	newTitle = newTitle.replace("Search - 1 Result - ", ""); // When 1 Result	
	i = 1;
	while (i<=500)
	{
		newTitle = newTitle.replace("Search - " + i + " Results - ", "");
		// Don't keep looping once replacement is made
		if (originalTitle != newTitle)
		{
			break; 
		}
		i=i+1;
	}	
}

// Store the page's title, so listener can use it.
GM_setValue("myTitle", newTitle);

/* Change Log

0.2.3 - 2010-04-14 - added Fix Title for Check a Citation
0.2.2 - 2010-01-29 - deleted redundant code
0.2.1 - 2010-01-28 - changed namespace, updated license, added legal disclaimer, and prepared for publication
0.2.0 - 2010-01-20 - added Fix Title for Get a Document by Citation; added http://w3.lexis.com/research2/* to the @include list
0.1.0 - 2009-09-18 - initial beta version

*/