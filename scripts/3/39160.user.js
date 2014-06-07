// ==UserScript==
// @name          HARDWiRED - Karácsonyi logó
// @description   Lecseréli a jelenlegi logót a HARDWiREDen karácsonyira. Készítette: Miklós "TnS" Végvári.
// @namespace     http://greasemonkey.mozdev.com
// @include       http://www.hardwired.hu/*
// @include       http://hardwired.hu/*
// ==/UserScript==

(function()
{
	var addresses = document.getElementsByTagName('img');
	for ( var i = 0; i < addresses.length; ++i )
	{
		addresses[i].src = addresses[i].src.replace("/hwlogo.jpg", "/hwlogo_christmas2004_2.jpg");
	}
})();