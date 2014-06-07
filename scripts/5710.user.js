// ==UserScript==
// @name 		tt-news.de "neue Beiträge" Kategorien-Filter
// @namespace 		http://userscripts.org/scripts/show/5710
// @description 	Dieses Skript entfernt Zeilen, die auf der Seite "neue Beiträge" Worte der Filterliste enthalten.
// @source         	http://userscripts.org/scripts/show/5710
// @version        	0.2
// @date           	2007-07-21
// @creator        	Pepino <pepino@jabber.ccc.de>
// @include 		http://forum.tt-news.de/search.php*
// ==/UserScript==
// 
// **COPYRIGHT NOTICE**
// 
// Copyright (C) 2006 and onwards Pepino
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
// 
// **END COPYRIGHT NOTICE**
//
//
// Changelog:
// 0.2 (2007-07-21)
// 	change to new subdomain/path
// 
// 0.1 (2006-09-28)
// 	original release
// 
// -------------------------------------------------------------------------------------------------

// This is where you enter the forum sections you want to filter out.
var filter_keywords = new Array ("Bezirk ", "Kreis ", "TTV ", " TTV", "Westdeutscher ", "Sächsischer ", "Hessischer ", "Bayern ", "Bayerischer ", "Bugs / Fehler", "Anregungen, Vorschläge ", "FTT ", "Effeltrich", "Oberboihingen", "Notfall");


// Don't edit below this line unless you know what you are doing!
var allElements, thisElement;
allElements = document.getElementsByTagName('tr');
for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];
	for (var n = 0; n < filter_keywords.length; n++) {
		if(i>6){
			if(thisElement.innerHTML.indexOf(filter_keywords[n])!=-1)
			{
				thisElement.style.display = 'none';
			}
		}
	}
}
