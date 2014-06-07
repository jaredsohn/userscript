// ==UserScript==
// @name           World of Logs to battle.net armory
// @namespace      sp00n
// @description    Adds a link in the rankings overview to the player's battle.net armory
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        http://*.worldoflogs.com/rankings/players/*
// ==/UserScript==

if (typeof(unsafeWindow.jQuery) == 'undefined') {
	//jQuery is not defined.
}
else {
	jQuery(function () {
		String.prototype.dasherize = function() {
			return this.replace(/\s/g, "-");
		};

		var rows = $(".playerRankMixed").find("tr");
		
		// http://eu.battle.net/wow/en/character/guldan/Druck/advanced (Gul'dan)
		// http://eu.battle.net/wow/en/character/defias-brotherhood/Nasg%c3%b9l/advanced
		
		jQuery.each(rows, function(k, row) {
			var rank, span, name, server, guild, region, link;
			rank = $(row).find(".rank");
			span = rank.html();
			if (rank.length < 1) return true; 	// continue
			
			name   = rank.next().children().html().toLowerCase();
			guild  = rank.nextAll().eq(3).children().html().toLowerCase();
			server = rank.nextAll().eq(4).children().html().toLowerCase();
			
			
			// Server: two first letters are region, followd by a dash
			region = server.substr(0, 2);
			server = server.substr(3).dasherize();
			
			// Create the link
			link = "http://"+region+".battle.net/wow/en/character/"+server+"/"+name+"/advanced";
			
			// Insert the link
			// Use the Rank cell
			rank.html($("<a>").attr({
				"href"  : link,
				"target": "_blank"
			}).html(span));
		});
	});
};