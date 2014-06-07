// ==UserScript==
// @id             fefe dates 2
// @name           fefe dates 2
// @description    Ersetzt auf blog.fefe.de das [l] in den Pro-Post-Links durch das Post-Datum.
// @version        2.0
// @author         arbu (original: flying sheep)
// @include        http://blog.fefe.de/*
// @include        https://blog.fefe.de/*
// @run-at         document-end
// @grant          GM_addStyle
// ==/UserScript==
GM_addStyle('body > h3 + ul > li > a[href^="?ts="] {color: black; text-decoration: none; margin-right: 1ex}');
for(var i = 3; i < document.links.length; i++) if(document.links[i].text == '[l]' && document.links[i].search.indexOf('?ts=') == 0) document.links[i].text = '[' + new Date((parseInt(document.links[i].search.substring(4), 16) ^ 0xfefec0de) * 1000).toLocaleTimeString() + ']';