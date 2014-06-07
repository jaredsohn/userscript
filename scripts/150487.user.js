// ==UserScript==
// @name        Deezer automatique
// @namespace   vic511
// @description Démarrer automatiquement des playlists
// @include     http://www.deezer.com/*/playlist/*
// @version     1.1
// ==/UserScript==
function autoplay(){
	$("#h_random a").eq(0).trigger("click");
	$("ul#reading a.h_icn_play").trigger("click");
	console.log("autoplay");
	$("#naboo_menu_list_library a").dblclick(autoplay);
}
setTimeout(autoplay,5000);
