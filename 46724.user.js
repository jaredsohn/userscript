// ==UserScript==
// @name           Gaia Online Easter Egg Clicker
// @namespace      Gaia Online Easter Egg Clicker
// @description    Leave it on and browse Gaia, this will do the egg finding for you
// @include        http://www.gaiaonline.com/*
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