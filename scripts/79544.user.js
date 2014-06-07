// ==UserScript==
// @name           Barra Rapida Grepolis
// @author         Marverickds :-D
// @version        1.1
// @date           19/06/2010
// @include        http://*.grepolis.*/*
// @description    Este script incluye links a los principales edificios para mayor comodidad del usuario.
// ==/UserScript==
document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Grepolis Forum";

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" - Cuartel");
neuB.href = "http://es5.grepolis.com/game/building_barracks";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" - Senado");
neuB.href = "http://es5.grepolis.com/game/building_main";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" - Puerto");
neuB.href = "http://es5.grepolis.com/game/building_docks";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" - Cueva");
neuB.href = "http://es5.grepolis.com/game/building_hide";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" - Simulador de Batalla");
neuB.href = "http://es5.grepolis.com/game/building_place?action=simulator";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" - Attm. Marverickds");
neuB.href = "http://www.365cosas.es.tl";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

GM_addStyle("advisers { background-image: http://static.grepolis.com/images/transparent.png; }");