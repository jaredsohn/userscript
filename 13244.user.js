// Google Photo Link with Flickr
//
// Version 1.0
//
// Date Written: 2007-10-23
// Last Modified: 2007-10-23 7:56 PM (19:56)
//
// (c) Copyright 2007 Ali Karbassi.
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
// select "Google Photo Link with Flickr", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// After the facebook profile page is loaded, it finds all the
// applications that your friends have invited you to and blocks them.
// Do not worry though, you can go to
// http://facebook.com/privacy.php?view=platform&tab=all and unblock
// them
//
// NOTE: This does not alter, delete, edit, add, or anything else to
//       your facebook profile. Just remove or disable this script and
//       everything will be displayed the same as it used to
// --------------------------------------------------------------------
//
// ==UserScript==
 
// @name        Google Photo Link with Flickr 1.0
// @author      Ali Karbassi
// @namespace   http://www.karbassi.com
// @description Replaces the link on the Google Bar that says Photo from going to Picasa to Flickr.
// @include     http://*.google.com*
// @include     http://google.com*

// ==/UserScript==

(function()
{
	var bar = document.getElementById('gbar').getElementsByTagName('a');
	if(bar)
	{
		for (var i=0; i < bar.length; i++)
		{
			if(bar[i].textContent == 'Photos')
			{
				// Replace the link from Picasa to Flickr; Sorry Google :(
				bar[i].href = 'http://www.flickr.com';

				// Replace the text from Photo to Flickr
				bar[i].textContent = 'Flickr';

				// We found it, so there is no reason to continue.
				break;
			}
		};
	}
	
}());