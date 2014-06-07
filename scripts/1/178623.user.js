// ==UserScript==
// @name           Disable Video Autoplay on SMH & The Age
// @namespace      http://andrewpunch.com.au/smh
// @description    Disables videos in articles from automatically playing on SMH and The Age
// @include        http://*smh.com.au/*
// @include        http://*theage.com.au/*
// ==/UserScript==
// Version 1.0.0

function removeVideo() {
	var video = document.getElementById('video-player-content');
	if(video) {
		video.parentNode.removeChild(video); 
	}
}
removeVideo();
