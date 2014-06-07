// ==UserScript==
// @name           youtube hd resize
// @namespace      yasingedik
// @include        *.youtube.com/watch*
// @downloadURL	   https://userscripts.org/scripts/source/293144.user.js
// @updateURL	   https://userscripts.org/scripts/source/293144.meta.js
// @version        1.0
// ==/UserScript==

unsafeWindow.onYouTubePlayerReady = function (playerId) {
  location.href = 'javascript:void((function () { document.getElementById("movie_player").setPlaybackQuality("hd720"); })())'
}

var player_api = document.getElementById("player-api");
var watch_container = document.getElementById("watch7-container");

player_api.style.width =  "854px";
player_api.style.height = "509px";

if (watch_container.className.indexOf("watch-wide") == -1)
  watch_container.className += " " + "watch-wide";
 
if (watch_container.className.indexOf("watch-medium") == -1)
  watch_container.className += " " + "watch-medium";
