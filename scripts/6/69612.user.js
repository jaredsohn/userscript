// ==UserScript==
// @name           GP_RemoveNavTab
// @namespace      http://userscripts.org/scripts/show/69612
// @description    Removes the navigation tab at the top of GPForums
// @include        http://www.gpforums.co.nz/*
// ==/UserScript==
var divs = document.getElementsByTagName("DIV");
for (i = 0; i < divs.length; i++)
{
    if (divs[i].className == 'netbar')
    {
        var parent = divs[i].parentNode;
        parent.removeChild(divs[i]);
    }
}