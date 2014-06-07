// ==UserScript==
// @name          SAX SNOW :3
// @description   Replaces Facepunch snowflakes with...THE SAX EMOTE :sax:
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==

image = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Blank.png"

window.setTimeout(
function() {
  for (i = 0; i < 10; ++ i) {
    document.getElementById("dot"+i).innerHTML = "<img src='" + image + "' border=\"0\">";
  }
}, 60);