// Imdb.com Search Focus
// version 0.1
// 2007-07-05
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
// select "Imdb.com Info Hide Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Imdb.com Search Focus Script
// @author         Ken Murdock
// @namespace      http://www.badaids.com
// @description    Focuses keyboard input to the search box on Imdb.com pages.
// @include        http://imdb.com/*
// @include        http://*.imdb.com/*
// ==/UserScript==

// Find the search div at the top of the page
var searchDiv = document.getElementById( 'nb15search' );
if( searchDiv != undefined )
{
	// Get an array of all input objects
	var inputArray = searchDiv.getElementsByTagName( 'input' );
	
	// Iterate through the array
	for( var i=0; i<inputArray.length; i++ )
	{
		// Find the search box we're looking for
		if( inputArray[ i ].name == 'q' )
		{
			// Set keyboard focus, and return
			inputArray[ i ].focus();
			return;
		}
	}
}
