// ==UserScript==
// @name       Datanose popup remover
// @namespace  https://datanose.nl/
// @version    0.1
// @description  Removes the "about the new layout" popup from Datanose.
// @match      https://datanose.nl/*
// @copyright  2012+, Taddeus Kroes
// ==/UserScript==

setTimeout(function() {
    document.getElementById('_3').removeChild(document.getElementById('_29'));
}, 30);