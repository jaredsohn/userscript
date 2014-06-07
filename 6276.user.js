// SomethingAwful Forums key navigation script
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
// select "SAKeys", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SomethingAwful Keys
// @namespace     http://www.nemik.net/scripts/SAKeys.user.js
// @description   Lets you navigate the pages in a SomethingAwful forums thread using the left and right arrow keys
// @include       http://forums.somethingawful.com/*
// @include       http://archives.somethingawful.com/*
// @exclude       http://*.somethingawful.com/newreply.php*
// ==/UserScript==

next = '';
previous = '';
as = document.getElementsByTagName("a");
for(i=0; i<as.length; i++)
{
	if(as[i].title == "next page")
	{
		next = as[i].href;	
	}	
	else if(as[i].title == "previous page")
	{
		previous = as[i].href;	
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

