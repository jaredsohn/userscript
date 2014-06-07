// ==UserScript==
// @name YouTube Download Button
// @description This scripts adds a button for downloading YouTube videos and allows all videos to play without Flash.
// @namespace http://googlesystem.blogspot.com
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @version 1.0.3
// ==/UserScript==
(function () {
	function get_vid_file_urls(videoPlayer) {
		var videoId, videoTicket, videoFormats;
		if (videoPlayer && videoPlayer.getAttribute('class').
				indexOf('html5') == -1) {
			var flashValues = videoPlayer.innerHTML;
			var videoIdMatches = flashValues.
				match(/(?:"|\&amp;)video_id=([^(\&|$)]+)/);
			videoId = (videoIdMatches) ? videoIdMatches[1] : null;
			var videoTicketMatches = flashValues.
				match(/(?:"|\&amp;)t=([^(\&|$)]+)/);
			videoTicket = (videoTicketMatches) ?
				videoTicketMatches[1] : null;
			var videoFormatsMatches = flashValues.
				match(/(?:"|\&amp;)url_encoded_fmt_stream_map=([^(\&|$)]+)/);
			videoFormats = (videoFormatsMatches) ?
				videoFormatsMatches[1] : null;
		}
		if (videoId == null || videoTicket == null) {
			var config = null;
			if (typeof (unsafeWindow) == 'undefined') {
				unsafeWindow = window;
			}
			if (unsafeWindow.yt && unsafeWindow.yt.getConfig) {
				config = unsafeWindow.yt.getConfig('PLAYER_CONFIG');
			}
			if (config && config.args) {
				var args = config.args;
				videoId = args['video_id'];
				videoTicket = args['t'];
				videoFormats = args['url_encoded_fmt_stream_map'];
			}
		}
		if (videoId == null || videoTicket == null) {
			var bodyContent = document.body.innerHTML;
			var videoIdMatches = bodyContent.match
				(/\"video_id\":\s*\"([^\"]+)\"/);
			videoId = (videoIdMatches)
				? videoIdMatches[1] : null;
			var videoTicketMatches = bodyContent.
				match(/\"t\":\s*\"([^\"]+)\"/);
			videoTicket = (videoTicketMatches) ?
				videoTicketMatches[1] : null;
			var videoFormatsMatches = bodyContent.
				match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
			videoFormats = (videoFormatsMatches) ?
				videoFormatsMatches[1] : null;
		}
		if (videoId == null || videoTicket == null
			|| videoFormats == null || videoId.length == 0
			|| videoTicket.length == 0 || videoFormats.length == 0)
			return null;
		function parse_formats(fmts) {
			var sep1 = '%2C',
				sep2 = '%26',
				sep3 = '%3D';
			if (fmts.indexOf(',') > -1) {
				sep1 = ',';
				sep2 = (fmts.indexOf('&') > -1) ? '&' : '\\u0026';
				sep3 = '=';
			}
			var videoURL = new Array();
			var videoFormatsGroup = fmts.split(sep1);
			for (var i = 0; i < videoFormatsGroup.length; i++) {
				var videoFormatsElem = videoFormatsGroup[i].split(sep2);
				if (videoFormatsElem.length < 5) continue;
				var partialResult1 = videoFormatsElem[0].split(sep3);
				if (partialResult1.length < 2) continue;
				var url = partialResult1[1];
				url = unescape(unescape(url)).replace(/\\\//g, '/').
					replace(/\\u0026/g, '&');
				var partialResult2 = videoFormatsElem[4].split(sep3);
				if (partialResult2.length < 2) continue;
				var itag = partialResult2[1];
				if (url.toLowerCase().indexOf('http') == 0) {
					videoURL[itag] = url;
				}
			}
			return videoURL;
		}
		return parse_formats(videoFormats);
	}

	function make_menu_btn(label, urls, labels) {
		function downloadVideo(e) {
			var e = e || window.event;
			var elem = e.target || e.srcElement;
			e.returnValue = false;
			if (e.preventDefault) {
				e.preventDefault();
			}
			document.location.href = elem.getAttribute('url');
		}
		var mainSpan = document.createElement('span');
		var spanButton = document.createElement('span');
		spanButton.setAttribute('class', 'yt-uix-button-content');
		spanButton.appendChild(document.createTextNode(label));
		mainSpan.appendChild(spanButton);
		var imgButton = document.createElement('img');
		imgButton.setAttribute('class', 'yt-uix-button-arrow');
		imgButton.setAttribute('src', '//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
		mainSpan.appendChild(imgButton);
		var listItems = document.createElement('ol');
		listItems.setAttribute('style', 'display:none;');
		listItems.setAttribute('class', 'yt-uix-button-menu');
		for (var i = 0; i < urls.length; i++) {
			var listItem = document.createElement('li');
			var listLink = document.createElement('a');
			listLink.setAttribute('style', 'text-decoration:none;');
			listLink.setAttribute('href', urls[i]);
			var listSpan = document.createElement('span');
			listSpan.setAttribute('class', 'yt-uix-button-menu-item');
			listSpan.setAttribute('url', urls[i]);
			listSpan.addEventListener(
				'click', function() {
				},
				false
			);
			listSpan.appendChild(document.
				createTextNode(labels[i]));
			listLink.appendChild(listSpan);
			listItem.appendChild(listLink);
			listItems.appendChild(listItem);
		}
		mainSpan.appendChild(listItems);
		var buttonElement = document.createElement('button');
		buttonElement.setAttribute('id', 'download-youtube-video-button');
		buttonElement.setAttribute('class', 'yt-uix-button yt-uix-button-default '+
			'yt-uix-tooltip yt-uix-tooltip-reverse');
		buttonElement.setAttribute('data-tooltip-text', 'Download this video');
		buttonElement.setAttribute('onclick', 'return false;');
		buttonElement.setAttribute('type', 'button');
		buttonElement.appendChild(mainSpan);
		return buttonElement;
	}
	
	function add_action_button(b) {
		var parent = document.getElementById('watch-actions') ||
			document.getElementById('watch7-action-buttons');
		if (!parent) return;
		var s = document.createElement('span');
		s.appendChild(document.createTextNode(' '));
		s.appendChild(b);
		parent.appendChild(s);
	}

	function get_format_name(f) {
		var a = {
			'5': 'FLV 240p',
			'18': 'MP4 360p',
			'22': 'MP4 720p (HD)',
			'34': 'FLV 360p',
			'35': 'FLV 480p',
			'37': 'MP4 1080p (HD)',
			'38': 'MP4 4K (HD)',
			'43': 'WebM 360p',
			'44': 'WebM 480p',
			'45': 'WebM 720p (HD)',
			'46': 'WebM 1080p (HD)'
		};
		if (a[f]) return a[f];
		return 'Format '+f;
	}

	function make_video_player(url, w, h) {
		var v = document.createElement('video');
		v.setAttribute('controls', 'controls');
		v.setAttribute('autoplay', 'autoplay');
		v.width = w;
		v.height = h;
		v.style.background = 'black';
		v.src = url;
		return v;
	}

	(function() {
		var player = document.getElementById('watch-player');
		if (!player)
			player = document.getElementById('watch7-player');
		if (!player) return;

		var urls = get_vid_file_urls(player);
		if (!urls) return;

		var btn_urls = [], btn_labels = [];
		for (i in urls) {
			btn_urls.push(urls[i]);
			btn_labels.push(get_format_name(i));
		}
		
		if (btn_urls.length >= 1) {
			var b = make_menu_btn('Download',
				btn_urls, btn_labels);
			add_action_button(b);
		}

		var order = ['18', '43', '44', '22', '45'];
		var best = null;
		for (var i = 0; i < order.length; i++) {
			if (!urls[order[i]]) continue;
			best = urls[order[i]];
		}
		if (!best) return;
		var w = player.offsetWidth;
		var h = player.offsetHeight;
		setTimeout(function() {
			if (player.innerHTML.match(/<video/)) {
				return;
			}
			var e = document.getElementById('watch-main');
			if (e && e.innerHTML.match(/<video/)) {
				return;
			}
			player.parentNode.replaceChild(
				make_video_player(best, w, h),
				player
			);
		}, 2000);
	})();
})();
