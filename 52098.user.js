// ==UserScript==
// @author         Barkli
// @name           Travian shortcuts S1
// @namespace      Travian shortcuts
// @description	   Klavesove skratky pre ulachcenie hrania Travianu
// @include        http://s1.travian.co.id/*
// @exclude        http://s1.travian.co.id/nachrichten.php
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
        window.location.href="http://s1.travian.co.id/dorf1.php";
    } else if (key == centrum) {        
        window.location.href="http://s1.travian.co.id/dorf2.php";
    } else if (key == mapa) {
        window.location.href="http://s1.travian.co.id/karte.php";
    } else if (key == statistika) {
        window.location.href="http://s1.travian.co.id/statistiken.php";
    } else if (key == hlasenie) {
        window.location.href="http://s1.travian.co.id/berichte.php";
    } else if (key == spravy) {
        window.location.href="http://s1.travian.co.id/nachrichten.php";
    }
    
}

document.addEventListener("keydown", shortcuts, true);