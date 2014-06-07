// ==UserScript==
// @name           Turntable.fm Download Songs
// @namespace      http://userscripts.org/users/347156
// @description    Download songs from turntable.fm
// @include        http://turntable.fm/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	callback = main;

	var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

// Add jQuery
    (function(){
		window.setTimeout(addJQuery, 5000);
    })();

	function main() {
		var curURL = '';
		
	  	function checkURL() {
				try{
					if (window.turntablePlayer.sound.url == curURL) {
						window.setTimeout(checkURL, 5000);
					}else{
						changeURL();
						window.setTimeout(checkURL, 15000);
					}
				}catch(e){ window.setTimeout(checkURL, 15000); }
		}

		function changeURL() {

			curURL = window.turntablePlayer.sound.url;

			$('.songlog .song:first .songinfo .addSong').append('<a href="'+window.turntablePlayer.sound.url+'" target="_blank" style="padding-left:6px; padding-top:10px; color:black;">Download</a>');

			var artist = $('.songlog .song:first .songinfo .details div:first').html();
			var artist = artist.split(" - ");
			var artist = artist[0];

			if ( $('#dlSongLink').length == 0){
				$('.header').append('<div style="position:absolute; top:24px; right:265px; color:white; cursor:pointer; font-size:12px; text-align:center;"><a id="dlSongLink" href="" target="_blank" style="color:yellow;">Download Current Song<br>by '+artist+'</a></div>');
			}

			$('#dlSongLink').attr('href', window.turntablePlayer.sound.url).html('Download Current Song<br>by '+artist);

		}
		checkURL();
	}

