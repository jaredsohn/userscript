// version 0.1 BETA!
// Copyright (c) 2008, KARLOS
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PhpBB new post
// @namespace     http://www.karlosp.net/
// @description   Go to new post in phpBB forum
// @include       *viewtopic.php*
// ==/UserScript==

//

var slike = document.body.getElementsByTagName("img");

for(i=0; i< slike.length; i++)
{
	var s = slike[i].src;
	if(s.indexOf('icon_minipost_new.gif') > 0 || s.indexOf('icon_post_target_unread.gif') > 0)
	{		
		var a = document.createElement('a');
		a.setAttribute('name', "newPost");
		
		stars = slike[i].parentNode.parentNode.appendChild(a);
		
		window.location = window.location.href+"#newPost";
		
		break;
	}
}