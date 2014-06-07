
// ==UserScript==
// @name IRC Links for TPT
// @description Adds a link for the IRC Web chat to the Powder Toy header window.
// @namespace boxmein.web44.net
// @include http://powdertoy.co.uk/*
// @version 0.1
// ==/UserScript==
var el = document.createElement("div");
el.setAttribute("id", "genIRCDiv");
el.innerHTML = '<a class="Item" href="http://webchat.freenode.net/?channels=powder">IRC Webchat</a>';
document.getElementById("Header").appendChild(el);