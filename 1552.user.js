// Metafilter Post Button Switcheroo
// version 0.1
// 2005-08-19
// Copywrong (c) 2005, Edible Energy
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
// select "MeTaFi PostButtonMover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MeTaFi PostButtonMover
// @description   Switches the post button and the preview button, for would-be previewers with itchy post fingers.
// @include       http://*.metafilter.com/*
// ==/UserScript==
//Switch the Post button and the Preview button

if(document.getElementById("postButton"))
{
prevrow2 = document.getElementById("prevRow2");
input = prevrow2.getElementsByTagName("input");
post = input.item(0);
preview = input.item(1);
post.parentNode.removeChild(post);
preview.parentNode.appendChild(post);
//Now move the "Or," as it no longer makes any damn sense.
x=0;
while(prevrow2.getElementsByTagName("span").item(x))
{
	if(prevrow2.getElementsByTagName("span").item(x).innerHTML=="OR")
	{
	or = prevrow2.getElementsByTagName("span").item(x);
	}
x++;
}
or.parentNode.removeChild(or);
preview.parentNode.insertBefore(or,post);
}