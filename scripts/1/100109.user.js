// ==UserScript==
// @name           Artige.no
// @namespace      http://artige.no/
// @description    Lar deg bruke pil mot høyre for å bla til neste bilde.
// @include        http://*.artige.no/bilde/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(document).keydown(function(e) {
	if( e.keyCode == 39 ) {
		window.location = $('.bilde a').attr('href'); 
	}
	else if( e.keyCode == 37 ) {
		history.go(-1);
	}
});