// ==UserScript==
// @name           MusicBrainz: Add Edit Annotation Link
// @version        2011-12-28
// @author         Kovács Endre János
// @namespace      mb.kovacsur
// @description    Adds an "edit annotation" link below the annotation (or in place of it if it's missing)
// @include        /^http://musicbrainz.org/(artist|release|release-group|recording|work)\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
// @include        http://musicbrainz.org/artist/*
// @include        http://musicbrainz.org/release-group/*
// @include        http://musicbrainz.org/release/*
// @include        http://musicbrainz.org/recording/*
// @include        http://musicbrainz.org/work/*
// @include        http://beta.musicbrainz.org/artist/*
// @include        http://beta.musicbrainz.org/release-group/*
// @include        http://beta.musicbrainz.org/release/*
// @include        http://beta.musicbrainz.org/recording/*
// @include        http://beta.musicbrainz.org/work/*
// @include        http://test.musicbrainz.org/artist/*
// @include        http://test.musicbrainz.org/release-group/*
// @include        http://test.musicbrainz.org/release/*
// @include        http://test.musicbrainz.org/recording/*
// @include        http://test.musicbrainz.org/work/*
// ==/UserScript==
//**************************************************************************//

if (/^http:\/\/(beta\.|test\.)?musicbrainz\.org\/(artist|release|release-group|recording|work)\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(window.location.href)) {
	var scr = document.createElement("script");
	scr.textContent = "(" + add_edit_annotation_link + ")();";
	document.body.appendChild(scr);
}

function add_edit_annotation_link() {
	var TYPE_AND_MBID_REGEX = /(artist|release|release-group|recording|work)\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
	type_and_mbid = window.location.href.match(TYPE_AND_MBID_REGEX)[0];
	edit_annotation_link = type_and_mbid + '/edit_annotation';
	if ($("div.annotation").length) {
		$("div.annotation").append('<p><a href="/'+ edit_annotation_link + '">Edit annotation</a></p>');
	} else {
		$("div.tabs").after('<h2>Annotation</h2><div class="annotation"><a href="/'+edit_annotation_link+'">Add annotation</a></div>')
	}
}