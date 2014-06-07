// ==UserScript==
// @name           Grooveshark Enhancements
// @namespace
// @version  1.5
// @description    See the title of the current song in the browser title even while working on a different browser tab or window. Automatically click the 'Resume Playback' button when that pesky 'inactivity warning' shows up.
// @include        http://listen.grooveshark.com/*
// @author         Nathan Broadbent (http://nathanf77.wordpress.com/)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==


var p = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
	var div = document.createElement("div");
	div.setAttribute("onclick", "return window;");
	p = div.onclick();
};

var $ = p.$;



// Call this function whenever the song or status changes.
p.setBrowserTitle = function(currentStatus, playingOnly){
  try {
    var song = currentStatus.song;
    var status = currentStatus.status;
    var titleSuffix = "Grooveshark - Listen to Free Music Online - Internet Radio - Free MP3 Streaming";
    var songTitle = song.songName + " - " + song.artistName;

    // When running timer, only update the title if song is playing.
    // (Regular callback will handle other cases, such as stopped, etc.)
    if((playingOnly && status == "playing") || !playingOnly){
      // Generate a title string depending on the current status.
      if(status == "none" || status == "completed") {
        docTitle = titleSuffix;
      } else if(status == "playing" || status == "loading") {
        docTitle = songTitle + " :: " + titleSuffix;
      // Display the status unless the song is playing or loading.
      } else {
        docTitle = songTitle + " [" + status + "] :: " + titleSuffix;
      };
      document.title = docTitle;
    };
  } catch(e) {
    // ignore any errors (null songs, etc.)
  };
};

// Call this function periodically to click the button to resume playing
// after an inactive period pops up a warning.
p.checkForInactivityWarning = function(){
  $("#interactionTimeForm").submit();
};


function setGroovesharkCallback(){
  // Wait for the Grooveshark API to be available.
  if(p.Grooveshark) {
    // Set the songStatus onChange callback.
    p.Grooveshark.setSongStatusCallback("window.setBrowserTitle");
    // Also set the title every 7 seconds in case it is reset by the app.
    // (only sets the title if the song is currently playing.)
    p.setInterval("window.setBrowserTitle(window.Grooveshark.getCurrentSongStatus(), true)", 7000);
    p.setInterval("window.checkForInactivityWarning()", 5000);
  } else {
    setTimeout(setGroovesharkCallback, 1000);
  };
};

setGroovesharkCallback();