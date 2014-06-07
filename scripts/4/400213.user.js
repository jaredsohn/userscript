// ==UserScript==
// @name       Guild Wars 2 Wiki to gw2spidy Link Generator
// @namespace  http://lunyx.net/
// @version    0.1
// @description  Adds a link to each entry in the guild wars 2 wiki that links to a search for that term on gw2spidy.com
// @match      http://wiki.guildwars2.com/*
// @copyright  2014+, Lunyx
// ==/UserScript==

//check if it is an item
if ($("div:contains('— In-game description')").length > 0){
    //encode item name for url
	var name = encodeURIComponent($("#firstHeading").text())
	//add the link
	$("#firstHeading").append( "<span style='font-size:12px;'> <a href='http://www.gw2spidy.com/search/" + name + "?recipes=0'>gw2spidy</a></span>" );
}