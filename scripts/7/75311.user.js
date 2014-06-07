// ==UserScript==
// @name          Bewertet automatisch Battles auf SpickMich.de
// @description   by flo1994 Bewertet automatisch Battles.
// @include       http://www.spickmich.de/battle*
// ==/UserScript==

function weiterleiten()

{
window.location.href = "http://www.spickmich.de/battle?category=0";
}

var Zeitintervall = 1000;
window.setInterval(weiterleiten, Zeitintervall);


document.getElementsByClassName('simpleButton')[0].click();


// copyright by flo1994 