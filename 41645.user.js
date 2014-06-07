// ==UserScript==
// @name           Balsas.lt Download Video
// @namespace      http://userscripts.org/users/79563
// @description    Puts a link to flash video for download
// @include        *.balsas.lt/*
// ==/UserScript==

function pavaryk() {
  var playeriai = document.getElementsByName('player');
  for (var i=0; playeriai[i]; i++) {
     var playeris = playeriai[i];
     var kintamieji = playeris.getAttribute('flashvars');
     var nuoroda = kintamieji.match(/&video=[^&]+/)[0].split(/=/)[1];
     var saitas = document.createElement('a');
     saitas.href = nuoroda;
     saitas.innerHTML = "Atsisiųsti";
     var vieta = playeris.parentNode;
     var konteineris = vieta.parentNode;
     if (konteineris.childNodes.length<4) {
       konteineris.insertBefore(saitas, vieta);
     } else {
       konteineris.childNodes[3].appendChild(saitas);
     }
  }
}

pavaryk();
