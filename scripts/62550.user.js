// ==UserScript==
// @name          MegavideoFS
// @namespace     
// @description   Megavideo Full Screen
// @author        Gianni 'guelfoweb' Amato
// @include       http://www.megavideo.com/?v=*
//
// ==/UserScript==

var loc = window.location.href;
window.location = "http://wwwstatic.megavideo.com/mv_player.swf?v=" + loc.split('=')[1];
