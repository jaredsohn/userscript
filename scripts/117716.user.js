// ==UserScript==
// @name          Google+ What's New killer
// @namespace     http://www.schlitz.polizz.com/g+wnk
// @description   Remove the What's New item from user stream
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include https://plus.google.com/*
// @version       1.0
// ==/UserScript==

$("h2:contains('Stream')").next('div').find('div:first').remove();