// ==UserScript==
// @name       gw2spidy to wiki link generator
// @namespace  http://lunyx.net/ http://physfix.com
// @version    0.1
// @description Adds links to the gw2 wiki from the gw2 spidy page.
// @match      http://www.gw2spidy.com/*
// @copyright  2014+, Lunyx, Physfix
// ==/UserScript==

//check if it is an item
if ($(".db-title").length > 0){
    //encode item name for url
	var name = encodeURIComponent($(".db-title").text());
	//add the link
	$(".db-title").append( "<span style='font-size:10px;'> - <a href='http://wiki.guildwars2.com/index.php?title=Special%3ASearch&search=" + name + "&go=Go'>wiki</a> </span>" );
}