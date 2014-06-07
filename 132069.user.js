// ==UserScript==
// @name           Drawception: Fix misalignment
// @namespace      Jeremy Geels
// @description    This script fixes the misalignment glitches that have been found so far.
// @include        *drawception.com/player/*
// ==/UserScript==

var elms = document.getElementsByClassName("sm");

for(var i = 0; i < elms.length; i++)
{
	if(elms[i].innerHTML.replace(/^\s\s*/, '').replace(/\s\s*$/, '').substring(0,4) == "<img")
	{
		elms[i].getElementsByTagName("img")[0].setAttribute("height", "15");
	}
}