// ==UserScript==
// @name            Firefox-Google AdBlocker
// @namespace       Firefox-Google
// @include         http://www.google.de/firefox*
// ==/UserScript==

Werbung = document.getElementsByTagName('tbody')
Werbung[7].innerHTML = ""

// Made By $niffer