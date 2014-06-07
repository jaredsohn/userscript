// ==UserScript==
// @name Pandora Title Bar
// @description Update the document title bar with artist/song information from Pandora's new HTML5 interface
// @namespace http://www.softwaresmithy.com/greasemonkey
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include htt*://www.pandora.com/*
// ==/UserScript==



setInterval(function() {
  if($('.playerBarSong').text() != '') {
	var song = $('.playerBarSong').text();
	var artist = $('.playerBarArtist').text();
	var album = $('.playerBarAlbum').text()
	document.title = song + ' by ' + artist + ' on '+album;
  }
}, 1000);