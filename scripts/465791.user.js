// ==UserScript==
// @name       Granblue Fantasy Resizer 
// @namespace  
// @version    1.0
// @description  resize the Granblue Fantasy to 1:1 size
// @match      http://gbf.game.mbga.jp/*
// @copyright  2014, CEhk
// ==/UserScript==

// get the zooming ratio by calculation 
var zoomR = (window.innerWidth / 320);

// resize by adding an inverse rate 
document.body.style.zoom = (1 / zoomR);