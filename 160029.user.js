// ==UserScript==
// @name         video-element-rate-controller
// @namespace    https://github.com/mirnhoj/video-element-playbackrate-setter
// @version      0.1
// @description  add keyboard shortcuts that will increase/decrease the playback rate for video elements.
// @include      *youtube.com/*
// ==/UserScript==
// 
// if you want to extend the functionality of this script to other sites
// besides youtube, add additional @include keys to the metadata block.
//
// if you want to change the default playback rate from 1x, change the line
// "var currentPlaybackRate = 1;" to equal something other than 1, like 1.3 to
// have all videos start playing at an increased speed, or 0.7 to have all
// videos start playing at a decreased speed.
//
// if you want change the granularity of the playback rate adjustment, change
// the line "var speedStep = 0.1;" to equal something other than 0.1, like 0.01
// for more granular adjustments, or 0.25 for less granular adjustments. 


var currentPlaybackRate = 1;  // default playback rate.
var speedStep = 0.1;


var infobox = document.createElement("h1");
infobox.setAttribute("id", "playbackrate-indicator");
infobox.style.position = "fixed";
infobox.style.top = "10%";
infobox.style.right = "10%";
infobox.style.color = "rgba(255, 0, 0, 0.5)";
infobox.style.zIndex = "99999";  // ensures that it shows above other elements.
infobox.style.visibility = "hidden";


function setPlaybackRate(rate) {
    // fix floating point errors like 1.1 + 0.1 = 1.2000000000000002.
    rate = Math.round(rate * (1 / speedStep)) / (1 / speedStep);

    // grab the video elements and set their playback rate
    var videoElements = document.querySelectorAll("video");
    for (var i = 0; i < videoElements.length; i++) {
        videoElements[i].playbackRate = rate;
    }

    // show infobox if not already added and update rate indicator.
    if (videoElements && !document.getElementById("playbackrate-indicator")) {
        document.body.appendChild(infobox);
        infobox.style.visibility = "visible";
    }
    infobox.innerHTML = rate + "x";
}


document.addEventListener('DOMContentLoaded', function() {
    setPlaybackRate(currentPlaybackRate);
});


// youtube videos don't always load on the DOMContentLoaded event :-/
document.addEventListener('DOMNodeInserted', function() {
    setPlaybackRate(currentPlaybackRate);
});


// mimic vlc keyboard shortcuts
window.addEventListener('keydown', function(event) {
    var keycode = event.charCode || event.keyCode;

    // decrease playback rate if '[' is pressed
    if (keycode === 91 || keycode === 123 || keycode === 219) {
        currentPlaybackRate -= speedStep;
    }

    // increase playback rate if ']' is pressed
    if (keycode === 93 || keycode === 125 || keycode === 221) {
        currentPlaybackRate += speedStep;
    }

    // need to set playback rate for all keydown events since it seems like the
    // standard youtube keyboard shortcuts--like the arrow keys to skip forward
    // and backwards--are set to reset the playback rate to 1.
    setPlaybackRate(currentPlaybackRate);
});