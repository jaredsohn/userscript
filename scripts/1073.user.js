// By Michael Bierman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// comments, suggestions, complaints to: greasemonkey@thebiermans.net
// ==UserScript==
// @name          Title Scrubber - V 0.2.1
// @description	  Cleans web site titles
// @include       http://*
// @exclude       http://gmail.google.com/*
// @exclude       http://HomeDepot.com/*
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
// select "Title Scrubber", and click Uninstall.
//
// --------------------------------------------------------------------
//
//  WHAT IT DOES:
//  This script removes common garbage in document titles like "Welcome", "Welcome to" etc. 
//  Titles that are modified are marked with a &raquo;  ÃÂ»  (close chevron-style quotes).

// ==/UserScript==


var mainString = document.title;
var origMainString = document.title;
var replaceStr = "";
// Add your list of things you'd like to banish from document titles here.
var ridMe = new Array("Welcome (to the|to Adobe GoLive|to )\?[,:-]\?","Home( of)\?[, :-]\?", "\<title\>", "(no )\?title[, :-]\?");
var l = ridMe.length;



for (x = 0; x < l; x++)
   {
	var regexp = eval("/" + ridMe[x] + "/gi");
	mainString = mainString.replace(regexp, replaceStr);
	// use for debugging only 
	// alert(ridMe[x] + "\n" + mainString);  
   }
      	//alert(mainString + " 1");
   	var regexp = eval("/" + "^[, \.-]\*/");
   	mainString = mainString.replace(regexp, replaceStr);
   	// alert("=" + mainString + " 2");

   	document.title = mainString;
   	// use for debugging only
   	// alert(mainString);

	if(origMainString == mainString)
	{
	document.title = mainString;
	// alert("No change");
	}
	else {
	document.title = mainString + '\273';
	// alert("Title Modified. Original was:" + origMainString);
	}
	 
