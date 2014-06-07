// ==UserScript==
// @name        Sandcastle Builder - Redundakitty Timer + Auto-Clicker
// @namespace   http://userscripts.org/user/iodine
// @description Redundakitty timer in page title, optional auto-clicker with configurable % chance of activation.
// @include     http://castle.chirpingmustard.com/castle.html
// @grant       none
// @version     1
// ==/UserScript==

// To change the default prompt value, change 33 to your preferred %chance
var chance = prompt("Percent chance of redundakitty auto-click? (1-100)","33");

// To remove the prompt completely, comment out (add // to the beginning of) the line,
// and uncomment the next line and change the chance% if desired
// var chance = 100;

var triedclick = 0;
var rand;

setInterval(function() {
    if (Molpy.redactedVisible > 0) {
        document.title = "! kitten !";
        if (triedclick != 1) {
            rand = Math.floor((Math.random()*100)+1);
            if (rand <= chance) {
                Molpy.ClickRedacted();
                triedclick = 0;
            } else { triedclick = 1; }
        }
    } else {
        document.title = Molpy.redactedToggle-Molpy.redactedCountup;
        if (triedclick != 0) { triedclick = 0; }
    }
}, 1000);