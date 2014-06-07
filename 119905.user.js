// ==UserScript==
// @name           RS Wiki remove text from search field
// @namespace      http://userscripts.org/scripts/show/119905
// @description    RS Wiki remove text from search field
// @include        http://runescape.wikia.com/wiki/*
// ==/UserScript==

var html = document.body.innerHTML;
html = html.replace( placeholder="Search the RuneScape Wiki", '' );
document.body.innerHTML = html;