// ==UserScript==
// @name		Meppelercourant.nl maar dan gratis voor Google Chrome
// @namespace	        http://userscripts.org/scripts/show/158006
// @description	        Bekijk de Meppelerecourant.nl zonder te betalen
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include		http://*.meppelercourant.nl/*
// @include		http://*.steenwijkercourant.nl/*
// @include		http://*.dedemsvaartsecourant.nl/*
// @updateURL	        http://userscripts.org/scripts/source/158006.user.js
// @version		1.0.0
// @run-at		document-end
// ==/UserScript==

$(document).ready(function()
{
	$(document).on('click', '.payedLink', function (e) {
		window.location.href = $(this).attr('href');
	});			
	
	$(document).on('click', '.normal', function (e) {
		window.location.href = $(this).attr('href');
	}); 
	
	$(document).on('click', '#site-bar-top', function (e) {
		if ($(this).attr('target') == "_self") {
			window.location.href = $(this).attr('href');
		}
	}); 
	
	$("div.ui-widget-overlay").hide();
	$("div.ui-widget").hide();	
        $("#site-bar-top ul").append('<li class="right"><a target="_self" href="/epaper/MC/files/assets/basic-html/index.html#page1">E-Paper lezen</a></li>');
        $("#site-leaderboard").hide();

	
});