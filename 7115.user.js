// ==UserScript==
// @name           Citadel Full Balance Pay
// @description    Automatically fills in the amount owed when transferring to credit card, rather than the minimum payment
// @include https://pcu.citadelfcu.org/asp/users/pcu/Transfer/TransferForm.asp
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

var CARDBRAND = "MASTERCARD";

var mainSelect = document.forms.namedItem("frmTransferSelection").elements.namedItem("ToSuffix");
var selectChildren = mainSelect.options;
var found = -1;
var i = 0;
while (found == -1 && i < selectChildren.length)
{
  found = selectChildren[i].text.indexOf(CARDBRAND);
  if (found != -1)
  {
    var creditOption = selectChildren[i];
    var creditValue = creditOption.value;
    var creditText = creditOption.text;
    var lastDollar = creditText.lastIndexOf("$");
    var payOff = creditText.substring(lastDollar + 1, creditText.indexOf(".", lastDollar) + 3);
    creditOption.value = creditValue.substring(0, creditValue.lastIndexOf(";") + 1) + payOff;
  }
  i++;
}
