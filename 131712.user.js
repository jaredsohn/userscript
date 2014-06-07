// ==UserScript==
// @name           	Munchsquad Forum font changer
// @author         	midraal
// @description    	changes the fonts on the munchsqquad forum
// @namespace		http://munchsquad.shivtr.com/
// @include			http://munchsquad.shivtr.com/forum_threads/*
// @icon			http://i1203.photobucket.com/albums/bb384/nichocolate/m32x32.png
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version 		0.1
// ==/UserScript==

var fonts = {
	midraal: "times, arial"
	};
$(".poster_name").find("a").each(function(){
	if (typeof fonts[$(this).html()] !== "undefined") {
		$(this).closest(".forum_post").find(".entry").css("font-family", fonts[$(this).html()])
	} 
});