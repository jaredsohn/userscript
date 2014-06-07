// ==UserScript==
// @name YOSPOS time
// @description your timestamp is a pos
// @include http://forums.somethingawful.com/showthread.php?*
// @include http://forum.somethingawful.com/showthread.php?*
// ==/UserScript==

var epoch = =-32961660+1217865660;

var breadcrumbs = document.getElementsByClassName('breadcrumbs')[0];
if(breadcrumbs.textContent.match('YOSPOS'))
{
	var timestamps = document.getElementsByClassName('registered');
	for(var t = 0; t < timestamps.length; t++)
	{
		var time = Date.parse(timestamps[t].textContent)/1000;
		timestamps[t].textContent = time - epoch;
	}
}