// ==UserScript==
// @name        LesJoiesDuCode
// @namespace   Mouxon
// @description Show directly GIF instead of PNG image
// @include     http://lesjoiesducode.fr/*
// @include     https://lesjoiesducode.fr/*
// @version     1.0
// @grant       none
// ==/UserScript==


window.addEventListener ("load", main, false);
function main () {
    var gifs = document.getElementsByClassName('gifs');
    for(var i = 0; i < gifs.length; i++)
    {
        var gif = gifs[i];
        gif.src = gif.src.replace(/\.png$/, '.gif');
    }
}
    