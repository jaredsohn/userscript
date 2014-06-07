// ==UserScript==
// @name           I've got Steam
// @namespace      Armada
// @description    Bypasses the annoying "Got Steam?" popup
// @include      http://store.steampowered.com/app/*
// @include      https://store.steampowered.com/app/*
// @include      http://store.steampowered.com/sub/*
// @include      https://store.steampowered.com/sub/*
// @include      http://store.steampowered.com/video/*
// @include      https://store.steampowered.com/video/*
// ==/UserScript==

var areas = Array.filter(document.links, function(elem){ return elem.className == "download_btn" || elem.className == "game_area_demo_btn" || elem.className == "btn_addtocart_content"; });

for(var i=0;i<areas.length;i++) {
	var anchor = areas[i];
	//Split the href on , or '
	var params = anchor.href.split(/[,']/);
	//Is it a Got Steam? link?
	if(params[1] == "gotSteamModal") {
		//Kill it with fire!
		anchor.href = params[4]; //params[4] is the link
	}
}