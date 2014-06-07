// ==UserScript==
// @name        Gawker Top Bar Fix
// @namespace   Gawker
// @description Removes annoying top bar
// @include     http://deadspin.com*
// @include     http://*gawker.com*
// @include     http://gizmodo.com*
// @include     http://jalopnik.com*
// @include     http://lifehacker.com*
// @include     http://kotaku.com*
// @include     http://io9.com

// ==/UserScript==


var elmDeleted = document.getElementsByTagName("nav")[0];
	elmDeleted.parentNode.removeChild(elmDeleted);