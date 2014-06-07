// ==UserScript==
// @name          Unwardrobe
// @namespace     http://userstyles.org
// @description   Hides rows containing quoted Narnia posts because she's crazy.
// @author        The Human Torch
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include		  http://*.hfboards.com/*
// @include       http://hfboards.com/*

// ==/UserScript==

(function() {
	$("div:contains('Originally Posted by Narnia')").closest("div[align=center]").hide();
	$("div[align=center]:first").show();
}());
