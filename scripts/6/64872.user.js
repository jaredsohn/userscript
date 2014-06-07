// ==UserScript==
// @name        WoW (US) Forums Festive Avatar Removal
// @namespace   Lasre/Lasbank of Emerald Dream (US)
// @description Replaces festive avatars on the World of Warcraft (US) Forums with their defaults
// @include     http://forums.worldofwarcraft.com/*
// @include     https://forums.worldofwarcraft.com/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

/* - Changelog -

0.6b: - Set jQuery lib version on 1.3.2 due to issue with 1.4 & greasemonkey
0.6a: - userscripts.org release.
0.6:  - Fixed Ghostcrawler/Bornakk/Zootfizzle.
      - Slight code rework.
0.5:  - Most Blizzard employee avatars restored.

*/

(function() {
		function avatar(a,b) a.css("background-image", "url(" + b + ".gif)");
					
		avatars    = $(".shell table tbody tr td");
		raceicons  = $(".player-icons-race");
		classicons = $(".player-icons-class");
		levels     = $(".iconPosition b small");
		names      = $("div .chardata span b");
		prefix     = "\/images\/portraits\/";
		bliz       = prefix + "bliz\/";
		employees  = ["ghostcrawler", "Zarhym", "Nethaera", "bornakk", "Daelo", "Wryxian", "Eyonix", "Radoslawn", "Slouken", "Hortus", "Drysc", "Tigole", "Zootfizzle"];
		
		if ($("#portrait").length > 0) {
			// Remove info from own avatar
			avatars.splice(0,1);
			levels.splice(0,1);
		}
		
		for (i=0; i < $(avatars).length; i++) {
			if ($(avatars[i]).css("background-image").indexOf("bliz") >= 0) {
				// Blizzard
				
				var bname = $(names[i]).text();
				var identified = 0;
				
				for (var a=0; a < employees.length; a++) {
					if (bname.toLowerCase() == employees[a].toLowerCase()) {
						if (bname == "Radoslawn") avatar( $(avatars[i]), bliz + "Dwarf" );
						else avatar( $(avatars[i]), bliz + employees[a] );
						
						var identified = 1;
						break;
					}
				}
				if (identified == 0) avatar( $(avatars[i]), bliz + "bliz" );
				
				avatars.splice(i,1);
				names.splice(i,1);
				i--;
				continue;
			}

			else if ($(avatars[i]).css("background-image").indexOf("mvp") >= 0) {
				// MVP
				avatar( $(avatars[i]), prefix + "mvp/mvp" );
				continue;
			}
			
			raceicon  = $(raceicons[i]).css("background-image");
			raceicone = raceicon.substr(raceicon.lastIndexOf("/") + 1);
			race = raceicone.split("-", 1);
			gender = raceicone.split("-", 2)[1].substr(0, 1);
			
			classicon  = $(classicons[i]).css("background-image");
			class = classicon.substr(classicon.lastIndexOf("/") + 1).split(".", 1);
			
			level = $(levels[i]).text();
			
			if (level < 60) url_level = "-default";
			else if (level >= 60 && level < 70) url_level = "";
			else if (level >= 70 && level < 80) url_level = "-70";
			else url_level = "-80";
		
			avatar( $(avatars[i]), prefix + "wow" + url_level + "\/" + gender + "-" + race + "-" + class );
		}
}());