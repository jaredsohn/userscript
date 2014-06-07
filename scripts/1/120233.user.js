// ==UserScript==
// @name           Illuminantenboard Auto Danke
// @namespace      de.illuminantenboard.auto
// @include        http://www.illuminatenboard.org/forum/showthread.php*
// ==/UserScript==


var Ergebnis;
var id;

Ergebnis = document.body.innerHTML.match(/thanks_do\(\d+\)/);

if (Ergebnis){
  for (var i = 0; i < Ergebnis.length; ++i){
	id = Ergebnis[i].replace("thanks_do(","").replace(")","");
	unsafeWindow.thanks_do(id);
}}


