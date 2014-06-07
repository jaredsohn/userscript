// ==UserScript==
// @name		MusicBrainz: Relookup disc IDs
// @description		This adds a link next to the CD TOC on a disc ID's page, so you can add the disc ID to another release.
// @version		2010-02-12
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://musicbrainz.org/show/cdtoc/*

// ==/UserScript==
//**************************************************************************//

var e = document.getElementsByClassName("formstyle")[0].getElementsByTagName("td")[1];
e.innerHTML += ' (<a href="/bare/cdlookup.html?toc=' + e.innerHTML + '">lookup</a>)';
