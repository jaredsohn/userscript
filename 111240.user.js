// ==UserScript==
// @name          TLBW
// @description   Userscript to make teamliquid more useful for Brood War fans
// @version       2.4
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
// @run-at        document-end
// ==/UserScript==
 
/*  Notes:        This should be fully compatible with Firefox (Greasemonkey)/Chrome/Opera.
 *                Opera users should replace the .user.js extension with just a .js before putting it into the userjs directory.
 *
 *  Changelog:
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
	var news = new Section("nav_news_left_mid", 1, false);
	var general = new Section("nav_general", 1, false);
	var sc2 = new Section("nav_starcraft2", 1, false);
	var bw = new Section("nav_broodwar", 1, false);
	var games = new Section("nav_games", 1, false);
	var blogs = new Section("nav_blogs", 1, false);
	var replays = new Section("nav_replays", 1, false);
	
	var calendar = new Section("nav_calendar", 2, true);
	var streams = new Section("nav_streams", 1, true);
	var tlpd = new Section("nav_tlpd", 1, true);
	var liquipedia = new Section("nav_wiki", 1, true);
	var tsl = new Section("nav_tslforum", 1, true);
	var poll = new Section("nav_poll", 1, true);
	
	/* Swap Power Rank and Store */
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		if (links[i].getAttribute("href") == "/powerrank/") {
			links[i].href = "/store/";
			links[i].innerHTML = "Store";
		}
		else if (links[i].getAttribute("href") == "/store/") {		
			links[i].href = "/powerrank/";
			links[i].innerHTML = "Power Rank";
		}
	}
	
	/* Remove SC2 Elo rank display */
	var rank1 = nextObject(document.forms.namedItem("frm_tlpd_search"));
	var rank2 = nextObject(rank1);
	rank1.parentNode.removeChild(rank1);
	rank2.parentNode.removeChild(rank2);
	
	/* Move the Brood War forums above the SC2 forums */
	move_section(bw, sc2);
	
	/* Move replays to above poll */
	move_section(replays, poll);
	
	/* Remove poll */
	//remove_section(poll);
	
	/* Only BW streams are important to me */
	let_bw_streams_rule_the_featured_list();
	
	/* Move streams to above TSL */
	move_section(streams, tsl);
	
	/* Change default tlpd search to BW (Korea) */
	document.forms.namedItem("frm_tlpd_search").elements.namedItem("type").children[3].selected = true;
	document.getElementById("nav_tlpd").href = "/tlpd/korean";
	
	/* Change liquipedia search to Brood War liquipedia */
	for (var i = 0; i < document.forms.length; i++) {
		var form = document.forms[i];
		if (form.action == "http://wiki.teamliquid.net/starcraft2/index.php")
			form.action = "http://wiki.teamliquid.net/starcraft/index.php";
	}
	
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

var let_bw_streams_rule_the_featured_list = function() {
	var bwNodes = new Array();
	
	// get all the bw streams
	var featuredStreams = nextObject(document.getElementById("nav_streams"));
	featuredStreams = nextObject(featuredStreams.firstChild).firstChild.firstChild;
	for (var i=0; i < featuredStreams.childNodes.length; i++) {
		var node = featuredStreams.childNodes[i];
		if (node.nodeName == "A" && node.innerHTML.indexOf("[BW] ") != -1) {
			bwNodes.push(node);
		}
	}
	
	var moreStreams = document.getElementById("more_streams");
	for (var i=0; i < moreStreams.childNodes.length; i++) {
		var node = moreStreams.childNodes[i];
		if (node.nodeName == "A" && node.innerHTML.indexOf("[BW] ") != -1) {
			bwNodes.push(node);
		}
	}
	
	// remove all the old featured streams
	while (featuredStreams.hasChildNodes()) {
		featuredStreams.removeChild(featuredStreams.firstChild);
	}
	
	// insert bw streams into the featured streams list
	for (var i=0; i < bwNodes.length; i++) {
		featuredStreams.appendChild(bwNodes[i]);
		featuredStreams.appendChild(document.createElement("br"));
	}
}

/* Adapted from http://v3.thewatchmakerproject.com/journal/329/ */
var nextObject = function(el) {
	var n = el;
	do n = n.nextSibling;
	while (n && n.nodeType != 1);
	return n;
}
 
var previousObject = function(el) {
	var p = el;
	do p = p.previousSibling;
	while (p && p.nodeType != 1);
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
