// ==UserScript==
// @name           Izklop Znanost
// @namespace      http://userscripts.org
// @description    Znanost na izklopu preimenuje v Bullshit
// @include        http://www.izklop.com/*
// @version        0.1 - 23th Dec 2009
// ==/UserScript==
//

var links = document.getElementsByTagName("a")
for (i = 0; i<links.length; i++)
{
   if (links[i].innerHTML == "Znanost")
      links[i].innerHTML = "Bullshit";
}
