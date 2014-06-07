// ==UserScript==
// @name           Tuenti 2.0 - Barra lateral
// @namespace      tuenti
// @copyright      (c) Layane
// @license        Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
// @version        1.0
// @include        http://*.tuenti.com/*
// @require        http://layaneworld.webcindario.com/mis-cosas/jquery-1.4.2.js
// ==/UserScript==

setInterval(function() {
	var networks = $('div.networks:first');
	var localPlaces = $('div.localPlaces:first');

	if (networks.size() != 1 || localPlaces.size() != 1) return;

	localPlaces.clone().appendTo('div.personalInfo');
	networks.clone().appendTo('div.personalInfo');

	networks.hide();
	localPlaces.hide();	

}, 500);