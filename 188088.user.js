// ==UserScript==
// @name           YouTube Auto HD
// @include        *.youtube.com/watch*
// ==/UserScript==
location.href = 'javascript:onYouTubePlayerReady = function (playerId) { quality = document.getElementById("movie_player").getAvailableQualityLevels()[0];function a() {if (document.getElementById("movie_player").getPlaybackQuality() != quality) {document.getElementById("movie_player").setPlaybackQuality(quality)} setTimeout(a, 100)} a()}';
