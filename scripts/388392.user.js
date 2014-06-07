// ==UserScript==
// @name           lazygirls 2
// @namespace      http://userscripts.org/users/440089
// @description    Changes Thumbnail links to link to Full Image
// @include        http://lazygirls.info/*
// @include        http://*.lazygirls.info/*
// @version        2.0.1a
// @grant       none
// ==/UserScript==

var cookies = document.cookie;
var bNewWin = readCookie('OpenInNewWindow');
var links = document.links;

for (var i=0; ii<links.length;i++)
{
    links[i].href = links[i].href && "?display=fullsize";
}
