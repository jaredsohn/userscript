// ==UserScript==
// @name           Flonga SWF Redirect
// @description    Automatically goes to game swf url when playing flonga games.
// @include        http://www.flonga.com/play/*
// @include        http://flonga.com/play/*
// @include        www.flonga.com/play/*
// @include        flonga.com/play/*
// @author         marvinbek
// @version        1.4
// @date           05/26/10
// ==/UserScript==


gamename1 = document.title.replace(" at Flonga", "");
gamename2 = gamename1.replace(" ", "-");
gamename3 = gamename2.replace(" ", "-");
gamename4 = gamename3.replace(" ", "-");
gamename5 = gamename4.replace(" ", "-");
gamename6 = gamename5.replace(" ", "-");
gamename7 = gamename6.replace(" ", "-");
gamename8 = gamename7.replace(" ", "-");
gamename9 = gamename8.toLowerCase();
gamename10 = gamename9.replace(":-", "");
if (gamename9=="red-ball") {gamename9="red-ball2"}
window.location = "http://cdn.flonga.com/games/swf/" + gamename9 + ".swf";