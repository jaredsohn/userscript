// ==UserScript==
// @name          battle.net links to Epeenbot and WoWReforge
// @namespace     http://battle.net/enhancer
// @description   Adds a link to Epeenbot and WoWReforge (and Shadowcraft if a rogue) to the battle.net armory pages. Also redirects to the english /advanced page
// @include       http://*.battle.net/wow/*/character/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @source        http://userscripts.org/scripts/show/119309
// ==/UserScript==


if(unsafeWindow.console) {
   var log = unsafeWindow.console.log;
}

window.addEventListener('load', function(event) {
	var href, patt, arr, infos, epeen, shadowcraft, wowreforge, rogue, ul;
	
	href  = unsafeWindow.location.href;
	//      http://eu.battle.net/wow/en/character/Wrathbringer/Kushiina/advanced
	//      http://us.battle.net/wow/en/character/alterac-mountains/Killars/simple
	//      http://us.battle.net/wow/en/character/alterac-mountains/Killars/talent/secondary
	patt  = /http:\/\/(\w+)\.battle\.net\/wow\/(\w+)\/character\/(.*)\/(.*)\/(\w+)/gi;
	arr   = patt.exec(href);
	infos = {
		url     : arr[0],
		region  : arr[1].toLowerCase(),
		language: arr[2].toLowerCase(),
		server  : arr[3],
		player  : arr[4],
		type    : arr[5].toLowerCase()
	};
	
	// The real name of the server
	infos.realserver = jQuery.trim($("#profile-info-realm").text());
	
	// Redirect to english language and advanced
	// Redirecting to english doesn't work for KR and TW (and CN?)
	if (infos.region == "kr" || infos.region == "tw") {
		if (infos.type == "simple") {
			window.location.href = "http://"+infos.region+".battle.net/wow/"+infos.language+"/character/"+infos.server+"/"+infos.player+"/advanced";
		}
	}
	else if (infos.type == "simple" || infos.language != "en") {
   		window.location.href = "http://"+infos.region+".battle.net/wow/en/character/"+infos.server+"/"+infos.player+"/advanced";
	}
	
	// Epeenbot link
	// Use the real server name
	epeen = "http://raidbots.com/epeenbot/"+infos.region+"/"+infos.realserver+"/"+infos.player;
	
	// Shadowcraft link
	shadowcraft = "http://shadowcraft.mmo-mumble.com/"+infos.region+"/"+infos.server+"/"+infos.player+"/";
	
	// WoWRegorge
	wowreforge = "http://wowreforge.com/"+infos.region+"/"+infos.realserver+"/"+infos.player;
	
	// Is it a rogue?
	rogue = !!($("#profile-info-spec").next(".class").text() == "Rogue");
	ul    = $("<ul>").addClass("profile-view-options").css("top", "20px").append(
		$("<li>").html($("<a>").attr("target", "_blank").attr("href", epeen).html("Epeenbot"))
	).append(
		$("<li>").html($("<a>").attr("target", "_blank").attr("href", wowreforge).html("WoW Reforge"))
	);
	
	if (rogue) {
		ul.append(
			$("<li>").html($("<a>").attr("target", "_blank").attr("href", shadowcraft).html("Shadowcraft"))
		);
	}
	
	// Append the UL to the page
	$(".summary-top-right").append(ul);
	
}, 'false');
