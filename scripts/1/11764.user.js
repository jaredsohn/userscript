// ==UserScript==
// @name          MplayerTube
// @namespace     http://www.infinitebubble.org/
// @description   Makes youtube videos play in mplayerplug-in
// @include       http://www.youtube.com/watch*
// @include       http://youtube.com/watch*
// @include       http://*.youtube.com/w*
// ==/UserScript==

// YouTube URL: http://www.youtube.com/watch?v=[video_id]
// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]

function getAddressVariable(address, variable) {
	return address.toString().split(variable+'=')[1].split('&')[0];
}

var flAddress = document.getElementById('movie_player').getAttribute('flashvars');
var video_id = getAddressVariable(flAddress, 'video_id');
var t = getAddressVariable(flAddress, 't');
var height = document.getElementById('movie_player').getAttribute('height');
var width = document.getElementById('movie_player').getAttribute('width');

var video_url = 'http://youtube.com/get_video?video_id=' + video_id + '&t=' + t;

var playerDiv = document.getElementById('playerDiv');
playerDiv.innerHTML = '<embed type="application/x-mplayer2" src="' + video_url + '" width="' + width + '" height="' + height + '">' ;