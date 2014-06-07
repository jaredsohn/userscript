// ==UserScript==
// @name Go.RaidRush.ws - Öffnet die Verlinkte Seite ohne go.raidrush.ws
// @namespace nanobyte.go.raidrush.ws.remover
// @description Öffnet die Verlinkte Seite ohne go.raidrush.ws
// @version 1.0
// @author Matthias Ruchay
// @include http://go.raidrush.ws/*
// ==/UserScript==

var s = document.getElementById('displayPage');
window.location.href = s.src;