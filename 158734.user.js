// ==UserScript==
// @name			HTML5 Widescreen for YouTube
// @description	Forces HTML5 playback by replacuing the YouTube video with an embedded video in an iframe.
// @namespace		http://userscripts.org/users/psychoticmeow
// @include			https://www.youtube.com/watch*
// @include			http://www.youtube.com/watch*
// @version			1.1
// @grant			none
// ==/UserScript==

const EMBED_URL = '//www.youtube.com/embed/';
const RE_TIME_IN_URL = /t=(([0-9]+h)?[0-9]{1,2}m[0-9]{1,2}s)/;
const RE_TIME_IN_COMMAND = /seekTo[(](.*?)[)];/;
const RE_TIME_HUMAN = /^([0-9]+h)?[0-9]{1,2}m[0-9]{1,2}s/;
const RE_TIME_MACHINE = /^[0-9*+]+$/;

var forEach = Array.prototype.forEach;
var id, content, wrapper, seeks, iframe, video;

var createVideo = function(id) {
	// Remove old iframe:
	if (iframe) {
		wrapper.removeChild(iframe);
	}

	// Create new iframe:
	iframe = document.createElement('iframe');
	iframe.setAttribute('width', wrapper.offsetWidth);
	iframe.setAttribute('height', wrapper.offsetHeight);
	iframe.setAttribute('frameborder', 0);
	iframe.setAttribute('allowfullscreen', 'allowfullscreen');
	iframe.setAttribute('src', EMBED_URL + id + '?autoplay=1&modestbranding=1');

	// Insert new video:
	wrapper.appendChild(iframe);
};

var removeVideo = function() {
	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}
};

var waitForYouTube = function(callback) {
	var attempts = 1000,
		attempt, interval;

	// Wait for YouTube to load, or complain about Flash being missing:
	attempt = function() {
		// Cancel after using all attempts::
		if (attempts == 0) {
			clearInterval(interval);
			return false;
		}

		// Find the video element:
		var html5 = document.querySelector('video');

		// Find the flash video element:
		var flash = document.querySelector('embed');

		// Try again:
		if (html5 == null && flash == null) {
			attempts--;
			return false;
		}

		// Prevent it from loading:
		if (html5) {
			html5.src = '';
			html5.load();
		}

		callback();

		if (interval) {
			clearInterval(interval);
		}

		return true;
	};

	// Failed, try again:
	if (attempt() == false) {
		interval = setInterval(attempt, 100);
	}
};

var waitForVideo = function(callback) {
	var attempts = 1000, util = {},
		attempt, interval;

	util.seekTo = function(time) {
		// Convert from 0h0m0s format:
		if (RE_TIME_HUMAN.test(time)) {
			time = time
				.replace('h', '*3600+')
				.replace('m', '*60+')
				.replace('s', '');
		}

		// Only allow math in eval:
		if (RE_TIME_MACHINE.test(time)) {
			video.pause();
			video.currentTime = eval(time);
			video.play();
		}
	};

	// Wait for the video to load:
	attempt = function() {
		// Cancel after using all attempts::
		if (attempts == 0) {
			clearInterval(interval);
			return false;
		}

		// Find the video element:
		video = iframe.contentWindow.document.querySelector('video');

		// Try again:
		if (video == null) {
			attempts--;
			return false;
		}

		callback(util);

		if (interval) {
			clearInterval(interval);
		}

		return true;
	};

	// Failed, try again:
	if (attempt() == false) {
		interval = setInterval(attempt, 100);
	}
};

// Find elements:
id = /v=(.{11})/i.exec(document.location)[1];
content = document.getElementById('watch7-container')
wrapper = document.getElementById('watch7-player');
seeks = document.querySelectorAll('a[onclick ^= "yt.www.watch.player.seekTo"]');

// Make video area wide:
content.setAttribute('class', 'transition-content watch-wide watch-medium');

// Wait for YouTube to load:
waitForYouTube(function() {
	// Remove old video:
	removeVideo();

	// Insert new video:
	createVideo(id);

	// Wait for the video to load:
	waitForVideo(function(util) {
		// Make only the embeded video was added:
		//removeVideo();

		// Seek to time specified in URL:
		if (RE_TIME_IN_URL.test(document.location)) {
			var time = RE_TIME_IN_URL.exec(document.location)[1];

			util.seekTo(time);
		}

		// Listen for 'seek' links:
		forEach.call(seeks, function(seek) {
			var command = seek.getAttribute('onclick');

			// Remove the YouTube command:
			seek.removeAttribute('onclick');

			// Add our own;
			seek.addEventListener('click', function(event) {
				var time = RE_TIME_IN_COMMAND.exec(command)[1];

				util.seekTo(time);

				// Prevent scrolling to top:
				event.preventDefault();
			});
		});
	});
});