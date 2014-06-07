// Zoom Textarea
// version 0.7 BETA!
// 2005-05-02
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Zoom Textarea", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          test raghav
// @namespace     http://userscripts.org/users/295819/scripts
// @description   blah!
// @include       *
// ==/UserScript==

//remove "javascript:" line before uploading to userscripts
//javascript:
var url = "http://10.10.2.15/0:3600:86400:";
var x = document.getElementsByTagName("a");
if(x.length==1)
{
	var y = x[0].href.toString();
	var z = y.substring(0,31);
	if(z==url)
		{
			window.location=x[0].href;

		}
}
