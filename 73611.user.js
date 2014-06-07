// ==UserScript==
// @name		MusicBrainz: Hide track parser
// @description		Hide the track parser on pages where you can't use it
// @version		2010-05-01
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9a36
//
// @include		http://musicbrainz.org/edit/artist/*
// @include		http://musicbrainz.org/edit/artistalias/*
// @include		http://musicbrainz.org/edit/release-group/*
// @include             http://musicbrainz.org/edit/album/edit.html*
// @include 		http://musicbrainz.org/edit/track/*
// @include		http://musicbrainz.org/edit/label/*
// @include		http://musicbrainz.org/edit/labelalias/*
// @include		http://musicbrainz.org/edit/url/*

// ==/UserScript==
//**************************************************************************//


var e = document.getElementsByName("es.tp.tracksarea")[0];
e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';

