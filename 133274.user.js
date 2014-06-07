// ==UserScript==
// @name        Clear vision
// @namespace   UnFog
// @description Augmente visibilité souterrain
// @include     http://www.shinobi.fr/*
// @version     0.1
// ==/UserScript==

var element = document.getElementById('mapyuukansouterrain');
var cas1 = document.getElementById('ombreyuukansouterrain');
var cas2 = document.getElementById('ombreyuukansouterrain2');

  element.addEventListener('click', function() {
      cas1.parentNode.removeChild(cas1);
  }, false);
  

  element.addEventListener('click', function() {
	  cas2.parentNode.removeChild(cas2);
  }, false);
  