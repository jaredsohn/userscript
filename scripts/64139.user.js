// ==UserScript==
// @name           Goldbar
// @namespace      http://userscripts.org/users/98858
// @description    Alternative style for gold members names on Facepunch.
// @include        http://www.facepunch.com/*
// @match          http://www.facepunch.com/*
// ==/UserScript==

var fonttags = document.getElementsByTagName("font");
for (i = 0; i < fonttags.length; i++)
{
    if (fonttags[i].color = "#A06000")
    {
        var s = fonttags[i].style;
        s.background = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#DD9922), to(#A06000))";
        s.padding = "0 5px 0 5px";
        s.color = "#FFFFFF";
        s.textShadow = "0 0 3px #FFFFFF";
    }
}