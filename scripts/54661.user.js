// ==UserScript==
// @name           center page layout // Seiten-Layout zentrieren
// @namespace      http://userscripts.org/scripts/show/54661
// @description    Add and remove pages at your leisure. // I've found the script useful on Wikipedia since it shortens the lines, increasing the readability of articles.
// @include        http://*.wikipedia.org/*
// @include        http://*.spiegel.de/*
// ==/UserScript==
document.body.setAttribute('style', 'width: 900px; position: absolute; top: 0px; left: 0; right: 0; margin-left: auto; margin-right: auto;');