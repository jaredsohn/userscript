// ==UserScript==
// @name          wowprogress.com links to Epeenbot and WoWReforge
// @namespace     http://www.wowprogress.com/enhancer
// @description   Adds a link to Epeenbot and WoWReforge (and Shadowcraft if a rogue) to the wowprogress.com pages.
// @include       http://*.wowprogress.com/character/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @source        http://userscripts.org/scripts/show/130084
// ==/UserScript==


if(unsafeWindow.console) {
   var log = unsafeWindow.console.log;
}

window.addEventListener('load', function(event) {
	var href, patt, arr, infos, navblock, epeen, shadowcraft, wowreforge, rogue, div, a;
	
	href  = unsafeWindow.location.href;
	// http://www.wowprogress.com/character/eu/server/charname
	patt  = /http:\/\/.*\.?wowprogress\.com\/character\/(\w+)\/(.*)\/(.*)/gi;
	arr   = patt.exec(href);
	infos = {
		url     : arr[0],
		region  : arr[1].toLowerCase(),
		server  : arr[2],
		player  : arr[3]
	};
	
	// The real name of the server
	navblock = $(".armoryLink").closest(".nav_block");
	infos.realserver = navblock.find(".nav_link").text().split("-");
	infos.realserver.splice(0, 1);
	infos.realserver = infos.realserver.join("-");
	
	
	// Epeenbot link
	// Use the real server name
	epeen = "http://raidbots.com/epeenbot/"+infos.region+"/"+infos.realserver+"/"+infos.player;
	
	// Shadowcraft link
	shadowcraft = "http://shadowcraft.mmo-mumble.com/"+infos.region+"/"+infos.server+"/"+infos.player+"/";
	
	// WoWRegorge
	wowreforge = "http://wowreforge.com/"+infos.region+"/"+infos.realserver+"/"+infos.player;
	
	// Is it a rogue?
	rogue = !!(navblock.find("i").find("span").text() == "rogue");
	
	div = $("<div>").addClass("nav_block").css({
		"text-align": "right",
		"line-height": "22px"
	});
	a   = $("<a>").attr("target", "_blank").addClass("armoryLink").css("margin-left", "10px");
	
	div.append(a.clone().attr("href", epeen).html("(epeenbot)"));
	div.append(a.clone().attr("href", wowreforge).html("(wow reforge)"));
	
	
	if (rogue) {
			div.append(a.clone().attr("href", shadowcraft).html("(shadowcraft)"));
	}
	
	div.insertAfter(navblock);
	
}, 'false');
