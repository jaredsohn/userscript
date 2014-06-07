// ==UserScript==
// @name          Youtube Prevent Autoplay - Playlist exlude
// @namespace     userscripts.org
// @version       0.9
// @description   Prevents videos from playing automatically by replacing the default youtube.com player with the youtube player that doesn't autostart playback, but allows playlists (Originally made by Yansky)
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// @include        http://*.youtube.com/user/*
// @exclude        http://*.youtube.com/*autoplay*
// ==/UserScript==

with(document.getElementById('movie_player'))
{
setAttribute("flashvars","autoplay=0&"+getAttribute("flashvars"));
src+="#";
}