// ==UserScript==
// @name                    Youtube Quality Autoplay
// @namespace               http://nmgod.com
// @description             Stops youtube videos from auto-playing, sets video quality
// @version                 1.5
// @include                 *.youtube.com/watch*
// @updateURL               http://userscripts.org/scripts/source/153284.meta.js
// @installURL              http://userscripts.org/scripts/source/153284.user.js
// @copyright               NMGod
// ==/UserScript==

var qualityLevels = {'default':null, '9001p':'highres', '1080p':'hd1080', '720p':'hd720', '480p':'large', '360p':'medium', '240p':'small', '144p':'tiny'};

/*****SET USER PREFERENCES HERE*****/

//Set video quality here, see above variable for available levels
//Video will use selected or next lowest quality if selected is unavailable
var strSelectedVideoQuality = qualityLevels['360p'];

//Whether to autoplay videos
var blnAutoPlayVideo = false;

//Whether to autoplay playlist, overrides above setting for videos in a playlist
var blnAutoPlayPlaylist = true;

//Whether to pause instead of stop video when autoPlayVideo/autoPlayPlaylist is true
var blnAutoPlayPause = false;

/*****END USER PREFERENCES*****/

var ytVideoPlayer;
var intLoadTimeout = 200;

WaitForLoad();


function WaitForLoad() {
	ytVideoPlayer = document.getElementById('movie_player') || document.getElementById('movie_player-flash') || document.getElementById('movie_player-html5') || document.getElementById('movie_player-html5-flash');
	
	if(ytVideoPlayer && typeof(ytVideoPlayer.getPlayerState) == "function" && typeof(ytVideoPlayer.setPlaybackQuality) == "function" && typeof(ytVideoPlayer.getPlaylist) == "function" && typeof(ytVideoPlayer.pauseVideo) == "function" && typeof(ytVideoPlayer.stopVideo) == "function" && ytVideoPlayer.getPlayerState() != -1) {
		setTimeout(ApplyAutoPlay, 100);
	} else {
		if(intLoadTimeout > 0) { 
			setTimeout(WaitForLoad, 10);
			intLoadTimeout--;
		}
	}
}

function ApplyAutoPlay() {
	if(!blnAutoPlayVideo) {
		
		if(ytVideoPlayer.getPlaylist()) {
			//Playlist
            if(!blnAutoPlayPlaylist) {
                if(!blnAutoPlayPause)
                    ytVideoPlayer.stopVideo();
                else
                    ytVideoPlayer.pauseVideo();
            }
        } else {
			//Video
			if(!blnAutoPlayPause)
				ytVideoPlayer.stopVideo();
            else
                ytVideoPlayer.pauseVideo();
		}
	}
    
	setTimeout(ApplyVideoQuality, 50);
}

function ApplyVideoQuality() {
	if(strSelectedVideoQuality) {
		ytVideoPlayer.setPlaybackQuality(strSelectedVideoQuality);
		
		if(intLoadTimeout > 0 && player.getPlaybackQuality() != strSelectedVideoQuality) {
			setTimeout(ApplyVideoQuality, 10);
			intLoadTimeout--;
		}
	}
}