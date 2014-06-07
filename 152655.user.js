// ==UserScript==
// @name            Yarolds Exchange Cycler
// @namespace       Yarolds
// @description     Cycles between the exchange pages
// @include         http://swle.yarold.eu/main.php?s=-1
// @include         http://swle.yarold.eu/history.php#tab1
// @include         http://swle.yarold.eu/dynasty_ex.php?s=3
// @include         http://swle.yarold.eu/history.php#tab2
// @version         1.0.9
// @copyright       2012+, DemonicJ & the crazy crew from The Mob
// @updateURL       https://userscripts.org/scripts/source/152655.meta.js
// @downloadURL     https://userscripts.org/scripts/source/152655.user.js
// @homepage	    http://swle.yarold.eu
// ==/UserScript==

// Update the following array with your own urls, these should match the @include lines above
var cycleUrls = new Array('http://swle.yarold.eu/main.php?s=-1','http://swle.yarold.eu/history.php#tab1','http://swle.yarold.eu/dynasty_ex.php?s=3','http://swle.yarold.eu/history.php#tab2');
var cycleDuration = 15000;  // 15 seconds, change to suit your needs
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