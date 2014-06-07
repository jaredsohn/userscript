// ==UserScript==
// @name        Facebook Slidflöde
// @namespace   antongomes.se
// @description Byt texten sidflöde till slidflöde
// @include     http://www.facebook.com/*
// @include     http://facebook.com/*
// @include     https://www.facebook.com/*
// @include     https://facebook.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$('a.item.clearfix div div.linkWrap:contains("Sidflöde")').html('Slidflöde');
$('td.data:contains("Singel")').html('Snigel');