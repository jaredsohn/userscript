// ==UserScript==
// @name           KH Fix
// @namespace      http://userscripts.org/users/115101
// @description    Removes Informe's tag cloud search.
// @include        http://killerhentai.informe.com/*
// ==/UserScript==

//target the tags class
var adframe = document.getElementsByClassName('tags-panel')[0];

//remove it
if(adframe != null) { adframe.parentNode.removeChild(adframe); }