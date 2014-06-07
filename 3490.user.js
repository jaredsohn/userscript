// ==UserScript==
// @name           Google Firefox start fixes
// @description    Adds I'm Feeling Lucky to Google Firefox start page
// @include        *google.com/firefox*
// ==/UserScript==

/*  Copyright (C) 2006 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    The GPL is also available from my site, at http://www.prism.gatech.edu/~mflaschen3/gpl.txt 
*/

var ifl=document.createElement("INPUT");
ifl.setAttribute("type","submit");
ifl.setAttribute("name","btnI");
ifl.setAttribute("value","I'm Feeling Lucky");

var queryBox=document.getElementById("sf");
var wholeCell=queryBox.parentNode;
wholeCell.appendChild(ifl);

var styles = '<style type="text/css">input {margin: 3px 5px 0 0;}</style>';
document.body.innerHTML += styles;
