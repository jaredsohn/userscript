// ==UserScript==
// @name			konulu videolari kapat
// @namespace		-
// @description		konulu video imha
// @include			www.eksisozluk.com/*
// @include			http://www.eksisozluk.com/*
// @include			http://eksisozluk.com/*
// @include			http://sourtimes.org/*
// @include			http://www.sourtimes.org/*
// @include			http://84.44.114.44/*
// @author			samfisher
// @version			1.0
// @release			06.06.2011
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		
		document.getElementById('panel').deleteRow(3);
	},
	false);

