// ==UserScript==
// @name           Fix formating for the State
// @description    Make articles on The State have only one column
// @namespace      http://blog.voyou.org/
// @include        http://www.thestate.ae/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js

// ==/UserScript==

$('td:has(p)').css('display', 'block').css('min-width', '30em');
$('td:not(:has(*))[width]').css('display', 'none');

$('#footnote ol').append($('td > li')).remove($('table'));
