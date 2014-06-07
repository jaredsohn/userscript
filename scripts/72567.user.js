// ==UserScript==
// @name           geocaching.com - attribute titles
// @namespace      http://www.dzitrone.de
// @description    Adds titles to the attribute pictures, so you can read the description by hovering the mouse over them
// @include        http://www.geocaching.com/*
// ==/UserScript==

imgs = document.getElementsByTagName("img");

for(i=0;i<imgs.length;i=i+1)
{
	if(imgs[i].title == "")
	{
		imgs[i].title = imgs[i].alt;
	}
}