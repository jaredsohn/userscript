// ==UserScript==
// @name	PureTNA & Empornium HighLighter.
// @namespace	http://userscripts.org/
// @description	Highlights selected titles on the browse/seach page.
// @include	*puretna.com/browse.php?*
// @include	*empornium.us/browse.php?*
// ==/UserScript==

/*
	This script is pretty simple. It allows you to set a set of strings which will be highlighted
	on both PureTNA and Empornium browse and search pages. It took all of 10 minutes to write, so
	if you feel like something needs to be added and/or fixed, let me know and i'll give it a go.
	Also, feel free to make your own changes and post them!

	Created on 3/23/08

*/

// =============================
// = Configure Settings Below! =
// =============================


// Define your own colors here.
var matchBG="yellow";		// Background color of the matched items.
var matchCOLOR="black";		// Forground/Text color of matched items.

// Define your keywords here, enclose each in quotes, and seperate with a comma.
// Here are a few examples i'm sure you'll love!!
var KW = new Array("xxx","dvd","horse","chainsaw");

// This is where all the magic happens! ;)
// Get all link objects.
var allLinks=document.getElementsByTagName("a");
for(var i=0; i < allLinks.length; i++){
	// Find the link address.
	var linkAddress=allLinks[i].href;
	// If it has this string, its a valid link, so parse it.
	if(linkAddress.match("details.php")) {
		for(var ii=0; ii < KW.length; ii++) {
			// Minipulate (remove HTML) the string so we can match it with normal text.
			var innerHTML=allLinks[i].innerHTML;
			var innerText=innerHTML.replace(/(<([^>]+)>)/ig,"");
			innerText=innerText.toLowerCase();
			// And check for matches for EACH keyword variable.
			if(innerText.match(KW[ii].toLowerCase())) {
				allLinks[i].style.backgroundColor=matchBG;
				allLinks[i].style.color=matchCOLOR;
			}
		}
	}
}