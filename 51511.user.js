// ==UserScript==
// @name           Saucisse power
// @namespace      METSO forum
// @description    Test saucisse
// @include        http://met.ciavlan.qc.ca/forum/*
// ==/UserScript==

var liens = document.getElementsByTagName("a");

for (i=0;i<=liens.length-1;i=i+1){
	liens[i].innerHTML = 'Saucisse!';
}