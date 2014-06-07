// ==UserScript==
// @name          Bei-uns.de GB Editor
// @description   Anderer FCKEditor bei Gaestebucheintrag
// @include       *.bei-uns.de/gaestebuch/
// @include       *.bei-uns.de/gaestebuch
// ==/UserScript==

//
// By Madboy 2008
//

var iifra;
iifra = document.getElementById('eintragText___Frame');
var pffad34 = document.getElementById('eintragText___Frame').src;
var abschneiden23 = pffad34.length - 5; 
var neeeeueuurrl23 = pffad34.slice(0, abschneiden23) + 'Klein';
document.getElementById('eintragText___Frame').src = neeeeueuurrl23;
