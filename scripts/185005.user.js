// ==UserScript==
// @name        BitWorld StickySideBar
// @namespace   BitWorld
// @include     https://alt.bitworld.to/*
// @version     1
// @grant       none
// ==/UserScript==

// Ermitteln aller Tabellen
var t = document.getElementsByTagName("table");

// Ermitteln der Tabellenzelle mit dem Menü
var elm = t[4].childNodes[1].childNodes[0].childNodes[1];

// Daten der Tabellenzelle auslesen und danach leeren.
var data = elm.innerHTML;elm.innerHTML = "";

// Content-Box für das Menü erstellen und Inhalt übernehmen.
var d = document.createElement("div");d.innerHTML = data;elm.appendChild(d);

// Breitenfixierung einbinden.
var g = document.createElement("div");g.style.width = "150px";elm.appendChild(g);

// Originale Höhe des Menü's auslesen.
var hoehe = d.offsetHeight;

// Wenn gescrollt wird
window.onscroll = function() {
    // Aktuelle Fensterhöhe ermitteln
    var fensterhoehe = window.innerHeight;
    // Scrollposition von oben ermitteln.
    var scrollOffset = window.pageYOffset;
    // Berechnen, ob Scroll-Position an Menü-Oberkante unter den Userstatus angelangt ist.
    if(scrollOffset + fensterhoehe > hoehe + 290) {
        // Festlegen, dass das Menü eine Absolute Position übernimmt
        d.style.position = "absolute";
        // Positionsfestsetzung
        d.style.top = scrollOffset - 365 + "px";
    }else{
        // Zurücksetzen auf normalstatus.
        d.style.position = "inherit";
    }
}