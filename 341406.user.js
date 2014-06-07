// ==UserScript==
// @name       Eszmeletlen.Net
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  Eszmeletlen.net szkript
// @match      http://*.eszmeletlen.net/*
// @copyright  2014, ADSoft
// ==/UserScript==



window.setInterval(function(){
	document.getElementById('simplemodal-overlay').style.display = 'none';
	document.getElementById('simplemodal-container').style.display = 'none';
}, 1000);