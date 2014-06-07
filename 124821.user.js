// ==UserScript==
// @name           Hide SoundCloud Comments
// @namespace  8bit.cx
// @version        0.1
// @description  Disables those anying comments on SoundCloud by default
// @include        http://soundcloud.com/*
// @include        http://www.soundcloud.com/*
// @copyright     2012+, Roy van Dam
// ==/UserScript==

var players = document.getElementsByClassName('player');

for(var p in players) {
    if (players[p].nodeName.toLowerCase() != 'div') {
        continue;
    }
    
    players[p].className += " no-comments";
}