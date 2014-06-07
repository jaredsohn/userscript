// ==UserScript==
// @name           100% Width Tables
// @namespace      Appearance
// @description    Makes all the table widths 100%, thus making the acidtech theme not look like crap
// @include        http://www.skulltag.com/forum/*
// ==/UserScript==

(function()
{
	elm = document.getElementsByTagName('TABLE');
	for(var i=0;i<elm.length;i++)
		elm[i].width = "100%";
})();