// ==UserScript==
// @name           IkariamLoginSucks
// @namespace      IkariamSucks
// @include        http://*.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// @exclude        http://board*.ikariam.*/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

$(function() {
	$('#sidebarWrapper').toggle();
	$('#content').toggle();
	$('#loginWrapper').toggle();
	$('#globalResources > ul > li:first').removeClass('ambrosia').addClass('ambrosiaNoSpin');
});