//########################################################################
//          IMDB-2-isoHunt
//
// *** Description: ***
// adds link to the isoHunt torrent of this movie.
// Heavly inspired by "Lior Z."'s release of IMDB Hebrew Movie Names (http://userscripts.org/scripts/show/3096)
//
// *** Technical details: ***
//
// By: Golanlan, 2006
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give proper credit. Thanks.
// Improvements & suggestions are welcome.
//
// Change Log:
//  0.1: First release.
//
//########################################################################
// ==UserScript==
// @name           IMDB-2-isoHunt
// @namespace      http://golanlan.deviantart.com
// @description    adds link to the isoHunt torrent of this movie.
// @include        http://*imdb.com/*
// ==/UserScript==
var currentURL;
var allElements, thisElement;
var f, g;
var i;
function trimAll(sString) { return sString.replace(/^\s+/g, '').replace(/\s+$/g, ''); }
var urlIso = "http://isohunt.com/torrents/";
var reMoviePage = /http:\/\/.+\.imdb\.com\/title\/tt\d{7,}\/$/;
currentURL = window.location.href;
//GM_log("script started...");
if (reMoviePage.test(currentURL)) {
//GM_log("script enters main section...");
//## Run the loop on all appropriate links.
allElements = document.evaluate(
    "//strong[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log ("links being processed: " + allElements.snapshotLength);
for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	var titleString = thisElement.innerHTML;
	i = titleString.indexOf("<small>");
	if (i != -1) {
		titleString = titleString.substring(0,i);
	}
	if (titleString.length > 4) 
	  { titleString = titleString.replace(/(\bthe\b)|(\bof\b)|(\bin\b)|(\bat\b)|(\bis\b)|(\ba\b)|(\ban\b)|(\band\b)/gi,"");} //remove small words
	titleString = titleString.replace(/[\"\'\-\:\+\.\x26]/gi," "); //remove punctuation marks.
	titleString = titleString.replace(/amp;/g,""); //remove the strange artifact of &. (\x26)
	titleString = trimAll(titleString); //Remove trailing spaces.
	titleString = titleString.replace(/\s+/g,"+");
	//GM_log (titleString);
	var newLinkTemp = document.createElement("div");
	newLinkTemp.innerHTML = "<a style='font-size:0.5em;font-family:tahoma;' href='" + urlIso + titleString + "?ihp=1&iht=-1&ihs1=2&iho1=d'>isoHunt's torrent</a>";
	thisElement.parentNode.insertBefore(newLinkTemp, thisElement.nextSibling);

} //end for (loop links)
} //End if (is it Main Section)
