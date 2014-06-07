/******************************************************************************
 *
 * Google Media Search - Gives media searching quick links.
 * Version 0.1 - 2005-09-05
 * Copyright (c) 2005, Stephen Paulger
 * http://www.newspeak.org.uk/
 * stephen-dot-paulger-at-newspeak-dot-org-dot-uk
 *
 * Thanks to Mark Pilgrim for his book at http://diveintogreasemonkey.org/
 *
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
// @name           Google Media Search
// @namespace      http://www.newspeak.org.uk/greasemonkey/
// @description    Gives quicklinks for search strings to find directories of media files
// @include        http://www.google.co*/
// ==/UserScript==
var f = document.getElementsByTagName('form')
var t = f[0].getElementsByTagName('table')
var tb = t[0].getElementsByTagName('tbody')
tb[0].innerHTML = tb[0].innerHTML + "<tr><td align=\"center\"><font size=\"-1\"<a href=\"javascript:void(0);\" class=\"q\" id=\"mu\">Music</a> <a href=\"\" class=\"q\"id=\"vi\">Video</a></font></td></tr>"
document.getElementById('mu').addEventListener('click', function(e) {
	var f = document.getElementsByName('q')
	f[0].value = f[0].value + " -inurl:(htm|html|php) intitle:\"index of\" +\"last modified\" +\"parent directory\" +description +size +(mp3|ogg|wma)"
	e.stopPropagation();
	e.preventDefault();
}, true);
document.getElementById('vi').addEventListener('click', function(e) {
	var f = document.getElementsByName('q')
	f[0].value = f[0].value + " -inurl:(htm|html|php) intitle:\"index of\" +\"last modified\" +\"parent directory\" +description +size +(avi|mpg|wmv|mov)"
	e.stopPropagation();
	e.preventDefault();
}, true);
