// ==UserScript==
// @name		Last.fm - Percentage
// @namespace	tag:http://arvixx.blogspot.com,2005-08-14:Last.fm-Percentage.
// @description	Display percentage statistics on user profile. Version 1.2
// @include	http://www.last.fm/user/*
// @include	http://last.fm/user/*
// ==/UserScript==


/*
This is a complete rewrite of http://www.userscripts.org/scripts/show/693  in order to make it work with
Last.fm
- arvid.jakobsson@gmail.com

Changelog:

2007-03-22	1.2
* Meh, forget to fix somethings.
* The percentage wont overflow the bar now.

2007-03-22	1.1
* Pulled myself together and fixed this one
* Added two variables for configuration:
	* ndecimals: this is the number of decimals shown. 
	change this to -1 if you don't want to round the numbers at all. that would be probably be stupid.
	* percentage_treshold: this is the smallest percentage you want shown. 
	change this to 0 if you want all percentages to show, no matter how small

2005-08-14	1.0 
* Initial version

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */

/* CONFIGURATION HERE */

var ndecimals = 1;
var percentage_treshold = 0.5;

/* CONFIGURATION ENDS HERE */

var tracksplayed = $x("//span[preceding-sibling::strong[contains(text(), 'Tracks played:')]]");
if (tracksplayed = parseCommaInt(tracksplayed[0].textContent)) {
	var bars = $x("//td[@class='quantifier']/div/span");
	for (var i = 0, bar = null; bar = bars[i]; i++) {
		var played = parseCommaInt(bar.textContent);
		
		var pow = Math.pow(10, ndecimals);
		var percentage = played / tracksplayed * 100;
		if (ndecimals >= 0) 
			percentage  = Math.round(percentage*pow)/pow;
		
		if (percentage >= percentage_treshold) {
			bar.style.whiteSpace = 'nowrap';
			bar.textContent += " (" + percentage + "%)";
		}
		else
			continue;
		
		bar.parentNode.style.minWidth = (bar.textContent.length/1.75)+'em';
	}
}

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $(id) {
	return document.getElementById(id);
}

function parseCommaInt(str) {
	return parseInt(str.replace(/,/g, ''), 10);
}