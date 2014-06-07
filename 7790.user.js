// Better Page Titles on Astro Empires
// In response to "Feature Request" Better support for tabbed browsers
// http://forum.astroempires.com/viewtopic.php?t=5591
//
//
// Version 0.9.5 - 15 mar 2007
// Creation Date: 04 mar 2007
// Copyright (c) 2007, Asdrubal R. Velasquez Lagrave
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// Do you like this script?, send me a Personal Message inside game Astro Empires, 
// I'm Rodak: http://alpha.astroempires.com/profile.aspx?player=2709

//
//
// ==UserScript==
// @name Better Page Titles of Tabs on Astro Empires
// @namespace http://tgtf.zinergica.com/rodak
// @description QUESTION: I use Firefox and usually have several tabs of AE open - especially if something is going down. To better aid organisation - could you move the name of the page to the front of the page's title tag?  i.e. instead of my fleets page's title reading "Astro Empires - Fleet" - it would read "Fleet - Astro Empires" -- Answer: Use This ;-)
// @author Asdrubal R. Velasquez Lagrave
// @include http://*.astroempires.com/*
// ==/UserScript==


// get the current location
var urlhostname = location.hostname.toString();

if (urlhostname == "alpha.astroempires.com" || "beta.astroempires.com"){
	// get the current URL
	var url = window.location.toString();
	//get the parameters
	url.match(/\?(.+)$/);
	var params = RegExp.$1;
	// split up the query string and store in an
	// associative array
	var params = params.split("&");
	var EmpireParams = {};
	
	
	
	// get parameters from page
	function getparams() {
		for(var i=0;i<params.length;i++)
		{
			var tmp = params[i].split("=");
			EmpireParams[tmp[0]] = unescape(tmp[1]);
		}
	}
	 
	
	switch(location.pathname)
	{
		case "/commander.aspx": document.title = "AE-Commanders"; break;
		case "/guild.aspx": document.title = "AE-Guild"; break;
		case "/notes.aspx": document.title = "AE-Notes"; break;
		case "/bookmarks.aspx": document.title = "AE-Bookmarks"; break;
		case "/messages.aspx": document.title = "AE-Messages"; break;
		case "/board.aspx": document.title = "AE-Board"; break;
	
		case "/base.aspx":
			var base = document.forms[0].elements[0];
			document.title = base.options[base.selectedIndex].text;
			break;
	
	
		case "/map.aspx": 
			getparams();
			if (EmpireParams["map"]){
				document.title = "AE-Map/" + EmpireParams["map"]; break;
			}
			if (EmpireParams["loc"]){
				document.title = EmpireParams["loc"]; break;
			}
			else{
				document.title = "AE-Map"; break;
			}
	

		case "/fleet.aspx":
			getparams();
			if (EmpireParams["gal"]){
				document.title = "AE-Fleets/" + EmpireParams["gal"]; break;
			}
			else{
				document.title = "AE-Fleets"; break;
			}

		case "/empire.aspx":
			getparams();
			 for(var i in EmpireParams)
			 {
				 switch(EmpireParams[i])
				 {
				 case "scanners": document.title = "AE-Scanners"; break;
				 case "technologies": document.title = "AE-Tech"; break;
				 case "units": document.title = "AE-Units"; break;
				 case "structures": document.title = "AE-Structures"; break;
				 case "economy": document.title = "AE-Economy"; break;
				 case "bases_capacities": document.title = "AE-Base Capacities"; break;
				 case "bases_events": document.title = "AE-Base Events"; break;
				 case "trade": document.title = "AE-Trade"; break;
				 default: document.title = "AE-Empire"; break;
				 }
			 }
	}
}


if (urlhostname == "forum.astroempires.com"){
	// New Forum Titles
	// Only Affects to Astro Empires Forum -> http://forum.astroempires.com/
	var newtitle = new Array();
	var path = location.pathname;

	if (path == "/index.php"){
		document.title = "Forum Index";
	}
	else{
		newtitle = document.title.split("Astro Empires :: ");
		document.title = newtitle[1];
	}
}


// end
