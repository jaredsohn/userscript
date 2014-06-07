// ==UserScript==
// @name           WikiWhite
// @namespace      WikiWhite
// @description    Keeps Wiki White
// @include        http://en.wikipedia.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


$.noConflict();

jQuery(window).load(function() {
	jQuery("#content").show();
	jQuery("#mw-head").show();
	jQuery("#mw-panel").show();
	jQuery("#footer").show();
	jQuery("#mw-sopaOverlay").hide();
});