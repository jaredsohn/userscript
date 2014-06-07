// ==UserScript==
// @name        Gutschein eingeben
// @namespace   Simon
// @include     https://mypins.paysafecard.com/mypins-psc/mypins/index.xhtml
// @version     1
// @grant       none
// ==/UserScript==

document.addEventListener("keydown", keyListener);

function keyListener(e){
  if(e.which == 18){ //alt
    var gutschein = prompt("Gutschein:");
    var split = gutschein.split("-");
    document.getElementById("topup:pin1").value = split[0];
    document.getElementById("topup:pin2").value = split[1];
    document.getElementById("topup:pin3").value = split[2];
    document.getElementById("topup:pin4").value = split[3];
  }
}