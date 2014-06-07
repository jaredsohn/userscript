// ==UserScript==
// @name           eBay Questions Default Subject
// @namespace      www.prism.gatech.edu/~mflaschen3/
// @description    Automatically sets the subject of an eBay question to "General Question About This Item", then sets focus to text box.
// @include        http://contact.ebay.*/ws/eBayISAPI.dll?ShowCoreAskSellerQuestion*
// ==/UserScript==

/*  Copyright (C) 2008 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>
    
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

var subSelect = document.getElementById("focusObj");
subSelect.selectedIndex = 4; // General question about this item
subSelect.setAttribute("id","subjectBox"); // Ensure id is no longer "focusObj"
var textBox = document.getElementById("message_help").parentNode.firstChild;
textBox.setAttribute("id", "focusObj"); // Change default focus to text box.
textBox.value = ""; //blank
