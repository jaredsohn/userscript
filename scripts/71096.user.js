// ==UserScript==
// @name           Utopia Additional Links
// @namespace      del.tct
// @description    Adds addition page links for utopia
// @include        http://utopia-game.com/wol/game/*
// ==/UserScript==

// News Menu HTML
var newsHTML="<dl><dt>News</dt><dd><ul><li><a href=\"/wol/game/kingdom_news\">Kingdom</a></li><li><a href=\"/wol/game/province_news\">Province</a></li></ul></dd></dl>";

// Council Menu HTML
var councilHTML="<dl><dt>Advisors</dt><dd><ul>";
councilHTML = councilHTML.concat("<li><a href=\"/wol/game/council_state\">State</a></li>");
councilHTML = councilHTML.concat("<li><a href=\"/wol/game/council_military\">Military</a></li>");
councilHTML = councilHTML.concat("<li><a href=\"/wol/game/council_internal\">Buildings</a></li>");
councilHTML = councilHTML.concat("<li><a href=\"/wol/game/council_learn\">Science</a></li>");
councilHTML = councilHTML.concat("<li><a href=\"/wol/game/council_spells\">Mystics</a></li>");
councilHTML = councilHTML.concat("<li><a href=\"/wol/game/council_history\">History</a></li></ul></dd></dl>");

// navigation is the id of the div for the left menu
var navigation=document.getElementById('navigation');
if (navigation)
{
	// Replace old news link with new list
	var oldList = navigation.children[0].children[2];
	if (oldList)
	{
		oldList.innerHTML=newsHTML;
	}

	// Add in the links to the council pages
	var newElement = document.createElement("li");
	newElement.innerHTML=councilHTML;
	navigation.children[0].children[2].insertBefore(newElement, null);
}