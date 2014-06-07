// ==UserScript==
// @name        KofC New-Design
// @author      Tomás Tapia Silva
// @version    	0.1
// @namespace   http://www.kaisanetwork.net/kofc-newdesign 
// @description Script para modificar el diseño del juego Kingdoms of Camelot (Facebook).
// @include     http://apps.facebook.com/kingdomsofcamelot/*
// @include     http://www.facebook.com/common/error.html
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	$("div[class='UIStandardFrame_SidebarAds']").css("display", "none");
	$("div[class='UIStandardFrame_Content']").css("width", "960");
	var frameGame = $("iframe[name^='fb_iframe_4']");
	frameGame.contents().find("div[id='progressBar']").css("display", "none");
});