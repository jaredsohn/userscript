// ==UserScript==
// @name           Grooveshark Manager
// @namespace 
// @version  1.4
// @description    See the title of the current song even while working on a different browser tab or window.
// @include        http://listen.grooveshark.com/*
// @author         Nathan Broadbent (http://nathanf77.wordpress.com/) + KnifeySpooney (http://spogg.com/KnifeySpooney, http://wurbo.com), I just combined and modified a bit
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

// Call this function whenever the song or status changes.
unsafeWindow.setBrowserTitle = function(currentStatus, playingOnly){
  try {
    var song = currentStatus.song;
    var status = currentStatus.status;
    var titleSuffix = "Grooveshark";
    var songTitle = song.songName;

    // When running timer, only update the title if song is playing.
    // (Regular callback will handle other cases, such as stopped, etc.)
    if((playingOnly && status == "playing") || !playingOnly){
      // Generate a title string depending on the current status.
      if(status == "none" || status == "completed") {
        docTitle = titleSuffix;
      } else if(status == "playing" || status == "loading") {
        docTitle = songTitle;
      // Display the status unless the song is playing or loading.
      } else {
        docTitle = songTitle;
      };
      document.title = docTitle;
    };
  } catch(e) {
    // ignore any errors (null songs, etc.)
  };
};

function setGroovesharkCallback(){
  // Wait for the Grooveshark API to be available.
  if(unsafeWindow.Grooveshark) { 
    // Set the songStatus onChange callback.
    unsafeWindow.Grooveshark.setSongStatusCallback("window.setBrowserTitle");
    // Also set the title every 7 seconds in case it is reset by the app.
    // (only sets the title if the song is currently playing.)
    unsafeWindow.setInterval("window.setBrowserTitle(window.Grooveshark.getCurrentSongStatus(), true)", 7000);
  } else {
    setTimeout(setGroovesharkCallback, 1000);
  };
};

setGroovesharkCallback();

var adbar = document.getElementById("capital");
var wrap = document.getElementById("application");
var container = document.getElementById("mainContainer");

var removeAd = function() {
    if (wrap && adbar) {	
        wrap.style.marginRight = "0px";
        adbar.style.display = "none";
        container.removeChild(adbar);
    }
}

container.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();

container.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();
document.title = "Grooveshark";