// ==UserScript==
// @name        Boerse BZ Spoiler Opener
// @namespace   asdfgh4xx0r
// @description Alle Spoiler automatisch öffnen
// @include     http://www.boerse.bz/*
// @version     1
// @grant       none
// ==/UserScript==

var elements = document.getElementsByClassName("wrap-spoiler");
	
	for(var i = 0; i < elements.length; i++)
    {
        if(elements[i].firstChild.firstChild.className == 'head-spoiler folded')
            spoiler(elements[i]);
    }