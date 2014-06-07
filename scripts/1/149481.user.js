// ==UserScript==
// @name Pandora Song Info
// @description Pandora Songs
// @userspace http://userscripts.org/scripts/show/149481
// @include htt*://www.pandora.com/*
// ==/UserScript==

function triggerEvent (EventString, Device, Pld1, Pld2, Pld3)
{
var GirderEvent = new ActiveXObject("GIRDERX.Girder");
GirderEvent.TriggerEvent(EventString, Device, Pld1, Pld2, Pld3, 0)
}


setInterval(function() {
  if($('.playerBarSong').text() != '') {
	var song = $('.playerBarSong').text();
	var artist = $('.playerBarArtist').text();
	var album = $('.playerBarAlbum').text()
//	document.title = song + ' by ' + artist + ' on '+album;
  }
}, 1000);