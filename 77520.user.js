// ==UserScript==
// @name           Elitist Armory Test
// @namespace      meeekus
// @include        http://*.mmo-champion.com/*
// ==/UserScript==

alert('Before');

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://elitistarmory.com/javascripts/external_powered.js';
newScript.onload = alert('Loaded');
newScript.EATooltipConfig(true, null);
headID.appendChild(newScript);


alert('After');

