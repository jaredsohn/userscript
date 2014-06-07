// ==UserScript==
// @name         Youtube Auto Resolution Selection
// @version      1.4
// @namespace    http://userscripts.org/users/zackton
// @description  Auto selects the resolution (1080p default) for video quality
// @include      *.youtube.com/*
// @include      *.youtube.com/
// @updateURL    http://userscripts.org/scripts/source/167633.meta.js
// @grant        none
// ==/UserScript==

// Content inject so Chrome can access HTML5 player
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function(){

var YP = new Object();

// Quality options from Youtube API
YP.quality_options = ['highres', 'hd1080', 'hd720', 'large', 'medium', 'small', 'default'];

 // Playback quality (delete the qualities you don't want. e.g. if you want 720p max, delete the highres and hd1080 lines)
 YP.quality = 'default';
 YP.quality = 'small';
 YP.quality = 'medium';
 YP.quality = 'large';
 YP.quality = 'hd720';
 YP.quality = 'hd1080';
 YP.quality = 'highres';


// Number of times to check for player before giving up
YP.max_attempts = 20;

// Initialize player, and make sure API is ready
YP.init = function() {
			if (document.getElementById('movie_player')) {
			// Normal video player
			this.player = document.getElementById('movie_player');
		}
		else if (document.getElementById('movie_player-flash')) {
			// Channel video player
			this.player = document.getElementById('movie_player-flash');
		}
		else {
			return false;
		}
	
		// Check for HTML5 player
		this.html5 = this.player.getElementsByTagName('video').length ? true : false;

		// Make sure player API is ready
		if (typeof this.player.pauseVideo === 'undefined') {
			return false;
		}
	
		// Pause to avoid flicker caused be loading a different quality
		this.player.pauseVideo();
	
		// In Chrome Flash player, player.setQualityLevel() doesn't seem to work unless video has started playing (or is paused)
		// In Firefox HTML5 player, player.getPlayerState() returns -1 even if player is paused
		if (!this.html5 && this.player.getPlayerState() < 1) {
			return false;
		}
	
		// Everything is good to go
		return true;
	};
	
	// Set video quality to YP.quality or highest available
	YP.setQuality = function() {
		// Get available quality levels
		var levels = this.player.getAvailableQualityLevels();
		// Set playback quality
		if (levels.indexOf(this.quality) >= 0) {
			this.player.setPlaybackQuality(this.quality);
		}
		else {
			this.player.setPlaybackQuality(levels[0]);
		}
		// Play video
		this.player.playVideo();
	}
	
	// Start execution
	YP.start = function(attempts) {
		// Initialize self (look for player)
		if (this.init()) {
			this.setQuality();
			return true;
		}
		// Give up (page has no player)
		if (attempts > this.max_attempts) {
			return false;
		}
		// Try again until initialize sucessful (maybe page still loading)
		setTimeout(function() {
			YP.start(++attempts);
		}, 200);
	}
	
	// Main
	YP.start(0);
	
});