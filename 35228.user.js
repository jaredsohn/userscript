// ==UserScript==
// @name           Forum Helper
// @namespace      http://badassmonkey.org/gm/
// @description    Version 1.2.5 - Replaces forum names with clickable links.
// @include        http://*.forumwarz.com/klans/domination
// @include        http://forumwarz.com/klans/domination
// ==/UserScript==
  
//  ForumHelper was originally written by Adam "Invariel" Michaud of the klan Brainfreeze.
//  ForumWarz player and klanmate Westside Wizard has contributed optimization code, helpful suggestions and benchmarking.
  
GM_setValue ("scriptVer", "1.2.5");				// Version
GM_setValue ("scriptName", "Forum Helper");		// Name
  
function site (num, name, abbrev) {
  return '<a href="http://forumwarz.com/forums/battle/' + num + '">' + name + '</a> [' + abbrev + ']';
}
  
window.addEventListener ("load", function (e) {
  var thePage = document.body.innerHTML.replace (/\n/gi, '');
  
  /*
	How to add forums (for fun and profit).
	thePage = thePage.replace (/<the name of the forum, in lower-case letters>/gi, site ("<the forum's number when you actually go there>", "<the forum's name>", "<the short form you want to use>"));
	So, if there was a new forum called "Invariel is Awesome", and it went to forumwarz.com/forums/battle/666. you might add:
	thePage = thePage.replace (/invariel is awesome/gi, site ("666", "Invariel is Awesome", "INVE"));
	and it would display:  "Invariel is Awesome [INVE]" on the Domination page.  It's that easy.
    That's all there is to it.
   */
 

	// Counting utility added by Arktor of Smooth Town Rebels (with thanks to Invariel and Westside Wizard for making it possible)

	var klan = "http://forumwarz.com/klans/profile/snobby_mcsnobbersons";	//Your klan profile link here!
	var count = -1; 							//Note that this is -1 because otherwise the "klan profile" link is counted.
	
	var links = document.links;
	for(var i = 0; i < links.length; i++)
		{
  		 var href = links[i].href
			if (href == klan)
			count++;
		}
	// End counting utility (except for the replace function)


  thePage = thePage.replace (/denture chat/gi, site ("1", "Denture Chat", "DENTURE"))
                   .replace (/the furry farm/gi, site ("4", "The Furry Farm", "FURRY"))
                   .replace (/dr. jojo\'s plastic surgery stronghold/gi, site ("7", "Dr. Jojo\'s Plastic Surgery Stronghold", "JOJO"))
                   .replace (/that\'s a lot of feces!/gi, site ("13", "That\'s a Lot of Feces!", "FECES"))
                   .replace (/fitness faggotry/gi, site ("14", "Fitness Faggotry", "FITFAGS"))
                   .replace (/rice, rice, baby/gi, site ("15", "Rice, Rice, Baby", "RICE"))
                   .replace (/konservative kristian koalition/gi, site ("20", "Konservative Kristian Koalition", "KKK"))
                   .replace (/r.p.genius/gi, site ("22", "R.P.Genius", "RPGEN"))
                   .replace (/headbanger\'s hellhole...of death/gi, site ("29", "Headbanger\'s Hellhole...of Death", "HHOD"))
                   .replace (/woe is us/gi, site ("36", "Woe is Us", "WOE"))
                   .replace (/south carolina marine fisheries forum/gi, site ("44", "South Carolina Marine Fisheries Forum", "FISHES"))
                   .replace (/coral springs nuclear generating station/gi, site ("46", "Coral Springs Nuclear Generating Station", "NUKE"))
                   .replace (/gamefags/gi, site ("87", "GameFAGS", "GFAGS"))
                   .replace (/terra online/gi, site ("88", "Terra Online", "TERRA"))
                   .replace (/zombie armageddon/gi, site ("90", "Zombie Armageddon", "ZOMBIE"))
                   .replace (/fanfiction freaks/gi, site ("91", "Fanfiction Freaks", "FANFIC"))
                   .replace (/suburban gangsta paradise/gi, site ("92", "Suburban Gangsta Paradise", "SGP"))
                   .replace (/paranoid panorama/gi, site ("93", "Paranoid Panorama", "PP"))
                   .replace (/home of male objectors/gi, site ("94", "Home of Male Objectors", "HOMO"))
                   .replace (/church of saiyantology/gi, site ("95", "Church of Saiyantology", "CHURCH"))
                   .replace (/youboob/gi, site ("96", "YouBoob", "BOOB"))
                   .replace (/fathers against pornography/gi, site ("97", "Fathers Against Pornography", "FAP"))
                   .replace (/deviousartists/gi, site ("98", "DeviousArtists", "DEVART"))
                   .replace (/the urbane dictionary/gi, site ("99", "The Urbane Dictionary", "URBANE"))
                   .replace (/god hates facts/gi, site ("100", "God Hates Facts", "FACTS"))
                   .replace (/wiccapedia/gi, site ("101", "Wiccapedia", "WICCA"))
                   .replace (/howstuffbreaks/gi, site ("102", "HowStuffBreaks", "BREAKS"))
                   .replace (/memebusters/gi, site ("103", "MemeBusters", "MEME"))
                   .replace (/homicide girls/gi, site ("113", "Homicide Girls", "GIRLS"))
                   .replace (/second wife/gi, site ("114", "Second Wife", "WIFE"))
                   .replace (/praypal/gi, site ("115", "PrayPal", "PRAY"))
                   .replace (/something lawful/gi, site ("116", "Something Lawful", "LAW"))
                   .replace (/dolphin love/gi, site ("117", "Dolphin Love", "LOVE"))
                   .replace (/great firewall of china/gi, site ("118", "Great Firewall of China", "CHINA"))
                   .replace (/internet movie douchebags/gi, site ("119", "Internet Movie DoucheBags", "IMDB"))
                   .replace (/faux news/gi, site ("120", "Faux News", "FAUX"))
                   .replace (/ratm: rage against the moderators/gi, site ("121", "RAtM: Rage Against the Moderators", "RAtM"))
		   .replace("Klan Domination", "Klan Domination Count: " + count + " forums")		   
				   // New forums get inserted right above.
				   ;


	


  document.body.innerHTML = thePage;
}, "false");