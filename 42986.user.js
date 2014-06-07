// ==UserScript==
// @name		MusicBrainz: Restructure the iframes on MBWikipediaAlbumARs
// @description		This script modifies the iframes and places them side by side for easier access.
// @version		2009-02-23
// @author		navap
// @namespace		http://musicbrainz.org
//
// @include		http://users.musicbrainz.org/~robert/wikialbums/*

// ==/UserScript==
//**************************************************************************//


var wiki=document.getElementsByTagName("iframe")[0];
wiki.style.width = '49%';
wiki.style.height = '90%';
wiki.style.cssFloat = 'left';

var brainz=document.getElementsByTagName("iframe")[1];
brainz.style.width = '49%';
brainz.style.height = '100%';
brainz.style.cssFloat = 'right';

var br=document.getElementsByTagName("br")[0];
br.parentNode.removeChild(br);
