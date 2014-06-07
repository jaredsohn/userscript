// ==UserScript==
// @name          YouTube Replay Button
// @namespace     http://userstyles.org
// @description	  Adds a button to enable you to replay YouTube videos.
// @author        Dubiouz
// @homepage      .
// @include       http://*youtube.com/watch?v=*
// ==/UserScript==
(function() {
    document.getElementById("watch-actions").innerHTML += "<button data-tooltip-timer=\"717\" data-tooltip=\"Replay this video\" onclick=\"toggleReplay();return false;\" type=\"button\" class=\"yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip\" id=\"watch-replay\" role=\"button\" aria-pressed=\"false\"><span class=\"yt-uix-button-content\">Replay Off</span></button>";
	
    document.head.appendChild(document.createElement("script")).innerHTML = "var rStatus = 0;var rButton=document.getElementById('watch-replay');function toggleReplay(){if(rStatus==0){rStatus=1;rButton.innerHTML='<span class=\"yt-uix-button-content\">Replay On</span>';}else if(rStatus=1){rStatus=0;rButton.innerHTML='<span class=\"yt-uix-button-content\">Replay Off</span>';}}";
	
    document.body.appendChild(document.createElement("script")).innerHTML = "var player=document.getElementById('movie_player');player.addEventListener('onStateChange','onPlayerStateChange');function onPlayerStateChange(newState){if(newState == 0 && rStatus == 1){player.playVideo();}}";
})();