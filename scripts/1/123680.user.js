// ==UserScript==

// @name          Music mashup between last.fm and allmusic.com

// @namespace     

// @description   A Greasemonkey script that finds top albums of the artists playing in last.fm radio

// @include       Update to include last.fm radio sites

// @require       

// ==/UserScript==


var studentCode = function(artist) {
  // ***** Update the code to add more functionality *****
  console.log('Updated page');
  artist.text += "CS 164";
}

var lastArtist = "";

var radioUpdated = function() {
  // check if the artist node exists
  var artistLinks = document.getElementsByClassName('artistName');
  if (artistLinks) {
    var artistName = artistLinks[0].text;
    // check if the artist has changed, won't work if two
    // consecutive songs by the same artist, but thats ok
    if (lastArtist && lastArtist == artistName.slice(0, lastArtist.length)) {
      return;
    }
    lastArtist = artistName;
    console.log("Artist name: " + artistName);

    // call the students code, the setTimeout is needed to get around
    // the browser security policy
    // http://wiki.greasespot.net/Greasemonkey_access_violation
    setTimeout(function() {
      studentCode(artistLinks[0]);
    }, 0);
  } else {
    console.log("Could not find artist link");
  }
};

var init = function() {
  // find the DOM element with id = 'trackMetaData'
  var webRadioDiv = document.getElementById('trackMetaData');
  if (webRadioDiv) {
    // we need to update the site every time this node is modified
    webRadioDiv.addEventListener('DOMNodeInserted', radioUpdated, true);
  }
};

// call the init function after the page is loaded
window.addEventListener('load', init, true);
