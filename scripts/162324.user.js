// ==UserScript==
// @name        MusicBrainz: Hide artists that match the current artist or release artist
// @description 
// @version     2012-01-15
// @author      -
// @namespace   http://userscripts.org/users/41307
//
// @include     *://musicbrainz.org/artist/*
// @include     *://beta.musicbrainz.org/artist/*
// @include     *://test.musicbrainz.org/artist/*
// @include     *://musicbrainz.org/release/*
// @include     *://beta.musicbrainz.org/release/*
// @include     *://test.musicbrainz.org/release/*
// @exclude     *://musicbrainz.org/artist/*/edits*
// @exclude     *://beta.musicbrainz.org/artist/*/edits*
// @exclude     *://test.musicbrainz.org/artist/*/edits*
// @exclude     *://musicbrainz.org/release/*/edits*
// @exclude     *://beta.musicbrainz.org/release/*/edits*
// @exclude     *://test.musicbrainz.org/release/*/edits*
// ==/UserScript==
//**************************************************************************//

function injected() {

	var artistHeaderLink;
	var artistName;
	var artistUrl;

	if (document.location.pathname.match(/^\/artist/)) {
		artistHeaderLink = $("h1 a");
		artistName = artistHeaderLink.text();
		artistUrl = artistHeaderLink.attr("href");
	} else if (document.location.pathname.match(/^\/release/)) {
		var header = $("p.subheader").html();
		if (header) {
			if (m = header.match(/(?:Release by|Veröffentlichung von) (.*)/)) {
				artistHeaderLink = m[1];
				artistName = $(artistHeaderLink).text();
			}
		}
	}

	$("td").each(function() {
		var td = $(this);
		// this was supposed to check the artists match and not just the names
		if (td.text() == artistName) { // && td.find("a[href='" + artistUrl + "']").length > 0) {
			td.text("");
		}
	});

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);

