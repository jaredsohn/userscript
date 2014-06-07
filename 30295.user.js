// ==UserScript==
// @name           SeekTube
// @namespace      http://questionmark.blogsome.com
// @description    Enable a seek time anchor (#1h3m20s) ala Google Video in YouTube urls
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// ==/UserScript==*
location.href = "javascript:(" + encodeURI(uneval(function() { window.onYouTubePlayerReady = function(playerId){ matches = String(window.location).match(/#((\d)*h)?((\d)*m)?((\d)*s)?/); seekTime = 0; if(matches){ seekTime += (matches[1] ? matches[1].replace(/h/,"") : 0) * 3600; seekTime += (matches[3] ? matches[3].replace(/m/,"") : 0) * 60; seekTime += (matches[5] ? matches[5].replace(/s/,"") : 0) * 1; document.getElementById("movie_player").seekTo(seekTime,true); } } })) + ")();";
