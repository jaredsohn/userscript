// ==UserScript==
// @name	MusicBrainz: Show artist logos on artist pages
// @namespace   asdfghjkl;
// @version     2011-11-17
// @author      
// @include     http://*musicbrainz.org/artist/*
// ==/UserScript==
//**************************************************************************//

function injected() {

var m = document.location.href.match(/\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/);
var mbid = m[1];

var ws_url = 'http://musicbrainz.org/ws/2/artist/' + mbid + '?inc=url-rels';

$.ajax({
	type: 'GET',
	url: ws_url,
	data: '',
	success: success,
});

function success(data, textStatus, jqXHR) {
	var url = "";
	$.each( $("relation", data), function (n, v) {
		if ($(v).attr('type') == "image") {
			url = $(v).text();
		}
	} );

	if (url)
		$('#sidebar').prepend('<div class="cover-art"><img src="'+ url +'" alt="Artist image" /></div>');
}

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);
