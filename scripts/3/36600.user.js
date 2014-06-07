// ==UserScript==
// @name 	YouTube High Qual Movies Only
// @namespace 	LarzI aka. D'x-Orzizt
// @include 	http://www.youtube.com/watch?*
// ==/UserScript==

function ExtScr(dat)
{
	if(document.URL.search("&fmt=18") == -1)
	{
		window.location.search += dat;
	}
}
ExtScr('&fmt=18')