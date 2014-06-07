// ==UserScript==
// @name           grepomaplink
// @author         masterofdisaster

// @include        http://*.grepolis.*
// @description    link zu grepomaps-url der eigenen karte eingeben 
// ==/UserScript==


document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Karte";



var neuB = document.createElement("a");
var neuBText = document.createTextNode(" Karte");
neuB.href = "http://de6.grepolismaps.org";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);