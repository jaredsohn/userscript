// ==UserScript==
// @name       Disable waiting delay on www.anime-ultime.net
// @namespace  http://www.aoi-dev.com/
// @version    0.2
// @description  Disable waiting delay between each streaming
// @match      http://www.anime-ultime.net/*
// @match      http://anime-ultime.net/*
// @copyright  2012+, AngelNex
// ==/UserScript==

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (" \
\
function authorized_playback() \
{ \
$.post(\"/stream/authorized_playback.php\", { \"item\": jwplayer('player').getPlaylistItem().mediaid }, \
function(data){ \
console.log(\"hooked\"); \
console.log(data.auth); \
console.log(data.wait); \
iduser = data.iduser; \
play_file(); \
}, \"json\"); \
} \
");

document.getElementsByTagName('head')[0].appendChild(script);