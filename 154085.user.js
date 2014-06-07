// Sueddeutsche.de Readability User Script
// Script sends the Print View of an article automatically to Readability
// You get the best view of an Article easy to read
// 2012-12-13
// Copyright (c) 2012, Frogy
// http://userscripts.org/people/23412
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
// select "Sueddeutsche.de Print", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sueddeutsche.de Print
// @namespace     http://swanky.de/greasemonkey/
// @description   Directly link to the print version of Sueddeutsche Zeitung articles.
// @source        http://userscripts.org/scripts/show/8168
// @include       http://www.sueddeutsche.de/*
// @include       http://sueddeutsche.de/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

var all, element, firstpart, lastpart, lengthlastpart;

all = document.getElementsByTagName('a');
for (i=0; i < all.length; i++) {
	element = all[i];
        if (element.href.indexOf("-1.") != -1) {	 
					firstpart = element.href.substr(0, element.href.lastIndexOf("/") );
					// alert(firstpart);
					lengthlastpart = element.href.length - element.href.lastIndexOf("/");					
					lastpart  = element.href.substr(element.href.lastIndexOf("/"), lengthlastpart );
					// alert ( lastpart);
					element.href = "http://www.readability.com/read?url=" + firstpart + "/2.220" + lastpart;	   		        		
        }
}


// 0.0.1	Initial release.