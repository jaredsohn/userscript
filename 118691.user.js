// ==UserScript==
// @name        MusicBrainz: Show Wikipedia summaries + artist/label images
// @description This script will show Wikipedia summaries on artist/release group/label/work pages and, if found, artist images or label logos.
// @namespace   http://userscripts.org/users/41307
// @version     2012-10-10
// @author      -
// @include     *://musicbrainz.org/artist/*
// @include     *://musicbrainz.org/label/*
// @include     *://musicbrainz.org/work/*
// @include     *://beta.musicbrainz.org/artist/*
// @include     *://beta.musicbrainz.org/label/*
// @include     *://beta.musicbrainz.org/work/*
// @include     *://test.musicbrainz.org/artist/*
// @include     *://test.musicbrainz.org/label/*
// @include     *://test.musicbrainz.org/work/*
//
// ==/UserScript==
//**************************************************************************//

function injected() {

// The order of lang is important, the first that is found will be used
var acceptable = Array('en', 'de', 'ja');

// Show artist images from MusicBrainz
var mb_artist_image = true;
// Show label logos from MusicBrainz
var mb_label_logo = true;
// Show images from Wikipedia
var wikipedia_image = true;


var picture = "";
var m = document.location.pathname.match(/^\/([a-z-]+)\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})($|\?)/);

if (m && m[1] && m[2]) {
	var ws_url = document.location.protocol + '//' + document.location.host + '/ws/2/'+ m[1] +'/' + m[2] + '?inc=url-rels';

	$.ajax({
		type: 'GET',
		url: ws_url,
		data: '',
		success: mb_success,
	});
}

function mb_success(data, textStatus, jqXHR) {
	var wp_links = {};
	$.each( $("relation", data), function (n, v) {
		if ($(v).attr('type') == "wikipedia") {
			var n = $(v).children('target').text().match(/^http:\/\/([a-z-]+).wikipedia.org\/wiki\/(.*)$/);
			if (jQuery.inArray(n[1], acceptable) >= 0) {
				wp_links[n[1]] = {lang: n[1], page: n[2]};
			}
		}

		if ($(v).attr('type') == "image" && mb_artist_image) { // Artist images
			picture = $(v).text();
		} else if ($(v).attr('type') == "logo" && mb_label_logo) { // Label logos
			picture = $(v).text();
		}
	});

	// Determine prefered wikipedia link
	var wp_link;
	$.each(acceptable, function(i, lang) {
		if (wp_links.hasOwnProperty(lang)) {
			wp_link = wp_links[lang];
			return false;
		}
	});

	if (wp_link && wikipedia_image) {
		wp_link.page = wp_link.page.replace(/&/g, "%26");
		$.getJSON(document.location.protocol+"//"+wp_link.lang+".wikipedia.org/w/api.php?action=parse&format=json&callback=?&page="+wp_link.page+"&prop=text",
		function(data) {
			if (wikipedia_image && !picture) {
				// Find image
				var img_src = $("<div>"+data.parse.text['*']+"<div>").find(".infobox_v2, .infobox")
					.find("tr:eq(1) td > a.image img").attr("src");
				if (img_src && img_src != "") {
					picture = img_src;
				}
			}

			insert_image();
		});
	} else { insert_image(); }

}

function insert_image() {
	if (picture)
		$('#sidebar h2:first').before('<div class="cover-art"><img src="'+picture+'" /></div>');
}

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);
