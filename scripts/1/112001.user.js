// ==UserScript==
// @name           yahoo! webplayer embedder
// @namespace      http://cau.de/mlo
// @description    Embeds the yahoo! webplayer into each site
// @exclude        http://*.youtube.com/*
// ==/UserScript==

var player1 = document.createElement("script");
var player2 = document.createElement("script");
player1.setAttribute('type', 'text/javascript');
player2.setAttribute('type', 'text/javascript');
player2.setAttribute('src', 'http://webplayer.yahooapis.com/player-beta.js');

player1.innerHTML = ' var YWPParams = { termDetection: "on" }; ';
document.body.insertBefore(player1, document.body.lastChild.nextSibling);
document.body.insertBefore(player2, document.body.lastChild.nextSibling);