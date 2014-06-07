// Achewood Comics key navigation script
// version 0.1
// 2006-06-21
// Copyright (c) 2005, Nemanja Stefanovic
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
// select "AchewoodKeys", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          AchewoodKeys
// @namespace     http://www.nemik.net/achewoodkeys.user.js
// @description   Lets you navigate the Achewwod comics using the left and right arrow keys
// @include       http://achewood.com/*
// @include       http://*.achewood.com/*
// ==/UserScript==

next = '';
previous = '';
as = document.getElementsByTagName("a");
for(i=0; i<as.length; i++)
{
	if(as[i].firstChild.nodeValue == "<-")
	{
		previous = as[i].href;	
	}	
	else if(as[i].firstChild.nodeValue == "->")
	{
		next = as[i].href;	
	}
	
}

var capture_keys = function(e)
{
	key = e.keyCode;
	if(key == 39)
	{
		location.href = next;
	}
	else if(key == 37)
	{
		location.href = previous;
	}
}
document.addEventListener('keypress', capture_keys, true);
