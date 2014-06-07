// ==UserScript==
// @name           WKW_GroupMenuCreator
// @author         Agriculturalist
// @version	   0.3.1
// @namespace      *
// @include        http://www.wer-kennt-wen.de/*
// @downloadURL    http://userscripts.org/scripts/source/154069.user.js
// @grant	   none
// ==/UserScript==


var ziel = "http://www.wer-kennt-wen.de/club/ofppqkcw";
var name = "Die&nbsp;Steinmetze";

var newlink = document.createElement("li"); // neues listitem

var parent = document.getElementById('navigation'); // Menü-<div> wird in Variable gepackt
var parent2 = parent.childNodes[1]; // hier geht's in die <ul>-Liste

newlink.id = "newlink"; // Id des neuen listitem wird gesetzt
newlink.innerHTML += '<a href="' + ziel + '" title="' + name +'">Die Steinmetze</a>'; // Link wird in Seite eingefügt

parent2.appendChild(newlink); // Link wird als listitem in die <ul>-Liste gepackt

// Zusatz um Platz im Menü zu schaffen
// Nicht benötigte Menüpunkte werden entfernt
// entfernt Menüpunkt "Events", "Spiele" und Sparen
parent2.removeChild(parent2.childNodes[13]); // Events
parent2.removeChild(parent2.childNodes[14]); // Spiele
parent2.removeChild(parent2.childNodes[15]); // Sparen