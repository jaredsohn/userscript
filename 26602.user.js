// ==UserScript==
// @name           RMMB Right Side Ad Bar Remover
// @namespace      http://google.com
// @description    Removes the ad bar on the right side of the Rudius Media Message Board, helps for lower-res screens
// @include        http://messageboard.tuckermax.com/*
// ==/UserScript==

var tables = document.getElementsByTagName('table');
var tds = tables[2].lastChild.firstChild.childNodes;
tds[3].parentNode.removeChild(tds[3]);