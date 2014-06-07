// ==UserScript==
// @name          testing
// @namespace     http://userscripts.org/scripts/show/57201
// @description   testing
// @include http://singletrackworld.com/forum/*
// @include http://*.singletrackworld.com/forum/*
// @include https://singletrackworld.com/forum/*
// @include https://*.singletrackworld.com/forum/*
// @match         http://singletrackworld.com/forum/*
// @match         http://*.singletrackworld.com/forum/*
// @match         https://singletrackworld.com/forum/*
// @match         https://*.singletrackworld.com/forum/*
// @version       31 May 2011
// ==/UserScript==;
	
function initialise()
{
	
	if (window.top != window.self)  //-- Don't run on frames or iframes
		return;

	var $ = unsafeWindow.jQuery;
	alert("test");
	alert("hello world");
	alert($("a").hide());
}
initialise();

