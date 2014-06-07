// ==UserScript==
// @name           Alfa.lt Download Video
// @namespace      http://userscripts.org/users/79563
// @description    Adds a link to download flash video
// @include        *.alfa.lt/*
// ==/UserScript==

function pavaryk(){
  var flashes = document.getElementsByTagName("object");
  for (var i=0; flashes[i]; i++) {
    var flash = flashes[i];
    var flashvars = null;
    for (var c=0; flash.childNodes[c]; c++) {
      var paramname = flash.childNodes[c].getAttribute("name");
      if ("flashvars"==paramname) {
        flashvars = flash.childNodes[c].getAttribute("value");
        break;
      }
    }
    var nuoroda = flashvars.match(/file=[^&]+/)[0].split(/=/)[1];
    var saitas = document.createElement('a');
    saitas.href = nuoroda;
    saitas.innerHTML = "Atsisiųsti";
    var vieta = flash.parentNode;
    var konteineris = vieta.parentNode;
    konteineris.insertBefore(saitas, vieta);
  }
}

pavaryk();