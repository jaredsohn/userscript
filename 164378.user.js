// ==UserScript==
// @name       Nordea Red Negative Numbers
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Colors negative numbers red in the danish Nordea internet bank
// @match      https://www.nordeanetbank.dk/*
// @copyright  2012+, You
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
$('td').filter(function () {return $(this).text().trim().indexOf('-') == 0;}).css('color', 'red');