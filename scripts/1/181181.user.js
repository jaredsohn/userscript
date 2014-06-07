// ==UserScript==
// @name        Always Request GitP PM Receipt
// @namespace   com.tuggy.nathan
// @description Check that there little box to make sure receipts are asked for, 
//                instead of having to remember it each time.
// @include     http://www.giantitp.com/forums/private.php?do=newpm
// @version     1.0.00
// ==/UserScript==

/*  This is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    For a copy of the GNU General Public License, see 
    <http://www.gnu.org/licenses/>.
*/

var check = document.getElementById("cb_receipt");
if (check) {
  check.checked = true;
}
else {
  // Complain
  GM_log("no checkbox!");
}