// ==UserScript==
// @name        EqD Navigate Header
// @namespace   drnick
// @include     http://www.equestriadaily.com/*
// @grant       none
// @version     1.2.1
// ==/UserScript==

var nav = $("#blog-pager").clone().insertBefore("#Blog1");

var darr = $("<a href='javascript:;'>&darr;</a>").click(function (e) {
	$("html").animate({ scrollTop: $("li.blog-post").last().offset().top - 70}, 0);
});

var uarr = $("<a href='javascript:;'>&uarr;</a>").click(function (e) {
	$("html").animate({ scrollTop: 0}, 0);
});

var home = $("a.home-link");
home.css("margin", "1em");

darr.insertBefore(home);
uarr.insertAfter(home);
