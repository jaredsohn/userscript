// ==UserScript==
// @name           Grepolis Templer-Forum
// @author         JonnyX93
// @version        0.4.1
// @license        Creative Commons: Namensnennung - Weitergabe unter gleichen Bedingungen 3.0 Deutschland (http://creativecommons.org/licenses/by-sa/3.0/de/)
// @namespace      Die_Templer
// @include        http://*.grepolis.*
// @description    Fügt beim Browsergame Grepolis einen Link zum externen Templer-Forum hinzu (Original Script made by JonnyX93)
// ==/UserScript==
//v0.1 ----> erste funktionsfähige Version
//v0.2 ----> Unterteilung in internes und externes Forum
//v0.3 ----> Externes Forum öffnet sich in neuem Tab
//v0.4 ----> Autoupdatefunktion hinzugefügt
//v0.4.1 --> Script für Die Templer abgeändert (by Daehmex)

document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Internes Forum";



var neuB = document.createElement("a");
var neuBText = document.createTextNode(" Externes Forum");
neuB.href = "http://www.die-templer-grepolis.de.vu/";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);