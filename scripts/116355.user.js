// GC Watchlist Enhancer
// version 1.0
// 2011-10-25
// Copyright (c) 2011, Radoslav Bielik & R4ZoRs
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 
//
// ENGLISH
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// To uninstall, go to Tools/Manage User Scripts,
// select "GC Watchlist Enhancer", and click Uninstall.
//
// SLOVAK
// Toto je skript pre Greasemonkey (Firefox addon)
//
// Pre nainstalovanie je potrebny Greasemonkey: http://greasemonkey.mozdev.org/
// Po instalacii Greasemonkey restartujte Firefox a znova otvorte tento skript.
// Pre odinstalovanie otvorte Tools/Manage User Scripts,
// zvolte "GC Watchlist Enhancer" a kliknite "Uninstall"
//
// 
//
// ==UserScript==
// @name           GC Watchlist Enhancer
// @version        1.0
// @namespace      http://bielik.org/greasemonkey
// @description    V1.0 - Adds quick links to Watchlist and Favorites to the quick links placed on the top of the page. Also adds nice little counters to your geocache and trackable watchlists.
// @include        http://*.geocaching.com/my/*
// ==/UserScript==

gc_add_watchlist_links();
gc_add_watchlist_counters();

function gc_add_watchlist_links()
{
	// find the "lists" (link or text) within the ctl00_divContentMain container
	var divContainer = document.getElementById("ctl00_divContentMain");
	var linkLists = null;

	// search for lists
	if(divContainer != null)
	{
		// search for a link first
		var linkElements = divContainer.getElementsByTagName("a");
		for(var i in linkElements)
		{
			var currentLink = linkElements[i];
			if(currentLink.href != null && currentLink.href.indexOf("lists.aspx") != -1)
			{
				linkLists = linkElements[i];
				break;
			}
		}

		// if not found, search for a <strong> element
		if(linkLists == null)
		{
			var strongElements = divContainer.getElementsByTagName("strong");
			for(var j in strongElements)
			{
				if(strongElements[j].innerHTML == "Lists" || strongElements[j].innerHTML == "Seznamy")
				{
					linkLists = strongElements[j];
					break;
				}
			}
		}
	}

	// if lists link/strong was found, add the additional links
	if(linkLists != null)
	{
		var linkWatchlist = document.createElement('a');
		linkWatchlist.setAttribute("href", "http://www.geocaching.com/my/watchlist.aspx");
		linkWatchlist.appendChild(document.createTextNode("Watchlist"));

		var linkFavorites = document.createElement('a');
		linkFavorites.setAttribute("href", "http://www.geocaching.com/my/favorites.aspx");
		linkFavorites.appendChild(document.createTextNode("Favorites"));


		var linksContainer = linkLists.parentNode;
		var linksSibling = linkLists.nextSibling;

		linksContainer.insertBefore(document.createTextNode(" ("), linksSibling);				
		linksContainer.insertBefore(linkWatchlist, linksSibling);
		linksContainer.insertBefore(document.createTextNode(", "), linksSibling);				
		linksContainer.insertBefore(linkFavorites, linksSibling);
		linksContainer.insertBefore(document.createTextNode(")"), linksSibling);				
	}
}

function gc_add_watchlist_counters()
{
	// check if we're on the watchlist page
	if(document.location.pathname.indexOf("watchlist.aspx") == -1)
		return;

	// get the container
	var divContainer = document.getElementById("ctl00_divContentMain");
	if(divContainer != null)
	{
		// get the H3 headers and <tbody> elements
		var headers = divContainer.getElementsByTagName("h3");
		var tables = divContainer.getElementsByTagName("tbody");

		// there might be onle 1 table if there are no trackables watched
		// first one should be the one with geocaches
		if(headers.length >= 1 && tables.length >= 1)
			// count the <tr> within each <tbody> to get the geocache/trackable counts
			headers[0].innerHTML += " (" + tables[0].getElementsByTagName("tr").length + ")";

		// second one (if available) is the list of trackables
		if(headers.length >= 2 && tables.length >= 2)
			headers[1].innerHTML += " (" + tables[1].getElementsByTagName("tr").length + ")";
	}
}
