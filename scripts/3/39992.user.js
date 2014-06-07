
// Mediwar Banking Helper User Script
// version 0.1 
// 2009-01-05
// code by hb009
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Mediwar Banking", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mediwar Banking
// @namespace     http://www.mediwar.com/army/66525
// @description   makes banking in mediwar easier
// @include       http://www.mediwar.com/bank.php
// ==/UserScript==

var amount = document.getElementById('dvGoldHand').innerHTML;
amount=amount.replace(/,/g,'');
document.getElementsByName('txtDepositAmt')[0].value=amount;

