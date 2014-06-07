// ==UserScript==
// @name           Gaia Online Easter Egg Finder
// @namespace      Gaia Online Easter Egg Finder
// @description    Go to your mygaia page, and just leave this on.
// @include        http://www.gaiaonline.com/mygaia/
// ==/UserScript==

if(document.getElementById("easter_egg"))
{
	var href = document.getElementById("easter_egg").childNodes[1].href;
	window.open(href);
	stop();
}
else
{
	stop();
}

// They appear every 20-35 seconds, i chose the median.
setTimeout("window.location.reload()",35000); 