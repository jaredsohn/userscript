// ==UserScript==
// @author         Barkli
// @name           Travian shortcuts S2
// @namespace      Travian shortcuts
// @description	   Klavesove skratky pre ulachcenie hrania Travianu
// @include        http://s2.travian.sk/*
// @exclude        http://s2.travian.sk/nachrichten.php
// ==/UserScript==


var prehlad = "a";
var centrum = "s";
var mapa = "d";
var statistika = "f";
var hlasenie = "g";
var spravy = "h";
function shortcuts(e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    if (key == prehlad) {
        window.location.href="http://s2.travian.sk/dorf1.php";
    } else if (key == centrum) {        
        window.location.href="http://s2.travian.sk/dorf2.php";
    } else if (key == mapa) {
        window.location.href="http://s2.travian.sk/karte.php";
    } else if (key == statistika) {
        window.location.href="http://s2.travian.sk/statistiken.php";
    } else if (key == hlasenie) {
        window.location.href="http://s2.travian.sk/berichte.php";
    } else if (key == spravy) {
        window.location.href="http://s2.travian.sk/nachrichten.php";
    }
    
}

document.addEventListener("keydown", shortcuts, true);
