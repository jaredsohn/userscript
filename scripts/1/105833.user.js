// ==UserScript==
// @name        MMO Champion Widener
// @description Make MMO Champion wider.
// @version     0.1
// @license     MIT License
// @include        http://*.mmo-champion.com*

// ==/UserScript==

document.getElementById("page").style.minWidth = '0px';
document.getElementById("page").style.maxWidth = '100%';
document.getElementById("page").style.width = '100% !important';