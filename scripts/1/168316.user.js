// ==UserScript==
// @name NoAdsWunderMap
// @namespace http://github.com/chyiz‎
// @description Removes wundermap ads and resize the setting panel
// @include http://www.wunderground.com/wundermap/*
// ==/UserScript== 

function a(){
	var head = document;
	head.getElementById('map_panel_footer').style.display = "none";
	head.getElementById('map_panel_content').style.bottom = "0";
}
a();