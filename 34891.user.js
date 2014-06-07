// ==UserScript==
// @name           Last.fm free player
// @namespace      last.fm free player
// @include        http://www.lastfm.*/music/*
// @include        http://www.last.fm/music/*
// @exclude        http://www.lastfm.*/music/*/*/*
// @exclude        http://www.last.fm/music/*/*/*
// ==/UserScript==

var ads1Tag = document.getElementById('LastAd_TopRight');
	ads1Tag.style.display = "none";

function GetArtistPagePlayer()
{
	var playerTag = document.getElementById('player');
	var artistheadline = document.getElementsByTagName("h1")[1];
	var artistname = artistheadline.innerHTML;
		
	playerTag.innerHTML = '<iframe src="http://enot.itce.ru/lastfm/audio.php?player=yes&artist='+encodeURIComponent(artistname)+'" frameborder="0" scrolling="no" height="280"></iframe>';
				

}
	
	GetArtistPagePlayer();