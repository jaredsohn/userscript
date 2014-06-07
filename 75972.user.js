// LexisNexis Case Title
// Version 2.0
// Copyright (c) 2010 by Michael Tracy 
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
//
// Credit goes to Andrew S. for the idea on this one. http://www.attorneytech.net/gmscripts/ 
// His copyright
// is reproduced here:
// LexisNexis Page Title
// Version 0.2.2 2010-01-29
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

// @name           LexisNexis Case Title
// @description    Replaces the title with the case name
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.lexis.com/research/retrieve*
// @include        http://w3.lexis.com/research2/*
// @include        https://www.lexis.com/research/retrieve*
// @include        https://w3.lexis.com/research2/*


// ==/UserScript==



newTitle = document.title;
originalTitle = newTitle;

var caseName = "";


if (unsafeWindow.ln_browse != null)
{
	caseName = unsafeWindow.ln_browse.docName;
}
else
{

	if (originalTitle.indexOf("Check a Citation - ") > -1)
	{
		caseName="";
		newTitle = newTitle.replace("Check a Citation - Shepard", "[SHEP]");
	}
	if (originalTitle.indexOf("Search")>-1)
	{
		newTitle = newTitle.replace(/Search.*Results/g,"[S]");
		try
		{
			caseName = document.getElementById("browsebar1").getElementsByTagName("B")[1].innerHTML.replace(/<span.*/gi,"");
			caseName = caseName.replace(/&nbsp;/g,"");
			caseName = caseName.replace(/&amp;/g,"&");
		}
		catch(err)
		{
		// do nothing -- the above will error on a search results page, but we don't want to change title
		}
	}

	if (originalTitle.indexOf("FOCUS")>-1)
	{
		newTitle = newTitle.replace(/FOCUS.*Results/g,"[F]");
		try
		{
			caseName = document.getElementById("browsebar1").getElementsByTagName("B")[1].innerHTML.replace(/<span.*/gi,"");
			caseName = caseName.replace(/&nbsp;/g,"");
			caseName = caseName.replace(/&amp;/g,"&");
		}
		catch(err)
		{
		// do nothing -- the above will error on a search results page, but we don't want to change title
		}
	}
}

GM_setValue("ShortTitle", caseName + "-" + newTitle);
window.addEventListener("load", 
    function() 
    	{
		document.title = GM_getValue("ShortTitle");
	},
    true);
    


