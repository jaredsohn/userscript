// ==UserScript==
// @name           GooglEssence
// @namespace      http://localhost/
// @description    Replaces gaudy (sometimes animated) Google Logo with simple text
// @include        http://*.google.*/*
// @exclude        http://*.google.com/pacman/
// Replace Google gaudy/animated logo with simple text
// ==/UserScript==

var logo = document.getElementById('lga');
if (logo)
	logo.innerHTML = "Google";

var inputs = document.getElementsByTagName('input');
for (var i=0; i<inputs.length; i++)
   if  (inputs[i].hasAttribute('onblur'))
      inputs[i].setAttribute('onblur','');
