window.addEventListener("load", function(e) {
	
	var title = document.location.href;
	title = title.split("/");
	var spot = (title.length - 1);
	var artist = title[spot];
	
	var pburl = "http://thepiratebay.org/music/artist/" + artist;
	
	link = "<a href=\""+pburl+"\" class=\"widget\">";
	link += "<img style=\"width:40px;height:40px;margin-left:-30px;\"";
	link += "src=\"http://static.thepiratebay.org/img/tpblogo_sm_ny.gif\" alt=\"The Pirate Bay\" />The Pirate Bay</a><br />";
	
	var LastWidgets = document.getElementById("LastWidgets").innerHTML;
	
	document.getElementById("LastWidgets").innerHTML = link + LastWidgets;
	
}, false);

// Script by defrex
// email: defrex0@gmail.com

// ==UserScript==
// @name          Last.pb
// @namespace     http://defrex.com
// @description   A script that adds a link the the pirate bay music section to last.fm artist pages
// @include       http://last.fm/music/*
// ==/UserScript==