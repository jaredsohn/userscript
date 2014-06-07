// ==UserScript==
// @name           4chan Music-Remover
// @namespace      1337
// @description    Removes the music from 4chan.
// @include        http://boards.4chan.org/*/*
// ==/UserScript==

var embed = document.getElementsByTagName('embed')[0];
var embed_parent = embed.parentNode;
embed_parent.removeChild(embed);