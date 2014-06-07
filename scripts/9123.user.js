// ==UserScript==
// @name           Fix whattoexpect.com for Firefox.
// @namespace      tag:brainonfire.net,2007-05-08:fixwhattoexpect
// @description    Currently only fixes the dropdown menus at the bottom of the main page. (Implements window.navigate(), to be exact.)
// @include        http://whattoexpect.com/*
// @include        http://www.whattoexpect.com/*
// ==/UserScript==

unsafeWindow.navigate = function(url)
{
	var startsWithSlash = /^\/.+$/;
	if(startsWithSlash.test(url))
	{
		location.pathname = url;
	}
}