
// ==UserScript==
// @name          YT PLAYER + MP3 BUTTON!
// @version       4.
// @author	  Zabihullah Kasimi
// @namespace     http://zabihullah.com/
// @description   Adds a link on Youtube to convert the currently playing video to mp3 format
// @include       http://www.youtube.com/*
// @include       http://youtube.com/*
// @include       http://www.youtube.com/user*
// @include       http://www.youtube.com/user/*
// @include       http://youtube.com/user*
// @include       http://youtube.com/user/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==

var s = location.href.split("v=");
var url=s[1];
document.getElementById('watch7-secondary-actions').innerHTML +='<a target="player" href="http://roohullah.com/mp3/?v='+ url + '"><button class="action-panel-trigger   yt-uix-button yt-uix-button-hh-text yt-uix-tooltip" type="button" title="Takk til Zabi" data-tooltip-timer="525" style="margin-right:4px;">Get MP3!<span class="yt-uix-button-content"></span></button></a>';


//Player Iframe___________________________________________
var s = location.href.split("v=");
var url=s[1];
document.getElementById('watch7-player').innerHTML='<iframe name="player" width="100%" height="100%" src="http://www.youtube.com/watch_popup?v='+ url + '"frameborder="0" align="center"></iframe>';

//Comments_________________________________________
document.getElementById('comments-view').innerHTML='hahaha';