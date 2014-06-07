// ==UserScript==
// @name        Tuio2Touch
// @namespace   http://userscripts.org/users/513121
// @description Translates Tuio stream to touch events
// @grant       GM_log
// @grant       unsafeWindow
// @include     http*://*
// @include     file://*
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     4
// ==/UserScript==
jQuery(document).ready(function() {
	jQuery(this).find("body").append("<object id='tuio' type='application/x-tuio' style='width:0px;height:0px;'></object>");
	jQuery(this).find("head").append("<script type='text/javascript' src='https://raw.github.com/borismus/MagicTouch/master/magictouch.js'></script>");
	GM_log("TUIO2Touch is injected");
});