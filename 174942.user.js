// ==UserScript==
// @name        Fotostart.dk
// @namespace   
// @description Removes Hover EFX
// @include     http://www.fotostart.dk/*
// @version     1
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$("div.zitem").removeClass("zitem").css({ 
    "border": "0 solid #222222", 
    "float": "left",
    "height": "180px",
    "margin": "5px 5px 5px 0",
    "overflow": "hidden",
    "position": "relative",
    "width": "180px"
});