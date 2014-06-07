// ==UserScript==
// @name          Bei-uns.de PM Editor
// @description   Anderer FCKEditor bei PMs
// @include       *.bei-uns.de/nachrichten/verfassen/
// @include       *.bei-uns.de/nachrichten/verfassen
// @include       *.bei-uns.de/nachrichten/verfassen*
// ==/UserScript==

//
// By Madboy 2008
//

var iifra;
iifra = document.getElementById('nachrichtText___Frame');
var pffad34 = document.getElementById('nachrichtText___Frame').src;
var abschneiden23 = pffad34.length - 5; 
var neeeeueuurrl23 = pffad34.slice(0, abschneiden23) + 'Default';
document.getElementById('nachrichtText___Frame').src = neeeeueuurrl23;
