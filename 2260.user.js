
// Just Adventure Link Fixer script
// version 0.1 BETA!
// 1-12-2005
// Copyright (c) 2005, Arnout Lok
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
// select "Just Adventure Link Fixer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Just Adventure Link Fixer
// @description   Turns javascript links to normal links
// @version	  0.1
// @include       http://www.justadventure.com/*
// @include       http://justadventure.com/*
// ==/UserScript==


// Note: I have little knowledge of javascript, 
//	 if you think you can improve this script, feel free to do so.
//
// tested with GreaseMonkey 0.6.4 an Firefox 1.5

(function () 
{
	var allLinks = document.getElementsByTagName('a')
	
	for (var i = 0; i < allLinks.length; i++) 
	{
		var thisLink = allLinks[i];
		if (thisLink.href == "javascript:;" && thisLink.getAttribute("onmousedown") != null )
		{
			// The links we target look like this:
			// <a href="javascript:;" onmousedown="openPictureWindow_Fever('jpg','image.jpg','600','400','title','30','30')">
			// Which must become like this:
			// <a href="image.jpg">
			//
			// So we must extract te second parameter of the 
			// "openPictureWindows_Fever" function and put in in the href
			
			var javascriptUrl	 = thisLink.getAttribute("onmousedown");
			var beginSecondParameter = javascriptUrl.indexOf(",")+2;
			var totalLength		 = javascriptUrl.length;
			var strippedFront	 = javascriptUrl.substring(beginSecondParameter,totalLength);	// strippedFront == image.jpg','600','400','title','30','30')">
			var url			 = strippedFront.substring(0, strippedFront.indexOf(",")-1); 	// url == image.jpg
			
			thisLink.href = url;				// Set the proper url
			thisLink.removeAttribute("onmousedown");	// Remove the onmousedown attribute
		}
	}
})();
