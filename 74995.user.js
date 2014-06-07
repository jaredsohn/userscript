// ==UserScript==
// @name           FreeScape
// @namespace      Rigecz
// @description    Automatically removes adverts from Runescape
// @include		   http://*.runescape.com/*
// @version        1.0
// @date           2010-04-21
// @creator        Rigecz
// ==/UserScript==

var currentpage = window.location.href;

// Removing advertisements
var ad = document.getElementById("tb");
if (ad) {
  ad.parentNode.removeChild(ad);
}

// Removing unnecessary menu in game page
if((currentpage.indexOf("runescape.com/game.ws") != -1) || (currentpage.search("world[0123456789]{1,3}\.runescape\.com\/") != -1)) {
  var menu = document.getElementById("menu");
  if (menu) menu.parentNode.removeChild(menu);
}