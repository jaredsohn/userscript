// ==UserScript==
// @name          SAX SNOW :3
// @description   Replaces Facepunch snowflakes with...THE SAX EMOTE :sax:
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==

image = "/images/smilies/emot-sax.png"

window.setTimeout(
function() {
  for (i = 0; i < 10; ++ i) {
    document.getElementById("dot"+i).innerHTML = "<img src='" + image + "' border=\"0\">";
  }
}, 60);