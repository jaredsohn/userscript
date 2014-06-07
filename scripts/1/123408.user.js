// ==UserScript==
// @name		MusicBrainz: Advanced search by default
// @description		Always set the search box at the top to advanced
// @version		2012-01-16
// @author		-
// @namespace	df069240-fe79-11dc-95ff-0800200c9a66
//
// @include		http://*musicbrainz.org/*
// ==/UserScript==
//**************************************************************************//

var adv = document.createElement('input');
adv.name = 'advanced';
adv.value = '1';
adv.type = 'hidden';
document.getElementById('headerid-query').parentNode.appendChild(adv);
