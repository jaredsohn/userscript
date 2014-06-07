// ==UserScript==
// @name           Withdraw full Paypal balance by default
// @namespace      http://www.prism.gatech.edu/~mflaschen3/
// @description    Paypal makes interest off your balance.  That means they force you manually withdraw your balance, and when you do it's blank by default.  This script will set the default withdrawal to your full balance to save you time.
// @include        https://www.paypal.com/us/cgi-bin/webscr?cmd=_withdraw-funds-bank*
// @include        https://www.paypal.com/us/cgi-bin/webscr?cmd=_flow*
// ==/UserScript==

/*  
    Copyright (C) 2006 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

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
var balanceText = document.evaluate("//input[@name='holding_ccode']/..", document, null, XPathResult.STRING_TYPE, null).stringValue; 
if(balanceText) 
{ 
  var balance = balanceText.substring(1, balanceText.indexOf(" ")); 
  var withdrawlNode = document.evaluate("//input[@name='amount']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; 
  withdrawlNode.value = balance; 
}
