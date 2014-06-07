// ==UserScript==
// @name           Board Logo Link Fix
// @namespace      Bangsholt
// @description    Changes the board logo link to forum instead of portal
// @include        http://board.ogame.*
// ==/UserScript==

var URLs;

{
	URLs = document.getElementById('logo').getElementsByTagName('a');
		for (var i = 0, URL; URL = URLs[i]; i++) 
		{
			URL.href = URL.href.replace('Portal','Index');	
		}
}