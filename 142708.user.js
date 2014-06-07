// ==UserScript==
// @name           YouTube Autoplay Killer
// @namespace      userscripts.org
// @description    Disables Autoplay on all YouTube pages
// @include        http://*.youtube.com/*
// @copyright      (C) 2012 by Diamond00744
// @version        1.0
// ==/UserScript==

var player = document.getElementById('movie_player');
var playerContainer = player.parentNode;
if(player.getAttribute("flashvars").search(/autoplay=1/) > 0) {
  playerContainer.removeChild(player);
  player.setAttribute("flashvars",player.getAttribute("flashvars").replace(/autoplay=1/,'autoplay=0'));
  playerContainer.appendChild(player);
} 