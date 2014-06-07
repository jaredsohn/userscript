// ==UserScript==
// @name        remove Shrekchan Music
// @namespace   Puss in Boots
// @description removes the Shrekchan /shr/ music
// @include     http://www.shrekchan.org/shr/*
// @version     1
// ==/UserScript==

var embed = document.getElementsByTagName('embed')[0];
var embed_parent = embed.parentNode;
embed_parent.removeChild(embed);