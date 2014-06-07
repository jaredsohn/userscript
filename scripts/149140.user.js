// ==UserScript==
// @name		MusicBrainz: Use beta server exclusively
// @description		Redirect to the beta server when loading musicbrainz.org URLs.
// @version		2012-09-20
// @author		-
// @namespace		http://userscripts.org/users/41307
//
// @include		http://musicbrainz.org/*
// @exclude		http://musicbrainz.org/release/add*
// @exclude		http://musicbrainz.org/ws/*
// @include		https://musicbrainz.org/*
// @exclude		https://musicbrainz.org/release/add*
// @exclude		https://musicbrainz.org/ws/*
// ==/UserScript==
//**************************************************************************//

document.location = document.location.href.replace("musicbrainz.org", "beta.musicbrainz.org");

