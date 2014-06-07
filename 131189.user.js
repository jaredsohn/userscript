// ==UserScript==
// @name            URL cycling template
// @namespace       http://far.id.au/
// @description     Cycles between various urls, to activate simply browse to one of the urls in your list
// @include         http://cycleurlone/
// @include         http://cycleurltwo/
// @version         1
// ==/UserScript==

// Update the following array with your own urls, these should match the @include lines above
var cycleUrls = new Array('http://cycleurlone','http://cycleurltwo');
var cycleDuration = 900000;  // 15 minutes, change to suit your needs
var redirectUrl;

for (var i = 0; i < cycleUrls.length; i++)
{
	if (location.href == cycleUrls[i])
	{
		redirectUrl = (i + 1 < cycleUrls.length) ? cycleUrls[i + 1] : redirectUrl = cycleUrls[0];
		setTimeout(urlCycle,cycleDuration);
	}
}

function urlCycle()
{
	location.href = redirectUrl;
}