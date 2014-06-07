// ==UserScript==
// @name           LL max length add links thingy
// @namespace      By Kalphak
// @description    bleh
// @include        http://links.endoftheinter.net/add.php*
// @include	   https://links.endoftheinter.net/add.php*
// ==/UserScript==

document.getElementsByTagName('input')[0].maxLength = 60;
document.getElementsByTagName('input')[1].maxLength = 60;