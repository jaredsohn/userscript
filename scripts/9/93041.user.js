// ==UserScript==
// @name           mflow keyboard shortcuts
// @version        0.2
// @namespace      http://denbuzze.com/
// @description    Add keyboard shortcuts for the mflow music service
// @match          http://beta.mflow.com/*
// @include        http://beta.mflow.com/*
// ==/UserScript==


/**
 * Create a script tag and add it to the body element.
 * We need to do it this way since we aren't able to get to the global JavaScript variables in Chrome.
 */
var s = document.createElement("script");
s.innerHTML = 'var titlehandler = function(){ var flow = Mflow.Media.PlaybackManager.getFlowForCurrentPlaylistItem(); if(flow && flow.ArtistName && flow.TrackName){ document.title = flow.ArtistName + " by " + flow.TrackName + " / mflow"; }}; var keyhandler = function(e) { if(document.activeElement && document.activeElement.type == "text") {return; } var htmlPlayer = Mflow.Media.Html5MediaPlayer; titlehandler(); if(e.keyCode == 78 || e.keyCode == 39){ Mflow.Media.PlaybackManager.nextTrack(); } else if (e.keyCode == 80) { if(htmlPlayer.isPlaying()) {  htmlPlayer.pause(); } else { htmlPlayer.resume(); } }; } ; window.addEventListener("keydown", keyhandler, false); document.addEventListener("click", titlehandler, false); ';
document.body.appendChild(s);