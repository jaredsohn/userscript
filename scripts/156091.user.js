// ==UserScript==
// @name        Anti Antiblock.org - Osthessennews.org
// @namespace   Greez by Triple_HXH
// @description entfernt die Anti Adblockmeldung
// @include     http://osthessen-news.de/
// @include     http://osthessen-news.de/*
// @include     http://*.osthessen-news.de/
// @version     1
// @grant       none
// ==/UserScript==

$(function() {
	$("style :last").remove();
	$("#block").remove();
	
	var test = $("p :first").html();
	if(test == "Bitte deaktivieren Sie Ihren Werbeblocker!"){
		$("p :first").remove();
	}
	
});