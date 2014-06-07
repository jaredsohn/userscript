// ==UserScript==
// @name           Worldoflogs link
// @description    Add link to battle net
// @include        http://www.worldoflogs.com/*
// @include        http://worldoflogs.com/*

// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @resource wowIcon http://favicon.yandex.ru/favicon/www.wow-mego.ru
// ==/UserScript==
// Copyright Nagaev Maksim  <nagaev.maksim@gmail.com>


function AddLinks(){
	
	var rows = jQuery("table.playerRankMixed tr.odd,table.playerRankMixed tr.even");
	
	jQuery(jQuery("table.playerRankMixed col").get(0)).css('width', '55px');
	
	rows.each(function(index, element) {
		
		var baseUrlEu = 'http://eu.battle.net/wow/ru/search?q=';
		var baseUrlUs = 'http://us.battle.net/wow/en/search?q=';
		
		var baseUrl = baseUrlEu;
		var regexpEu = /^EU-/i;
		var regexpUs = /^US-/i;
		
		
		var name = jQuery(jQuery('td', element).get(1)).text();
		var server = jQuery(jQuery('td', element).get(5)).text();
		
		var isEu = regexpEu.test(server);
		var isUs = regexpUs.test(server);
		
		if (isEu){
			baseUrl = baseUrlEu;
			server = server.replace(/^EU-/i,'');
		} else if (isUs){
			baseUrl = baseUrlUs;
			server = server.replace(/^US-/i,'');
		} else {
			server = 'wrong';
		}
		var href = baseUrl + encodeURI(name + '@' + server);
		
		var iconUrl = GM_getResourceURL('wowIcon');
		
		var newImage = document.createElement("IMG");
		newImage.setAttribute("src", GM_getResourceURL("iconUrl"));
		
		var link  = jQuery('<a target="_blank" title="Link to battle.net profile" alt="Armory" href="'+href+'" ></a>');
		link.append(newImage);
		
		jQuery(jQuery('td', element).get(0)).append(link);
	});
}

AddLinks();