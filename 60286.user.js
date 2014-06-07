// ==UserScript==
// @name           Joker Spoiler Mouseover
// @description    Name says it all
// @include        http://www.joker.si/mn3njalnik/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.3
// ==/UserScript==

$(document).ready(function() {
	$('span[style="color:#000000;background:#000000"]').addClass("spoiler");
	$('span[style="color: rgb(0, 0, 0); background: none repeat scroll 0% 0% rgb(0, 0, 0);"]').addClass("spoiler");
	$('.spoiler').mouseover(function() {
		$(this).css("color", "#FFFFFF !important");
	}).mouseout(function() {
		$(this).css({color: "black !important"});
	});
})