// ==UserScript==
// @name        DisablePreGameADs_armorgames
// @namespace   DisablePreGameADs_armorgames
// @description disable only PRE GAME ADs (use adblock for rest) example AD http://s22.postimg.org/a0wunubep/image.jpg
// @include     http://armorgames.com/play/*
// @include     https://armorgames.com/play/*
// @version     version 0.00
// ==/UserScript==


var elm = document.getElementById("prestitial");
if (elm) {
elm.parentNode.removeChild(elm);
var elm = document.getElementById("gamefilearea");
elm.setAttribute("class", "potato");
}