// ==UserScript==
// @name          TLBW - Rearrange Forums
// @description   Rearranges the sidebar forum list to make teamliquid useful for Brood War fans
// @version       2.5
// @include       http://teamliquid.net/*
// @include       http://www.teamliquid.net/*
// @exclude       http://teamliquid.net/sc2/*
// @exclude       http://teamliquid.net/store/*
// @exclude       http://teamliquid.net/tlfe/*
// @exclude       http://teamliquid.net/tournaments/*
// @exclude       http://teamliquid.net/vods/*
// @exclude       http://www.teamliquid.net/sc2/*
// @exclude       http://www.teamliquid.net/store/*
// @exclude       http://www.teamliquid.net/tlfe/*
// @exclude       http://www.teamliquid.net/tournaments/*
// @exclude       http://www.teamliquid.net/vods/*
// @exclude       http://www.teamliquid.net/mirror/ad*
// @run-at        document-end
// ==/UserScript==
 
/*  Notes:        This should be fully compatible with Firefox (Greasemonkey)/Chrome/Opera.
 *                Opera users should replace the .user.js extension with just a .js before putting it into the userjs directory.
 *
 *  Changelog:
 *        2.5:    Split off functionality into their own scripts
 *        2.4:    Changed the link when clicking on the TLPD banner to go directly to the BW TLPD
 *        2.3:    Fixed the script run time to properly change everything before the page shows up on all 3 browsers
 *        2.2:    Swapped store and power rank links on the top bar
 *                Moved around the order in which the default changes take place so more visibly obvious changes occur first (before the page fully loads)
 *        2.1:    Added all of teamliquid and blacklisted specific pages to run the script on, instead of whitelisting every individual page
 *        2.0:    Abstracted the section relocation stuff
 */
 
/* Sections: news, general, sc2, bw, games, blogs, replays, calendar, streams, tlpd, liquipedia, tsl, poll */

// Wrap the script in an anonymous function so Opera doesn't blow up
(function() {

function main() {
    // Main Sections
	var news =          new Section("nav_news_left_mid", 1, false);
	var general =       new Section("nav_general", 1, false);
	var sc2 =           new Section("nav_starcraft2", 1, false);
	var bw =            new Section("nav_broodwar", 1, false);
	var games =         new Section("nav_games", 1, false);
	var blogs =         new Section("nav_blogs", 1, false);
	var replays =       new Section("nav_replays", 1, false);

	var calendar =      new Section("nav_calendar", 2, true);
	var streams =       new Section("nav_streams", 1, true);
	var tlpd =          new Section("nav_tlpd", 1, true);
	var liquipedia =    new Section("nav_wiki", 1, true);
	var tsl =           new Section("nav_tslforum", 1, true);
	var poll =          new Section("nav_poll", 1, true);

    // Sub Sections
    var featured_news =     new SubSection("Featured News");
    var community_news =    new SubSection("Community News");
    var liquid_team_news =  new SubSection(99);
    var sponsored_threads = new SubSection("Sponsored Threads");

    var sub_general =           new SubSection(1);    
    var tl_community =      new SubSection(37);
    var fan_clubs =         new SubSection(56);
    var user_streams =      new SubSection(29);
    var tech_support =      new SubSection(46);

    var sc2_general =       new SubSection(19);
    var sc2_tourneys =      new SubSection(36);
    var sc2_strategy =      new SubSection(34);
    var custom_maps  =      new SubSection(44);
    var single_player =     new SubSection(45);

    var bw_general =        new SubSection(6);
    var bw_tourneys  =      new SubSection(8);
    var bw_strategy =       new SubSection(10);

    var sports_games =      new SubSection(12);
    var dota_2 =            new SubSection(62);
    var league_of_legends = new SubSection(51);

    // Remove sub section Dota 2 and League of Legends
	//remove_section(dota_2);
    //remove_section(league_of_legends);

	/* Move the Brood War forums above the SC2 forums */
	move_section(bw, sc2);
	
	/* Move replays below bw */
	move_section(replays, bw);
	move_section(bw, replays);
	
	/* Remove poll */
	//remove_section(poll);
	
	/* Move streams to above TSL */
	move_section(streams, tsl);
}

function Section(id, count, on_right) {
	this.on_right = on_right;
	this.elements = new Array();
	
	var link = document.getElementById(id);
	this.elements.push(link);
	for (var x = 0; x < count; x++) {
		this.elements.push(nextObject(link));
	}
}

function SubSection(id) {
	this.elements = new Array();
	
    var link = document.getElementById("sidebar"+id);

    // Special case for "Featured News", "Community News", "Sponsored Threads"
    if (isNaN(id)) {
        link = document.getElementById("sidebar99");
        switch (id) {
            case "Featured News":
                link = previousObject(link, 4);
                break;
            case "Community News":
                link = previousObject(link, 2);
                break;
            case "Sponsored Threads":
                link = nextObject(link, 2);
                break;
        }
    }

	this.elements.push(previousObject(link));
	this.elements.push(link);
}

var remove_section = function(section) {
	for (var x = 0; x < section.elements.length; x++) {
		var node = section.elements[x];
		node.parentNode.removeChild(node);
	}
}

var prepend_section = function(section, location) {
	var loc = location.elements[0];
	for (var x = 0; x < section.elements.length; x++) {
		var node = section.elements[x];
		loc.parentNode.insertBefore(node, loc);
	}
}

var move_section = function(from, to) {
	remove_section(from);
	prepend_section(from, to);
}

/* Adapted from http://v3.thewatchmakerproject.com/journal/329/ */
var nextObject = function(el, count) {	
    count = count || 1;
    var n = el;
    for (var i=0; i<count; i++) {
	    do n = n.nextSibling;
	    while (n && n.nodeType != 1);
    }
	return n;
}
 
var previousObject = function(el, count) {	
    count = count || 1;
	var p = el;
    for (var i=0; i<count; i++) {
    	do p = p.previousSibling;
    	while (p && p.nodeType != 1);
    }
	return p;
}

if (window.opera) {
	if (document.readyState==="loading")  {
		if (window.addEventListener)
			window.addEventListener("DOMContentLoaded", main, false);
		else if (window.attachEvent)
			window.attachEvent("onload", main);
	}
	else if (document.readyState==="complete") {
		main();
	}
	else {
		if (window.addEventListener)
			window.addEventListener("load", main, false);
		else if (window.attachEvent)
			window.attachEvent("onload", main);
	}
}
else {
	main();
}
})();

