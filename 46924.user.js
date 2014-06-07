// ==UserScript==
// @name          PocketPCFreak Wide Screen Homepage
// @description   Streches PocketPCFreack.co.il homepage to wide screen
// @include       http://www.pocketpcfreak.com/*
// ==/UserScript==

var links = document.getElementsByTagName("td");
for (var i = 0; i < links.length; i++) 
{
    if(links[i].width == 810)
    {
        links[i].width = "100%"
    }
}