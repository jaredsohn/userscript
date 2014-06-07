// ==UserScript==
// @name          minecraft-server.eu No Chat
// @namespace     http://www.maerdnagaming.com/
// @description   Klappt den minecraft-server.eu chat standartmäsig zu!
// @include       http://minecraft-server.eu/board/*
// @include       http://www.minecraft-server.eu/board/*
// @version       0.1a
// @grant           unsafeWindow
// ==/UserScript==

function hideChat(){
     document.getElementById("boxContent").style.display = "none";
}
hideChat();