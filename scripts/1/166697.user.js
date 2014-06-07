// ==UserScript==
// @name        Jsloth
// @version     0.1.0
// @description Improves your web experience by adding a jsloth.
// @match       http://*
// @copyright   2013
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://raw.github.com/vieekk/jsloth/master/src/jsloth.js
// ==/UserScript==

$(function() {
    $('.sloth').css({
		'background': 'url("https://raw.github.com/vieekk/jsloth/master/img/jsloth-64.png") no-repeat',
		'position': 'absolute',
		'z-index': '10000'
	});
});