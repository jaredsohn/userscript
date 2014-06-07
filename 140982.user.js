// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            GameTrailers HTML5 Player
// @namespace       http://userscripts.org/users/masonwan
// @description     Replace GameTrailers flash player with HTML5 player. And automatically scroll to the video.
// @match           http://www.gametrailers.com/*
// @run-at          document-end
// @updateURL       https://github.com/masonwan/JavaScriptCollection/raw/master/GameTrailers%20HTML%20Player/GameTrailersHTML5Player.user.js
// @version         1.0
// ==/UserScript==

(function () {
	// Scroll to the video.
	var box = document.querySelector('.video_information-player');

	if (box != null) {
		box.scrollIntoView();
	}

	// Replace the player.
	var element = document.querySelector('.download_button');

	if (element == null) {
		return;
	}

	var videoId = element.dataset.video;
	var token = element.dataset.token;

	var request = new window.XMLHttpRequest();
	request.open('GET', 'http://www.gametrailers.com/feeds/video_download/' + videoId + '/' + token + '');
	request.onreadystatechange = onReadyStateChanged;
	request.send();

	function onReadyStateChanged() {
		if (request.readyState === 4) {
			var url = JSON.parse(request.responseText).url;

			var wraper = document.querySelector('.player_wrap');
			wraper.removeChild(wraper.children[0]);

			var video = document.createElement('video');
			video.autoplay = true;
			video.preload = 'auto';
			video.controls = true;
			video.style.width = video.style.height = '100%';
			video.addEventListener('dblclick', function () {
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
			});

			var source = document.createElement('source');
			source.type = 'video/mp4';
			source.src = url;
			video.appendChild(source);
			wraper.appendChild(video);
		}
	}
}).call();