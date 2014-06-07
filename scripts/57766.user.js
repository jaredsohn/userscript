// ==UserScript==
// @name           Mousehunt/MythMonger news feed remover
// @namespace      hirak99
// @description    No news flash please!
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.facebook.com/mythmonger/*
// ==/UserScript==
divs = document.getElementsByTagName('div');

for (i=0; i<divs.length; ++i)
	if (divs[i].id.indexOf('newsfeed')>-1)
		divs[i].parentNode.removeChild(divs[i]);
