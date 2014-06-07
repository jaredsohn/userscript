// ==UserScript==
// @name           Auto PopOut YouTube
// @version        0.0.1c
// @description    Automatic play video at YouTube in popup windows
// @include        http://*.youtube.com/watch?v=*
// ==/UserScript==


if ( location.href.match("watch") )
{
    YouTubeVideoID  = location.href.replace(/^[^v]+v.(.{11}).*/,"$1");
    window.location = "http://www.youtube.com/v/" + YouTubeVideoID + "?version=3&hd=1";
}

