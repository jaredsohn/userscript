// ==UserScript==
// @name Download XnXX Videos
// @description Adds a button that lets you download XnXX videos.
// @include http://video.xnxx.com/*
// @match http://video.xnxx.com/*
// @author DM
// ==/UserScript==

var videoPlayer, flashVars, videoUrlMatch, videoURL;
var playerDiv, downloadBtn, downloadBtnRef;

videoPlayer=document.getElementById('flash-player-embed');
if (videoPlayer) { // make sure it found the player code
	flashVars=videoPlayer.getAttribute('flashvars');
	if (!flashVars) {
		return;
	}
	videoUrlMatch=flashVars.match(/(?:\&)flv_url=([^(\&|$)]*)/);
	videoURL=(videoUrlMatch)?videoUrlMatch[1]:null;
	if (videoURL) {
		videoURL=unescape(videoURL);
	}
	playerDiv=document.getElementById('player');
	downloadBtn = document.createElement('div');
	downloadBtnRef = document.createElement('a');
	downloadBtnRef.href=videoURL;
	downloadBtnRef.innerHTML="Download";
	downloadBtn.appendChild(downloadBtnRef);
	playerDiv.appendChild(downloadBtn);
} 
