// ==UserScript==
// @name           Expand Forum Search Box
// @namespace      Cronus6
// @description    Expand Forum Search Box
// @include        http://goallineblitz.com/game/search_forum.pl
// ==/UserScript==

window.setTimeout( function() 
{

var fsbox= document.getElementById('forum_list');

if (fsbox) {
    fsbox.style.height = "500px";
}


},100);