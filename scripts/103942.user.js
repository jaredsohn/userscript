// ==UserScript==
// @name		MusicBrainz: Show full annotation.
// @description		Show the full annotation instead of just two lines.
// @version		2011-10-23
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9dd6
//
// @include		http://*musicbrainz.org/artist/*
// @include		http://*musicbrainz.org/release-group/*
// @include		http://*musicbrainz.org/release/*
// @include		http://*musicbrainz.org/recording/*
// @include		http://*musicbrainz.org/work/*
// @include		http://*musicbrainz.org/label/*
//
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//**************************************************************************//

var annotation = document.getElementsByClassName("annotation-body")[0];
if (annotation) {
	var links = annotation.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		if (links[i].href == document.location.protocol+"//"+document.location.host+document.location.pathname+"/annotation") {
			get_annotation(links[i].href);
		}
	}
}

function get_annotation(url) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
	        if (this.readyState != 4) { return; }
		$(".annotation-body").html( $(".annotation-body", this.responseText).html() );
	}

	xmlhttp.open('GET', url, true);
	xmlhttp.send(null);
}