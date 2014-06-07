// Imdb.com Plot Keywords Removal Script
// version 1.0
// 2007-06-06
// Copyright (c) 2007, Ken Murdock
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
// select "Imdb.com Plot Keywords Removal Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Imdb.com Plot Keywords Removal Script
// @description    Remove the Plot Keywords section from Imdb.com pages.
// @include        http://imdb.com/title/*
// @include        http://*.imdb.com/title/*
// ==/UserScript==

// Fill an array with all div objects
var arrDiv = document.getElementsByTagName('div');

// Iterate through div objects
for( var i=0; i<arrDiv.length; i++ )
{
	// Only test div objects which contain exactly one <h5> tag
	if( arrDiv[ i ].getElementsByTagName('h5').length == 1 )
	{
		// Test for the appropriate string
		if( arrDiv[ i ].getElementsByTagName('h5')[0].textContent == "Plot Keywords:" )
		{
			// Remove desired object, then exit
			arrDiv[ i ].parentNode.removeChild( arrDiv[ i ] );
			return;
		}
	}
}
