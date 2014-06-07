// ==UserScript==
// @name	   Byte.fm -> What.cd
// @author	   Johannes Baiter
// @description	   This userscript changes the behaviour of the programme pages
//		   of german internet radio "Byte.FM". The links to iTunes
//		   below each track are replaced with links to the
//		   corresponding what.cd search page. Furthermore, artist's
//		   names are clickable and lead to the artist's page
//		   on what.cd.
// @include        *://*.byte*fm*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// ==/UserScript==

$(document).ready( function() {

function xpath(query) {
	// Helper function to browse the DOM tree
	return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function convert_ampersand(str) {
	// Converts the ampersand so it looks nicer
	str = str.replace(/&amp;/g,"&");
	return str
}

// Initialize variables, get table rows and cd/itunes links
var cdLinks, thisLink, thisTableRow;
tableRows = xpath('//td[@style="padding-right: 5px;"]')
cdLinks = xpath("//a[contains(.,'CD')]")
itunesLinks = xpath("//a[contains(.,'iTunes')]")

// Parse through track entries and change "iTunes" to "what.cd"
for (var i=0; i < cdLinks.snapshotLength; i++) {
    thisLink = cdLinks.snapshotItem(i);
    thisItunesLink = itunesLinks.snapshotItem(i);
	// Get search string from amazon-url
    var url = thisLink.href;
    var startStr = url.indexOf('keywords=')+9;
    var endStr = url.indexOf("&tag=");
    var searchstring = url.substring(startStr, endStr);
	// Replace iTunes link with what.cd link
    thisItunesLink.innerHTML='What.CD';
    thisItunesLink.href = 'http://what.cd/torrents.php?searchstr=' + searchstring;
	}

// Parse through artist names and create a link to what.cd
for (var i=0; i < tableRows.snapshotLength; i++) {
	thisTableRow = tableRows.snapshotItem(i);
	// Get artist name
    var endArt = thisTableRow.innerHTML.indexOf(' / ');
    var artist = convert_ampersand(thisTableRow.innerHTML.substring(0, endArt));
    var whatUrl = "http://what.cd/artist.php?name=" + artist;
	// Create new Element containing link
    span = document.createElement('span');
    a = document.createElement('a');
    a.appendChild(document.createTextNode(artist));
    var link = "http://what.cd/artist.php?name=" + artist;
    a.setAttribute('href', link);
    span.appendChild(a);
	// Add rest of table row to span, replace it
    span.innerHTML += thisTableRow.innerHTML.substring(endArt, thisTableRow.innerHTML.length);
    thisTableRow.innerHTML = span.innerHTML; 
	}
} );
