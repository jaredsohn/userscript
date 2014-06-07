// ==UserScript==
// @name			Loop YouTube Video
// @description		Adds a Loop button to YouTube that lets you auto-repeat videos.
// @namespace		loop-youtube-video-c
// @match			*://*.youtube.com/watch?v=*
// @version			2.1
// ==/UserScript==

// Make sure we're actually on a video page!
if (!document.getElementById('watch7-sentiment-actions'))
	return;
	
// Add the button to toggle whether we're looping.
var button = document.createElement('span');
button.innerHTML = 
	'<button \
		id="watch-loop" \
		class="yt-uix-button yt-uix-button-text yt-uix-tooltip" \
		type="button" \
		title="Loop this video" \
		data-orientation="vertical" \
		data-position="bottomright" \
		data-button-toggle="true" \
		data-tooltip-text="Loop this video" \
		role="button"> \
			<span class="yt-uix-button-content">Loop </span> \
	</button>';
document.getElementById('watch7-sentiment-actions').appendChild(button);

// Styles for the button. Most of it is taken from YouTube's style for 
// .yt-uix-button-panel:hover #watch-like-dislike-buttons .yt-uix-button-text.yt-uix-button-toggled
GM_addStyle('\
	.yt-uix-button-toggled#watch-loop { \
		color: #932720; \
	} \
	.yt-uix-button-panel:hover .yt-uix-button-toggled#watch-loop { \
		border-color: #c6c6c6; \
		background-color: #e9e9e9; \
		-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .20); \
		-ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .20); \
		-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .20); \
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, .20); \
		filter: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#fff8f8f8, EndColorStr=#ffeeeeee); \
		background-image: -moz-linear-gradient(top, #f8f8f8 0, #eee 100%); \
		background-image: -ms-linear-gradient(top, #f8f8f8 0, #eee 100%); \
		background-image: -o-linear-gradient(top, #f8f8f8 0, #eee 100%); \
		background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f8f8f8), color-stop(100%, #eee)); \
		background-image: -webkit-linear-gradient(top, #f8f8f8 0, #eee 100%); \
		background-image: linear-gradient(to bottom, #f8f8f8 0, #eee 100%); \
	}');

// Injects code into the global scope.
function inject(fn) {
	var script = document.createElement('script');
	script.innerHTML = '(' + fn.toString() + ')();';
	document.body.appendChild(script);
}

// This function listens for the video ending and restarts it if we're looping. Inject
// it into the page. Note that we can't access any variables outside the function here.
inject(function () {

	// Controls whether we're looping.
	var looping = false;
	
	// Listen for the button click.
	document.getElementById('watch-loop').onclick = function () {
		looping = !looping;
		this.setAttribute('data-tooltip-text', looping ? 'Turn off looping' : 'Loop this video');
		return false;
	};
		
	// Returns the player API interface or false if it's not ready.
	function getPlayer() {
		return window.yt.player 
			&& window.yt.player.getPlayerByElement
			&& window.yt.player.getPlayerByElement(document.getElementById('player-api'));
	}
		
	// Listen for the end of the video.
	function attach() {
		var player = getPlayer();
		player.addEventListener('onStateChange', function (state) {
			if (state == '0' && looping)
				player.playVideo();
		});
	}

	// Wait until the YouTube API's ready.
	function wait() {
		setTimeout(getPlayer() ? attach : wait, 100);
	}
	
	wait();
});