// ==UserScript==
// @name          Youtube Prevent Autoplay
// @namespace     userscripts.org
// @version       0.9
// @description   Prevents videos from playing automatically by replacing the default youtube.com player with the youtube player that doesn't autostart playback
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// @include        http://*.youtube.com/user/*
// ==/UserScript==

with(document.getElementById('movie_player'))
{
setAttribute("flashvars","autoplay=0&"+getAttribute("flashvars"));
src+="#";
}