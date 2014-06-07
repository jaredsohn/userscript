// ==UserScript==
// @name           Lycos iQ Autoaktualisierer [15]
// @namespace      Lycos iQ
// @description    Aktualisiert alle 15 Sekunden die Seite wo man alle Fragen sieht, damit man nicht staendig auf "Alle Fragen" klicken muss! (c) Lukas Moeller
// @include        http://iq.lycos.de/qa/srch/*
// @include        http://*.de/qa/srch/*
// @include        http://www.decido.de/*
// @exclude        http://www.decido.de/


setTimeout("window.location.reload()", 15000)


// ==/UserScript==