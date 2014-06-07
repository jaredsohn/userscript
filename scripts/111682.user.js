// ==UserScript==
// @name	MusicBrainz: Show label logos on label pages
// @namespace   asdfghjkl;
// @version     2011-12-17
// @author      
// @include     http://*musicbrainz.org/label/*
// ==/UserScript==
//**************************************************************************//

function injected() {

var m = document.location.href.match(/\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/);
var mbid = m[1];

var ws_url = 'http://' + document.location.host + '/ws/2/label/' + mbid + '?inc=url-rels';

$.ajax({
	type: 'GET',
	url: ws_url,
	data: '',
	success: success,
});

function success(data, textStatus, jqXHR) {
	var url = "";
	$.each( $("relation", data), function (n, v) {
		if ($(v).attr('type') == "logo") {
			url = $(v).text();
		}
	} );

	if (url)
		$('#sidebar').prepend('<div class="cover-art"><img src="'+ url +'" alt="Logo" /></div>');
}

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);
