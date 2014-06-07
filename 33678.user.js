// ==UserScript==
// @name           center spiegel.de
// @namespace      http://userscripts.org/scripts/show/33678
// @description    Zentriert die Spiegel.de Seite, welche normalerweise linksbündig ist.
// @include        http://www.spiegel.de/*
// @include        http://www.ka-news.de/*
// @version        2008-11-22
// ==/UserScript==
document.body.setAttribute('style', 'margin: 0pt auto; width: 770px; float: none;');
