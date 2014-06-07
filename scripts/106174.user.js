// ==UserScript==
// @name			Google Search New Tab
// @namespace		google_blank.user.js
// @description		Adds a target_blank to links so that they can open in a new tab.
// @include			http://www.bing.com/
//
//	By Joe McCann (joe@subprint.com) | www.subprint.com
//
// ==/UserScript==



$('a').each(function()
{
	$(this).removeAttr('onmousedown');
	$(this).attr('target', '_blank');
});

