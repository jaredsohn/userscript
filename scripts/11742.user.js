// Remove Facebook Application Icons
//
// Version 1.0
//
// Date Written: 2007-08-26
//
// Copyright (c) 2007, Ali Karbassi
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
// select "Remove Facebook Application Icons", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// After the facebook profile page is loaded, it 'removes' the list
// of application icons under the person's profile. By remove, I mean,
// not display them.
//
// NOTE: This does not alter, delete, edit, add, or anything else to
//       your facebook profile. Just remove or disable this script and
//       everything will be displayed the same as it used to
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Remove Facebook Application Icons
// @namespace      http://tech.karbassi.com/
// @description    Removes applications icons from all profiles
// @include        http://*.facebook.com/*
// ==/UserScript==


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var elements = getElementsByClass('app_icon');
for(var i = 0; i < elements.length; i++)
{
	elements[i].style.display = 'none';
	elements[i].style.padding = '0';
	elements[i].style.margin = '0';
}