// ==UserScript==
// @name           grepomaplink
// @include        http://*.grepolis.*
// @description    fügt ally karte ins menü
// ==/UserScript==


document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Ally-Karte";



var neuB = document.createElement("a");
var neuBText = document.createTextNode(" Karte");
neuB.href = "http://de.grepolis.com/start/redirect?url=http%3A%2F%2Fde13.grepolismaps.org%2Fbded7257270850fef35a17b8a0e8c816";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);