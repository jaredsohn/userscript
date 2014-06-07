// ==UserScript==
// @name          Bei-uns.de Never Delete on answer
// @description   Deaktiviert Standard das Loeschen einer PM beim Antworten
// @include       *bei-uns.de/nachrichten/verfassen/?*
// ==/UserScript==

//
// By Madboy 2008
//

//document.getElementById('originalLoeschen').checked = "false";

var input = document.getElementById('originalLoeschen');
input.checked = false;
