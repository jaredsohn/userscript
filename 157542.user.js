// ==UserScript==
// @name         teszt
// @namespace    http://use.i.E.your.homepage/
// @version      0.1
// @description  Neobux auto clicker
// @include      *neobux.com*
// @require	 http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

$(window).focus(function(){
	console.log("Oldal aktív");
	aktiv = true;
});
$(window).blur(function(){
	console.log("Oldal inaktív");
	aktiv = false;
});
$(window).load(function(){
	console.log("Oldal betöltve");
	console.log($(window).attr("onfocus"));
});