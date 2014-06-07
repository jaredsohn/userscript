// ==UserScript==
// @name           YouTube Autoplay Disabler (with No Pre-Buffering)
// @namespace      userscripts.org
// @description    Disables Autoplay on YouTube and Disable Pre-Buffering
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/user/*
// @copyright      Benny Christanto
// @version        1.0
// ==/UserScript==
var player;
var stopVideo = function(){
    player = document.getElementById('movie_player');
    if(!player) player = document.getElementById('movie_player-flash');
    if(player && typeof player.stopVideo == 'function'){
        player.stopVideo();
    }
}
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        stopVideo();
        clearInterval(readyStateCheckInterval);
    }
}, 10); 