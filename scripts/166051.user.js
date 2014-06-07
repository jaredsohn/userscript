// ==UserScript==
// @name        NoSlideAds
// @namespace   faleij
// @description Block Slide-in Ads on LiveMint and SeadyHelth
// @include     http://www.livemint.com*
// @include     http://*.steadyhealth.com*
// @include     https://www.livemint.com*
// @include     https://*.steadyhealth.com*
// @updateURL  	https://userscripts.org/scripts/source/166051.meta.js
// @downloadURL https://userscripts.org/scripts/source/166051.user.js
// @version     1.0
// ==/UserScript==
var el = document.getElementById("recommended-slide") || document.getElementById("slidebox");
el.parentNode.removeChild(el);