// ==UserScript==
// @name        GW2 Forums 'I Trust The Links' script (EN)
// @namespace   https://forum-en.guildwars2.com/
// @description Remove the external content warning and just show me the link.
// @include     https://forum-en.guildwars2.com/*
// @version     1.1
// ==/UserScript==
var a, links;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++)
{
    a = links[i];
    var str = a.href;
    if(str.indexOf("external?l=") >= 0)
    {
        a.href = decodeURIComponent(str.replace("https://forum-en.guildwars2.com/external?l=", ""));
        a.target = "_blank";
    }
}