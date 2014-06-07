// ==UserScript==
// @name       	Free deezer
// @version    	3.0
// @description	enter something useful
// @include     htt*://*.deezer.com/*
// @grant		none
// @match		http://*.deezer.com/*
// @match		https://*.deezer.com/*
// @copyright	2012+, Airmanbzh
// ==/UserScript==
function unlimitedDeezer() {
    dzPlayer.setForbiddenListen(false);
    dzPlayer.user_status.web_streaming_duration=180000;
    dzPlayer.getPlayerType = function(){return false;};
}
unlimitedDeezer();
setInterval(unlimitedDeezer, 15000);