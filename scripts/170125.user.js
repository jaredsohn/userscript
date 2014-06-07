// ==UserScript==
// @name        YouTube 1080p
// @namespace   jacobbundgaard.dk
// @description Makes YouTube play in 1080p both when embedded and on the YouTube website
// @match       *://*.youtube.com/watch*
// @match       *://*.youtube.com/embed/*
// @grant       none
// @version     1.1
// ==/UserScript==

// Settings
var quality = "hd1080"; // "hd1080" for 1080p, "hd720" for 720p

// Initialization
if (window.location.pathname.startsWith("/embed/")) {
    // Embedded
    setQualityUsingURL();
} else if (!window.frameElement) {
    // On YouTube website
    window.onYouTubePlayerStateChange = setQualityUsingAPI;
    window.onYouTubePlayerReady = function() {
        // addEventListener oddity - second parameter must be string
        window.movie_player.addEventListener("onStateChange", "window.onYouTubePlayerStateChange");
    }
}

// Functions
function setQualityUsingURL() {
    if (window.location.search.search(new RegExp("[\?&]vq=" + quality, "i")) == -1) {
        window.location.search += (window.location.search.startsWith("?") ? "&" : "?") + "vq=" + quality;
    }
}


function setQualityUsingAPI() {
    if (window.movie_player != undefined && window.movie_player.setPlaybackQuality != undefined) {
        window.movie_player.setPlaybackQuality(quality);
        return true;
    }
}