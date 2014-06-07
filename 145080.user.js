// ==UserScript==
// @name        Neopets: Training - SDB Link
// @namespace   userscripts.org
// @include     http://www.neopets.com/island/training.phtml?type=status
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$("td:contains('This course has not been paid for'):last p").before("<br><br><b><a href='http://www.neopets.com/safetydeposit.phtml?offset=0&obj_name=&category=2' target=_blank>Check SDB</a></b><br>");