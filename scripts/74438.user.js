// ==UserScript==
// @name Related Images on imgur.com
// @description Hides the ads down at the bottom of imgur.com pages
// @include http://www.imgur.com/*
// @include http://imgur.com/*
// @include http://*.imgur.com/*
// ==/UserScript==

	var el = document.getElementById('awesome-bar');
	    el.style.display="none";
	var el2 = document.getElementById('controls');
	    el2.style.display="none";