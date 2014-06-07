// ==UserScript==
// @name		MusicBrainz: Remove ratings
// @description		
// @version		2011-12-29
// @author		-
// @namespace	        df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://*musicbrainz.org/*
// ==/UserScript==
//**************************************************************************//

function injected() {

	$("h2").each(function(i){
		this.id = "h2-" + $(this).text().replace(/[^A-Za-z]/g,"").toLowerCase();
	});

	$("th.rating").hide();
	$("span.inline-rating").parent().hide();
	$("#h2-rating").hide();

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);

