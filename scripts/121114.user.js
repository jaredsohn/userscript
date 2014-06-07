//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google - Sticky header
// @namespace     google
// @description   meakes a google header sticky to the browser
// @include       http://*.google.tld/*
// ==/UserScript==


$ = unsafeWindow.jQuery; 

$('#gb').css({position: 'fixed', top: 0, left: 0, right: 0, z-index: 10000, overflow: 'visible'});