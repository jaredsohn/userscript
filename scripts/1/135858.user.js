// Kiertää kauppalehden verkkosivujen 25 uutisen rajoituksen

// Toimii Chromessa sekä FireFox selaimessa Grease Monkey lisäosan kanssa.
// https://addons.mozilla.org/fi/firefox/addon/greasemonkey/

// ==UserScript==
// @name         Rekisteröintiohitus
// @namespace    Kauppalehti
// @description  Kiertää 25 uutisen rajoituksen kauppalehden verkkosivuilla
// @match      http://www.kauppalehti.fi/*
// ==/UserScript==

var tausta = document.getElementsByClassName("floatBackground")[0];
var popup = document.getElementById("registration");
tausta.parentNode.removeChild(tausta);
popup.parentNode.removeChild(popup);