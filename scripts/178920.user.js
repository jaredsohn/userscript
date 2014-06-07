// ==UserScript==
// @name       Pandora integration with Ubuntu
// @namespace  http://userscripts.org/users/533831
// @version    0.1
// @description  Get current song
// @match      http*://www.pandora.com/*
// @copyright  2013, Filip Rychnovský
// ==/UserScript==
setInterval(function(){
document.title = "+" + document.getElementsByClassName("playerBarSong")[0].textContent
 + "!" + document.getElementsByClassName("playerBarArtist")[0].textContent
 + "!" + document.getElementsByClassName("playerBarAlbum")[0].textContent
 + "!" + document.getElementsByClassName("playerBarArt")[0].src;
}, 1000);