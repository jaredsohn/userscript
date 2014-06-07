// ==UserScript==
// @name        NAB AutoColour
// @namespace   xtrasimplicity.com
// @description Automatically colours the Credit (Green) & Debit (Red) fields in the Transaction list on NAB's site. For National Australia Bank only.
// @include     https://ib.nab.com.au/nabib/transactionHistoryGetSettings.ctl
// @include     https://ib.nab.com.au/nabib/transactionHistoryDisplay.ctl
// @include     https://ib.nab.com.au/nabib/transactionHistory*
// @version     1.5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$("table tr td:nth-child(3):contains('DR')").css("color","red");
$("table tr td:nth-child(4):contains('CR')").css("color","green");

