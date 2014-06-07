// ==UserScript==
// @name Spotify AdSkip
// @description Skips ads on the Spotify web player.
// @namespace https://userscripts.org/scripts/show/420085
// @updateURL https://userscripts.org/scripts/source/420085.meta.js
// @downloadURL https://userscripts.org/scripts/source/420085.user.js
// @license Creative Commons
// @grant none
// @version 2014.03.20
// @author TheSuperZapper
// @match *://play.spotify.com/*
// ==/UserScript==

function when_external_loaded() {
	try {
		var SpotifyFlashplayerParams = document.querySelector("param[name*='flashvars']").value;
		var SpotifyFlashplayer_instanceId = SpotifyFlashplayerParams.match(/instanceId=([^&]*)/)[1];
		var _core = Spotify.Instances.get(SpotifyFlashplayer_instanceId);
		console.log("Attempting to bind Spotify AdSkip onto player.");
		_core.audioManager.bind("PLAYING", function (e) {
			var Player = _core.audioManager.getActivePlayer();
			if (Player.isAd) {
				console.log("Attempting to skip an ad.");
				Player.seek(Player.getDuration());
			}
		})
	} catch (e) {
		setTimeout(arguments.callee, 100);
	}
}
when_external_loaded();