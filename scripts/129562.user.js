// ==UserScript==
// @name           Youtube Looper
// @namespace      AVP
// @version        1.0
// @include        http://*.youtube.com/*
// ==/UserScript==
var looper = function()
{
    function checkVideo()
    {
        var player = document.getElementById('movie_player');
        if(player && typeof player.getPlayerState == 'function' && player.getPlayerState() == 0)
        {
            player.pauseVideo();
            player.seekTo(0, false);
            player.playVideo();
        }
    }
    
    setInterval(checkVideo,2000);
}

document.body.appendChild(document.createElement("script")).innerHTML = "("+looper+")()";