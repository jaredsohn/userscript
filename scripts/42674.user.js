// ==UserScript==
// @name           AH Forums Toggle Corrector
// @namespace      http://userscripts.org/users/81074
// @description    Fixes the AH forum unhide problem
// @include        http://ahforums.com/*
// @include        http://www.ahforums.com/*
// ==/UserScript==

var spacefind  = /java\s+script/;
var replacefix = "javascript";

var p_list = document.getElementsByTagName('p');
for (i=0; i<p_list.length; i++)
{
    var alink = p_list[i].getElementsByTagName('a');
    for (j=0; j<alink.length; j++)
    {
        if (alink[j].getAttribute("href").match(spacefind) != null)
        {
            alink[j].href = alink[j].getAttribute("href").replace(spacefind, replacefix);
        }
    }
}