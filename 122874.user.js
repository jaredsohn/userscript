// ==UserScript==
// @name           ING-Diba.at account number autocomplete
// @namespace      http://wetzlmayr.at/
// @description    Allow account number autocomplete on ING-Diba.at 
// @include        https://banking.ing-diba.at/online-banking/start.do*
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$('input[name="kosnr"]').removeAttr('autocomplete');