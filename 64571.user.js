// ==UserScript==
// @name           funkykilla
// @namespace      http://forum.funkysouls.com/
// @description    C18@0=85 @548@5:B0
// @include        http://forum.funkysouls.com/*
// ==/UserScript==
var links = document.getElementsByTagName('a');
var re = /http:\/\/forum.funkysouls.com\/go\.php\?(.*)/;
for (var i = 0, l = links.length; i < l; i++)
{
	links[i].href = unescape(links[i].href.replace(re, "$1"));
}