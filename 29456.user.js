// ==UserScript==
// @name          Automatically Check Preview Comment Box
// @description	  Automatically checks off the "Preview Comment" box on Lifehacker.com (and other Gawker Media blogs).
// @namespace     http://ginatrapani.org/workshop/firefox/betterlifehacker/
// @include       http://lifehacker.com/*
// @include       http://gizmodo.com/*
// @include       http://io9.com/*
// @include       http://jezebel.com/*
// @include       http://consumerist.com/*
// @include       http://kotaku.com/*
// @include       http://gawker.com/*
// @include       http://deadspin.com/*
// @include       http://jalopnik.com/*
// @include       http://defamer.com/*
// @include       http://fleshbot.com/*

// @author	Gina Trapani
// @enabledbydefault true
// ==/UserScript==

if ( document.getElementById('previewToggleCheck') ){
	document.getElementById('previewToggleCheck').checked=true;
}

