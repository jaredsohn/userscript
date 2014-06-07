// ==UserScript==
// @name           MusicBrainz: Show what YouTube channel videos are in MB
// @namespace      http://userscripts.org/users/437360
// @description    Add a link to the notlob.eu page for the youtube channel when an artist/label has one
// @licence        WTFPL (http://www.wtfpl.net/txt/copying/)
// @include        http://*musicbrainz.org/artist/*
// @include        http://*musicbrainz.org/label/*
// @exclude        http://*musicbrainz.org/artist/*/edit
// @exclude        http://*musicbrainz.org/artist/*/edits
// @exclude        http://*musicbrainz.org/artist/*/open_edits
// @exclude        http://*musicbrainz.org/label/*/edit
// @exclude        http://*musicbrainz.org/label/*/edits
// @exclude        http://*musicbrainz.org/label/*/open_edits
// @exclude        http://*musicbrainz.org/artist/*/split
// ==/UserScript==


function injected() {
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

var youtube_chan = "";
function mb_success(data, textStatus, jqXHR) {
	$.each( $("relation", data), function (n, v) {
		if ($(v).attr('type') == "youtube") {
			youtube_chan = $(v).text();
        }
	});
	chan_on_sidebar();
}

function chan_on_sidebar() {
	if (youtube_chan){
		var notlob_page = 'http://notlob.eu/reports/youtube?channel='+youtube_chan;
		
		$('h2.external-links').before('<h2 class="notlob-links">Notlob links</h2><ul class="external_links"> <li> <a href="' + notlob_page +'">Are videos in MB?</a></li></ul>');
	}
}

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);