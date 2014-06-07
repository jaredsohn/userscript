// ==UserScript==
// @name          remove social toolbar from http://liveonlinetv247.com/
// @namespace     eliath - http://eliasmartinezcohen.com
// @description   remove the social toolbar so fullscreen is easier
// @include       http://liveonlinetv247.com/*
// ==/UserScript==

(function() {
  $('.addthis_floating_style.addthis_counter_style').css({ display: none; });
})();