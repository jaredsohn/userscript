// ==UserScript==
// @name        Deviantart scrub links
// @namespace   http://jogai1.deviantart.com/
// @description Scrubs outgoing links on deviantart so you dont have to confirm leaving DA
// @include     http://*.deviantart.com/*
// @include     http://deviantart.com/*
// @include     https://*.deviantart.com/*
// @include     https://deviantart.com/*
// @exclude     https://my.deviantart.com/*
// @version     0.5
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant	none
// ==/UserScript==

$('a.external').each(function (index) {
	var url = $(this).attr('href');
	var real = url.substr(1+url.indexOf("?http"), url.length);
	$(this).text(real);
	$(this).attr('href', real);
});