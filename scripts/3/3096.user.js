//########################################################################
//          IMDB Hebrew Movie Names
//
// *** Description: ***
//  This script is for Hebrew users of IMDB. Whenever you view a movie page
//  at IMDB, the script adds a link to the Hebrew name of the movie
//  at Targumon. (Targumon is a nice site that has a database of movie names
//  in Hebrew and in English).
//
//  No fancy stuff here. Just smoother browsing.
//
// *** Technical details: ***
//
// By: Lior Zur, 2006
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give proper credit. Thanks.
// Improvements & suggestions are welcome.
//
// Change Log:
//  0.3 (21.2.07): Updated for the new IMDB style.
//  0.2 (3.10.06): Updated Targumon's URL.
//  0.1 (4.2.06): First version.
//
//########################################################################
// ==UserScript==
// @name           IMDB Hebrew Movie Names
// @namespace      http://mywebsite.com/myscripts
// @description    Adds links from IMDB movies to the their Hebrew names at Targumon.
// @include        http://imdb.com/*
// @include        http://www.imdb.com/*
// @include        http://uk.imdb.com/*
// @include        http://us.imdb.com/*
// ==/UserScript==
var currentURL;
var allElements, thisElement;
var f, g;
var i;
function trimAll(sString) { return sString.replace(/^\s+/g, '').replace(/\s+$/g, ''); }
var urlTargumonQuery = "http://www.targumon.co.il/titlelist.asp?kw="; //"http://www16.brinkster.com/targumon/titlelist.asp?kw=";
var reMoviePage = /http:\/\/.*imdb\.com\/title\/tt\d{7,}\/$/;
currentURL = window.location.href;
//GM_log("script started...");
if (reMoviePage.test(currentURL)) {
//GM_log("script enters main section...");
//## Run the loop on all appropriate links.
allElements = document.evaluate(
    "//div[contains(@id,'title')]/h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log ("links being processed: " + allElements.snapshotLength);
for (f = 0; f < allElements.snapshotLength; f++) {
	//GM_log("Found title...");
	thisElement = allElements.snapshotItem(f);
	var titleString = thisElement.innerHTML;
	i = titleString.indexOf("<span>");
	if (i != -1) {
		titleString = titleString.substring(0,i);
	}
	if (titleString.length > 4) 
	  { titleString = titleString.replace(/(\bthe\b)|(\bof\b)|(\bin\b)|(\bat\b)|(\bis\b)|(\ba\b)|(\ban\b)|(\band\b)/gi,"");} //remove small words
	titleString = titleString.replace(/[\"\'\-\:\+\.\x26]/gi," "); //remove punctuation marks.
	titleString = titleString.replace(/amp;/g,""); //remove the strange artifact of &. (\x26)
	titleString = trimAll(titleString); //Remove trailing spaces.
	titleString = titleString.replace(/\s+/g,"+"); //convert spaces (any series of spaces) into +.
	//GM_log (titleString);
	var newLinkTemp = document.createElement("div");
	newLinkTemp.innerHTML = "<a style='font-size:1em; background: #f6ffc4;' href='" + urlTargumonQuery + titleString + "'>Hebrew Name (Targumon)</a>";
	thisElement.parentNode.insertBefore(newLinkTemp, thisElement.nextSibling);
} //end for (loop links)
} //End if (is it Main Section)



