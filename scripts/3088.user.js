// ==UserScript==
// @name          Digg.com Improved Ad Remover
// @namespace     
// @description	  Removes the google ad banner from all digg pages -- Bootle
// @include       http://*digg.com/*
// @exclude
// ==/UserScript==

var adBar = document.getElementById('google-broad');

if (adBar)
	adBar.parentNode.removeChild(adBar);