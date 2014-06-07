// ==UserScript==
// @name           Hide Credit Card Numbers
// @description    Will change the type of any text field with maxlength >= 15 and <= 16 to password.  This makes the field display only asterisks or dots.  Note that this is meant to prevent people from reading over your shoulder (and determines how/if your browser remembers the field), and does not secure the underlying data in any way.
// @include        *
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

// ==/UserScript==

var MINLENGTH = 15;
var MAXLENGTH = 16;

var inputs = document.evaluate(
"//input[@maxlength]",
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var curLength;
for(var i = 0; i < inputs.snapshotLength; i++) 
{
	curLength = parseInt(inputs.snapshotItem(i).getAttribute("maxlength"));
	if(curLength >= MINLENGTH && curLength <= MAXLENGTH)
		inputs.snapshotItem(i).setAttribute("type", "password");
}


