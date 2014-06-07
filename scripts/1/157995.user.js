// ==UserScript==
// @name	Script
// @namespace	http://userscripts.org/scripts/review/156690
// @author	Navin
// @version	0.71
// @description	Just a test script
// @include	http*://whentheycry.wikia.com/*/*
// ==/UserScript==

function init()
{
	$("#true-random-integer-generator-result").each(function()
	{
		$(this).text('XXX');
	});
}

init();