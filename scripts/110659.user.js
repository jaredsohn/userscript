// ==UserScript==
// @name			Eksi Sozluk Sol Frame Genisletici
// @namespace		-
// @description		Zoomlayinca sol framede cikan sikintiyi giderme amacli...
// @include			www.eksisozluk.com/*
// @include			http://www.eksisozluk.com/*
// @include			http://eksisozluk.com/*
// @include			http://sourtimes.org/*
// @include			http://www.sourtimes.org/*
// @include			http://84.44.114.44/*
// @author			samfisher
// @version			1.0
// @release			20.02.2011
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var frameler = document.getElementsByTagName('frameset');
		frameler[1].setAttribute('cols','300,\*');
	},
	false);

