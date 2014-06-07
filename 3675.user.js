/******************************************************************************
 *
 * Google Media Search 0.2.2 - Gives media searching quick links.
 * Version 0.2.2 - 2006-03-31
 * Copyright (c) 2005, Stephen Paulger
 * Appended by Adam Pense, (c) 2006
 * http://www.newspeak.org.uk/
 * stephen-dot-paulger-at-newspeak-dot-org-dot-uk
 *
 * Thanks to Mark Pilgrim for his book at http://diveintogreasemonkey.org/
 *
 * Be my (adam's) Blingo friend!  http://www.blingo.com/friends?ref=652y74evcWNBUObPd2s7InvbB7M
 ******************************************************************************
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to:-
 *
 * Free Software Foundation, Inc.,
 * 51 Franklin Street,
 * Fifth Floor, Boston,
 * MA  02110-1301, USA.
 *
 ******************************************************************************/

// ==UserScript==
// @name           Google Media Search 0.2.2
// @description    Gives quicklinks for search strings to find directories of media files
// @include        http://www.google.tld/*
// @exclude	   http://www.google.tld/advanced_search*
// ==/UserScript==
var f = document.getElementsByTagName('form')
var t = f[0].getElementsByTagName('table')
var tb = t[0].getElementsByTagName('tbody')
tb[0].innerHTML = tb[0].innerHTML + "<tr><td align=\"center\"><font size=\"-1\"<input type=\"radio\" name=\"ex\" id=\"none\">Normal</input> <input type=\"radio\" name=\"ex\" id=\"mu\">Music</input> <input type=\"radio\" name=\"ex\" id=\"vi\">Video</input> <input type=\"radio\" name=\"ex\" id=\"eb\">E-Book</input></font></td></tr>"
var mu = " -inurl:(htm|html|php) intitle:\"index of\" + \"last modified\" +\"parent directory\" +description +size +(mp3|ogg|wma)"
var vi = " -inurl:(htm|html|php) intitle:\"index of\" + \"last modified\" +\"parent directory\" +description +size +(avi|mpg|wmv|mov)"
var eb = " -inurl:(htm|html|php) intitle:\"index of\" +(\"/ebooks\"|\"/book\") +(chm|oeb|opf|pdf|ps|rtf|tex|xml|zip)"
document.getElementById('mu').addEventListener('click', function(e) {
	var f = document.getElementsByName('q')
	f[0].value = f[0].value + mu
}, true);
document.getElementById('vi').addEventListener('click', function(e) {
	var f = document.getElementsByName('q')
	f[0].value = f[0].value + vi
}, true);
document.getElementById('eb').addEventListener('click', function(e) {
	var f = document.getElementsByName('q')
	f[0].value = f[0].value + eb
}, true);

