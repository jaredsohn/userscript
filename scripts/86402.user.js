// ==UserScript==
// @name           Fuck 2leep
// @namespace      http://userscripts.org/users/renegade
// @description    This script forwards you to the page you actually wanted to visit when you encounter the stupid 2leep holdup page.
// @include        http://2leep.com/news/*
// @include        https://2leep.com/news/*
// @include        http://www.2leep.com/news/*
// @include        https://www.2leep.com/news/*
// ==/UserScript==

if(document.location.href.search(/more\//) == -1) {
	document.location.href += 'more/';
}