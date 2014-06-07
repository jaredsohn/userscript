// ==UserScript==
// @name            WOXY mini-playlist AllMusic link
// @description     change artist links in WOXY's mini playlist to search AllMusicGuide
// @include         http://woxy.com/music/miniplay/miniplayer.php
// @include         http://www.woxy.com/music/miniplay/miniplayer.php
// ==/UserScript==

// send all comments to celston@gmail.com

var div = document.getElementById('nowPlaying');
var temp = div.getElementsByTagName('*');
var ul = temp[1];
var list = ul.getElementsByTagName('li');

var n = list.length;
for ( i = 0; i < n; i++ ) {
	var li = list[i];
	var links = li.getElementsByTagName('a');
	var temp = links[1].innerHTML.split( ' - ' );
	var artist = temp[0];
	var artist = artist.replace( 'The ', '' );
	var artist = artist.replace( / /g, '+' );
	var artist = encodeURI( artist );
	
	links[1].href = 'http://www.allmusic.com/cg/amg.dll?SQL=' + artist + '&OPT1=1&P=amg';
}

