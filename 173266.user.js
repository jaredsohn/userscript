// ==UserScript==
// @name       Osimulate Better Layout
// @namespace  http://udkm.ch
// @version    2.0
// @description  moves the description box to the bottom of the simulator
// @match      http://*.osimulate.com/*
// @match      http://osimulate.com/*
// @copyright  2012+, Alexander Murray
// ==/UserScript==

var id = document.getElementsByTagName('div')[2];
document.body.removeChild(id);
document.body.appendChild(id);

// broken //
//var ad = document.getElementById('dlgAd');
//ad.parentNode.removeChild(ad);
