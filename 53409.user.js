// ==UserScript==
// @name           [Digg] No Ads
// @namespace      http://userscripts.org/users/86742
// @include        http://digg.com/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');

for(i=0;i<divs.length;i++)
{
	if(divs[i].className.substr(0, 3) == 'ad ')
		divs[i].parentNode.removeChild(divs[i]);
}