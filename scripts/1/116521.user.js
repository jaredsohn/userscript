// ==UserScript==
// @name        SpotifyWhat
// @namespace   http://userscripts.org
// @description Spotify search
// @include     https://what.cd/torrents.php?id=*
// @include     https://what.cd/artist.php?id=*
// @include     https://ssl.what.cd/torrents.php?id=*
// @include     https://ssl.what.cd/artist.php?id=*
// @version     1
// ==/UserScript==

// SETUP:

var openNewTab		= true;
// Open Grooveshark links in new tab?

var textSpotify		= '[Find on Spotify]';
var textGrooveshark	= '[Find on Grooveshark]';
// What do you want the text labels to be?

var enableSpotify	= true;
var enableGrooveshark	= true;
// Which service do you use?

var styleSpotify	= '';
var styleGroove		= '';
// What styles should be applied? Leave alone if you don't know CSS.

// SETUP END

function $ (query) {
	return document.querySelectorAll(query);
}

function makeSpotify (searchInput) {
	var spotifyLink		= document.createElement('a');
	spotifyLink.href	= searchInput;
	spotifyLink.innerHTML	= textSpotify;
	spotifyLink.setAttribute('style', styleSpotify);
	linkBox.appendChild(spotifyLink);
	linkBox.appendChild(document.createTextNode(' '));
}

function makeGrooveshark (searchInput) {
	var grooveLink		= document.createElement('a');
	grooveLink.href		= 'http://grooveshark.com/#/search/?query=' + searchInput.replace(/\ /g, '+');
	grooveLink.innerHTML	= textGrooveshark;
	grooveLink.target	= openNewTab ? '_blank' : '';
	grooveLink.setAttribute('style', styleGroove);
	linkBox.appendChild(grooveLink);
}

function decodeHTML (HTML) {
	var div		= document.createElement('div');
	div.innerHTML	= HTML;
	return div.firstChild.nodeValue;
}


var torrentPage		= document.URL.match(/(torrents\.php\?id=[0-9]+)$/)	? true : false;
var artistPage		= document.URL.match(/(artist\.php\?id=[0-9]+)$/)	? true : false;
var header		= $('.header > h2')[0];
var linkBox		= $('div.linkbox')[0];

if (torrentPage) {
	var albumTitle	= $('.header > h2 > span')[0].innerHTML.split('</a>').length > 1
				? decodeHTML($('.header > h2 > span')[0].innerHTML.split('</a> - ')[1])
				: decodeHTML($('.header > h2 > span')[0].innerHTML.split(/ - (.+)/)[1]);

	var artistList	= $('li.artist_main');
	var artists	= [];
	for (var i = 0; i < artistList.length; i = i + 1) {
		artists.push(decodeHTML(artistList[i].querySelector('a').innerHTML));
	}
	var artists	= artists.join('" OR "');
	var searchInput	= 'spotify:search:artist:"' + artists + '" album:"' + albumTitle + '"';
	if (enableSpotify) {
		makeSpotify(searchInput);
	}
	if (enableGrooveshark) {
		makeGrooveshark(albumTitle);
	}
} else if (artistPage) {
	var artistName	= decodeHTML(header.innerHTML.trim());
	var searchInput	= 'spotify:search:artist:"' + artistName + '"';
	if (enableSpotify) {
		makeSpotify(searchInput);
	}
	if (enableGrooveshark) {
		makeGrooveshark(artistName);
	}
}