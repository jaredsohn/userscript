// ==UserScript==
// @name        YouTube Auto-Repeat
// @namespace   Livven
// @description Adds a simple Loop button to auto-repeat YouTube videos. Modified from http://userscripts.org/scripts/show/104084
// @match		*://*.youtube.com/watch?*
// @version     1.1
// ==/UserScript==

var player;
var looping = false;
var tryDelay = 1000; // 1 second
var tryCount = 0;
var maxTryCount = 20;

var buttonContainer = document.getElementById('watch7-sentiment-actions');
// If that doesn't exist, we're not on a video page
// ... that, or YouTube has been redesigned
if (!buttonContainer) {
	return;
}

// Create and insert the button
var button = document.createElement('button');
button.disabled = true;
button.type = 'button';
button.setAttribute('role', 'button');
setButtonState();
button.addEventListener('click', function () {
	looping = !looping;
	setButtonState();
});	
button.appendChild(document.createTextNode('Loop'));
buttonContainer.appendChild(button);

// Delay this since it can take a while for the video player to load
setTimeout(tryInitialize, tryDelay);

function tryInitialize() {
	player = document.getElementById('movie_player');
	// Check if the player has fully loaded
	if (!player || !player.pauseVideo) {
		// If not, try again (up to a limit)
		if (++tryCount < maxTryCount) {
			setTimeout(arguments.callee, tryDelay);
		}
		return;
	}

	// The player has fully loaded; enable the button
	button.disabled = false;
	// Whenever the video ends and if looping is enabled, restart the video
	player.addEventListener('onStateChange', function (state) {
		if (state == '0' && looping) {
			player.playVideo();
		}
	});
}

function setButtonState() {
	var tooltipText;
	if (looping) {
		button.className = 'yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-active';
		tooltipText = 'Disable auto-repeat';
	}
	else {
		button.className = 'yt-uix-button yt-uix-button-default yt-uix-tooltip';
		tooltipText = 'Enable auto-repeat';
	}
	button.setAttribute('title', tooltipText);
	button.setAttribute('data-tooltip-text', tooltipText);
}