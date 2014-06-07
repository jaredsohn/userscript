// ==UserScript==
// @name       RaptJS widescreen
// @namespace  http://rapt
// @version    0.1
// @description  Changes the dimensions of the canvas and UI to be 720p when window is large enough.
// @match      http://raptjs.com/play/*
// @copyright  2012+, Ezekiel Warren
// ==/UserScript==

var canvas = document.getElementById('canvas');
var game = document.getElementById('game');
var levelScreen = document.getElementById('levelScreen');
var loadingScreen = document.getElementById('loadingScreen');
var content = document.getElementById('content');

canvas.style.webkitTransition = "all 0.5s ease";
game.style.webkitTransition = "all 0.5s ease";
levelScreen.style.webkitTransition = "all 0.5s ease";
loadingScreen.style.webkitTransition = "all 0.5s ease";

game.parentElement.style.maxWidth ="1280px";

function RESIZE() {
    if(content.offsetWidth >= 1280) {
        if(canvas.width != 1280) {
            canvas.width = 1280;
            canvas.height = 720;
            game.style.width = "1280px";
            game.style.height = "720px";
            levelScreen.style.width = "1220px";
            levelScreen.style.height = "660px";
            
            game.parentElement.style.width ="1280px";
            
            loadingScreen.style.width = "1280px";
        }
    } else {
        if(canvas.width != 800) {
            canvas.width = 800;
            canvas.height = 600;
            game.style.width = "800px";
            game.style.height = "600px";
            levelScreen.style.width = "740px";
            levelScreen.style.height = "540px";
            
            game.parentElement.style.width ="800px";
            
            loadingScreen.style.width = "800px";
        }
    }
}
RESIZE();

window.addEventListener('resize', RESIZE);