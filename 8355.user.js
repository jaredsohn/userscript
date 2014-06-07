// Washingtonpost.com Print User Script
// 2007-04-11
// Copyright (c) 2007, Tom Kropf
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
// select "Washingtonpost.com Print", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Washingtonpost.com Print
// @namespace     http://swanky.de/greasemonkey/
// @description   Directly link to the print version of Washington Post articles.
// @source        http://userscripts.org/scripts/show/8355
// @include       http://*washingtonpost.com/*
// @version       0.0.2
// ==/UserScript==

// Squirrels are your friends!

var all, element;

all = document.getElementsByTagName('a');

for (i=0; i < all.length; i++)
	{
	element = all[i];
                if (
			(element.href.indexOf("/wp-dyn/content/article/") != -1)
			|| (
				(element.href.indexOf("/wp-dyn/content/blog/") != -1)
				&& (element.href.indexOf("/wp-dyn/content/blog/") !=-1)
			    )
			|| (
				(element.href.indexOf("/wp-dyn/content/discussion/") != -1)
				&& (element.href.indexOf("/wp-dyn/content/discussion/") !=-1)
			    )
		    ) {
		element.href = element.href.replace (/.html/g, '_pf.html');
		}
	}

// 0.0.1	Initial release.
// 0.0.2        Included blog posts and articles on mywashingtonpost. Thanks to Adam Queler for the suggestions.