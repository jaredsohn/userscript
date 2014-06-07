// ==UserScript==
// @name         Runescape Preferred World
// @description  When you change the variable "world_number" to your favorite worlds number, it automatically selects that world when you load the game!  Useful if you only play on one world.  Remember that you MUST edit the script.  The default world number is 106.
// @include      http://www.runescape.com/game.ws*
// @include      http://world*.runescape.com/*
// ==/UserScript==

/* Change this to your favorite worlds number! */
var world_number = "106";
var url = document.location.href;

if (url=="http://www.runescape.com/game.ws?m=0&j=1") {
  document.location.href = "http://world" + world_number + ".runescape.com/m0,a2";
}

if (url=="http://www.runescape.com/game.ws?m=0&a=2&j=1") {
  document.location.href = "http://world" + world_number + ".runescape.com/m0,a2";
}

if (url!="http://world" + world_number + ".runescape.com/m0,a2"0) {
  document.location.href = "http://world" + world_number + ".runescape.com/m0,a2";
}


