// ==UserScript==
// @name           Steam Forums Spoiler Tag Fix
// @namespace      http://userscripts.org/scripts/show/
// @description    Steam Forums Spoiler Tag Fix, rahter self explanatory
// @include        http://forums.steampowered.com/forums/*
// @date           2010-10-06
// @creator        mkey
// ==/UserScript==

	var s= document.getElementsByClassName("spoiler");
	for (var i=0; i<s.length; i++) s[i].setAttribute("style", "color:black; background-color:black;");

