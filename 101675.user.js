// ==UserScript==
// @name           YouTube Autoplay Disabler
// @namespace      userscripts.org
// @description    Disables Autoplay on YouTube Channel pages
// @include        http://*.youtube.com/user/*
// @copyright      rr-m
// @version        1.0
// ==/UserScript==

var player = document.getElementById('movie_player');
var playerContainer = player.parentNode;
if(player.getAttribute("flashvars").search(/autoplay=1/) > 0) {
  playerContainer.removeChild(player);
  player.setAttribute("flashvars",player.getAttribute("flashvars").replace(/autoplay=1/,'autoplay=0'));
  playerContainer.appendChild(player);
}