// ==UserScript==
// @name        Removing the login / sign up blocker from public Spotify playlists
// @description Automatically hides login invitations to allow scrolling the playlist
// @namespace   http://about.me/akopov
// @author      Yuriy Akopov
// @license     MIT (http://opensource.org/licenses/MIT)
// @version     1.2
// @include     https://play.spotify.com/*
// @include     http://play.spotify.com/*
// ==/UserScript==

function unlockPlaylist() {
	var victims = [
		// 'div#bg-wrap.playNow.fullscreen.loaded',
		// 'div#login-screen',
		// 'div#playNowSignUp',
		'div#overlay.overlay.fullscreen.visible'
	];
	
	victims.map(function(selector) {
		var element = document.querySelector(selector);		
		if (selector) {
			element.parentNode.removeChild(element);
		}
	});
}

window.addEventListener('load', unlockPlaylist, false);
