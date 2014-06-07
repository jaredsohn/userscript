// ==UserScript==
// @name           Google+ What's Hot killer
// @namespace      http://www.schlitz.polizz.com/2097
// @include        https://plus.google.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("a:contains('Hot on Google+')").parent('div').parent('div').parent('div').parent('div').parent('div').parent('div').remove();