// ==UserScript==
// @name           YouTube HD
// @namespace      http://twitter.com/mengxl/youtube_hd
// @description    Select playback quality for YouTube videos automatically (720p by default), support both HTML5 and Flash player on all major browsers.
// @version        20100529
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

// ==SETTINGS==
// Default quality (Available values: 1080, 720, 480, 360)
var quality = 720;

// ==IMPLEMENTATION==
function $(ID,root) {return (root||document).getElementById(ID);}

// HTML5 Player
var player = $('video-player');
if(player) {
    var qualMap = { '1080p': 1080, '720p': 720, '480p': 480, '360p': 360 };
    var quals = player.getElementsByClassName('quality-panel')[0].children;
    for(var i = 0; i < quals.length; i++)
        if(quals[i].style.getPropertyValue('display') != 'none' &&
           qualMap[quals[i].value] <= quality) {
            quals[i].click();
            break;
        }
}

// Flash Player
player = $('movie_player');
if(player) {
    var qualMap = { 'hd1080': 1080, 'hd720': 720, 'large': 480, 'medium': 360 };
    var quals = player.getAvailableQualityLevels();
    for(var i = 0; i < quals.length; i++)
        if(qualMap[quals[i]] <= quality) {
            player.setPlaybackQuality(quals[i]);
            break;
        }
}
