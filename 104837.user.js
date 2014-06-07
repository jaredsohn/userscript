// ==UserScript==
// @name           Turntable.fm Download Songs
// @namespace      http://userscripts.org/users/347156
// @description    Download songs from turntable.fm
// @include        http://turntable.fm/*
// ==/UserScript==

var $;
var curURL = '';

// Add jQuery
    (function(){
        $ = unsafeWindow.jQuery;

	window.setTimeout(checkURL, 10000);
    })();

function checkURL() {
	try{
		if (unsafeWindow.turntablePlayer.sound.url == curURL) {
			window.setTimeout(checkURL, 5000);
		}else{
			changeURL();
			window.setTimeout(checkURL, 15000);
		}
	}catch(e){ window.setTimeout(checkURL, 5000); }
}

function changeURL() {

	curURL = unsafeWindow.turntablePlayer.sound.url;
	
	$('.songlog .song:first .songinfo .addSong').append('<a href="'+unsafeWindow.turntablePlayer.sound.url+'" target="_blank" style="padding-left:6px; padding-top:10px; color:black;">Download</a>');

	var artist = $('.songlog .song:first .songinfo .details div:first').html();
	var artist = artist.split(" - ");
	var artist = artist[0];

	if ( $('#dlSongLink').length == 0){
		$('.header').append('<div style="position:absolute; top:24px; right:265px; color:white; cursor:pointer; font-size:12px; text-align:center;"><a id="dlSongLink" href="" target="_blank" style="color:yellow;">Download Current Song<br>by '+artist+'</a></div>');
	}

	$('#dlSongLink').attr('href', unsafeWindow.turntablePlayer.sound.url).html('Download Current Song<br>by '+artist);


}


