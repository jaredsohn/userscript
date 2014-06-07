// ==UserScript==
// @name           Lycos iQ Autoaktualisierer [20]
// @namespace      Lycos iQ
// @description    Aktualisiert alle 20 Sekunden die Seite wo man alle Fragen sieht, damit man nicht staendig auf "Alle Fragen" klicken muss! (c) Lukas Moeller
// @include        http://iq.lycos.de/qa/srch/*
// @include        http://*.de/qa/srch/*
// @include        http://www.decido.de/*
// @exclude        http://www.decido.de/

setTimeout("window.location.reload()", 20000)


// ==/UserScript==