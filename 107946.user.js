// ==UserScript==
// @name           Torrentech Search by robbee
// @namespace      ttsearch
// @include        http*://*torrentech.org/index.php?showtopic=*
// ==/UserScript==

// Sites to search, feel free to add some
var searchstring = getSearchstring();
var searching = new Array();
// Discogs
searching[0] = "<a href=\"http://www.discogs.com/search?q=" + encodeURIComponent(searchstring) + "&type=all\" target=\"_blank\"><img src=\"http://robbee.no-ip.org/images/discogs.png\" title=\"Discogs Search\"></a>";
// Beatport
searching[1] = "<a href=\"http://www.beatport.com/search?query=" + encodeURIComponent(searchstring) + "\" target=\"_blank\"><img src=\"http://robbee.no-ip.org/images/beatport.png\" title=\"Beatport Search\"></a>";
// Boomkat
searching[2] = "<a href=\"http://boomkat.com/search?q=" + encodeURIComponent(searchstring) + "&sort=relevance\" target=\"_blank\"><img src=\"http://robbee.no-ip.org/images/boomkat.png\" title=\"Boomkat Search\"></a>";
// Juno
searching[3] = "<a href=\"http://www.juno.co.uk/search/?quick_search_records=m_physical&q=" + encodeURIComponent(searchstring) + "&s_search_precision=any&s_search_type=all&s_genre_id=0000\" target=\"_blank\"><img src=\"http://robbee.no-ip.org/images/juno.png\" title=\"Juno Search\"></a>";
// Digital-tunes
searching[4] = "<a href=\"http://www.digital-tunes.net/search?search=" + encodeURIComponent(searchstring) + "\" target=\"_blank\"><img src=\"http://robbee.no-ip.org/images/digital-tunes.png\" title=\"Digital-Tunes Search\"></a>";

function getPosition() {

	// We're gonna add the icons to a span with a class called norm. First we have to find that span.
	var doc_span = document.getElementsByTagName('span');

	// By default our span is the 8th span on the page. If it isn't (page gets edited or something), we loop all spans to find it.
	if(doc_span[7].className == "norm") {
		return doc_span[7];
	} else {	
		for (i=0;i<=doc_span.length;i++) {
			if(doc_span[i].className == "norm") {
				return doc_span[i];
			}
		}
	}
	// Not found, shouldn't happen.
	return;
}

function getSearchstring() {
	// Getting artist and album seemed easiest with the title, since artist and album have no elements for themselves.
	var explode = document.title.split(" - Torrentech: electronic music torrent downloads");
	var explode2 = explode[0].split(" - ");
	var artist = explode2[0];
	var album = explode2[1];
	return artist + " " + album;
}

// Is it a torrent topic?
if(document.body.innerHTML.search(/Download torrent as text file/i) != "-1") {
	var title = getPosition();
	title.innerHTML = " " + searching.join(" ");
}
