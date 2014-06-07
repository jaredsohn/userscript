// ==UserScript==
// @name          Live Leak Comments
// @namespace     http://deadestsystem.info
// @description   makes comments on every liveleak page there
// @include       http://liveleak.com/view*
// @include       http://*.liveleak.com/view*
// ==/UserScript==


url = document.location + ""
if (url.search('&') < 1) 
{
	document.location.href = document.location + "&c=1";
}