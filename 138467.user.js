// ==UserScript==
// @name        Wishing Well
// @namespace   userscripts.org
// @description Fills in Amount of Donation/Item
// @include     *neopets.com/wishing.phtml*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var bet = 21;
// var item = 'Bag of Peanuts';

$("input[name='donation']").val(bet);
// $("input[name='wish']").val(item);