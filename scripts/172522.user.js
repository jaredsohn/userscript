// ==UserScript==
// @name       Meneame: la cuadratura del círculo
// @namespace  http://www.meneame.net/
// @version    0.1
// @description  enter something useful
// @match      http://*.meneame.net/*
// @copyright  2013+, Alex Vixgeck, under the BSD license
// ==/UserScript==

$(document).ready(function() {
	$(".avatar, .news-submitted img").css("-moz-border-radius","0px");
	$(".avatar, .news-submitted img").css("-webkit-border-radius","0px");
	$(".avatar, .news-submitted img").css("border-radius","0px");
});