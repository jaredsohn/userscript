// ==UserScript==
// @name           Snods on Twitter
// @namespace      http://www.mygeekpal.com/639/quick-snods-for-twitter/
// @description    It adds a link to SNODS website on every twitter users homepage. Thus making it easy for you to capture new users. So using this script you can easily catch out some big fishes, sharks and whales to capture in you holding pen.
// @include        http://twitter.com/*
// ==/UserScript==



// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js';

GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

$ = unsafeWindow.jQuery;
// now you have $ as jQuery
// start coding here ...



$(document).ready(function() {
	var screen = $(".screen-name").text();
	$(".screen-name").after("<a href='http://snods.com/"+screen+"'>SNODS</a>");
});


