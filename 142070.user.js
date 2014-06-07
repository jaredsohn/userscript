// ==UserScript==
// @name           Simple YouTube MP3 Downloader
// @namespace      http://www.youtubeinaudio.com
// @description    A download button will be added to YouTube videos that allow you to download the video in MP3-format. No java required!
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @version        1.2.1
// ==/UserScript==

// ==ChangeLog==
// @history        1.2.1  Server update
// @history        1.11 Server edit
// @history        1.00 Initial release.
// ==/ChangeLog==

(function () {
	var YouTubeInAudioURL = 'http://www.youtubeinaudio.com/download.php?quality=320&submit=Download+MP3&youtubeURL=' + location.href, container = document.getElementById('watch-actions');
	
	if (container && !document.getElementById('watch-download')) {
		var btn = document.createElement('button'),
			lastContainerChild = container.lastElementChild;
		
		btn.className = 'master-sprite yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip';
		btn.id = 'watch-download';
		btn.setAttribute('type', 'button');
		btn.setAttribute('title', 'Download This Video');
		btn.setAttribute('data-tooltip', 'Download This Video');
		btn.setAttribute('data-tooltip-title', 'Download This Video');
		
		var txt = document.createElement('span');
		txt.appendChild(document.createTextNode('Download MP3'));
		txt.setAttribute('class', 'yt-uix-button-content');
		
		btn.appendChild(txt);
		
		btn.addEventListener('click', function () {
			window.open(YouTubeInAudioURL, 'downloadWindow');
		}, false);
		
		if (lastContainerChild) {
			btn.className = lastContainerChild.className;
			
			container.insertBefore(btn, lastContainerChild.nextSibling);
			
			lastContainerChild.style.marginRight = '0.5em';
		} else {
			container.appendChild(btn);
		}
		
		if (btn.offsetTop > lastContainerChild.offsetTop) {
			var btnMarginTop = '0.5em', containerStyle = getComputedStyle(container);
			
			btn.style.marginTop = btnMarginTop;
			
			container.style.height = (parseInt(containerStyle.getPropertyValue('height'), 10) +
				parseInt(btnMarginTop, 10) +
				parseInt(btn.offsetTop, 10) -
				parseInt(btn.offsetHeight, 10)).toString() +
				'px';
		}
	}
	
	if (location.search.search('v=') !== -1) {
		YouTubeInAudioURL = 'http://www.youtubeinaudio.com/download.php?quality=320&submit=Download+MP3&youtubeURL=' + 'http://www.youtube.com/watch?v=' + location.search.split('v=')[1].split('&')[0];
	} else {
		window.addEventListener('message', function (event) {
			YouTubeInAudioURL = 'http://www.youtubeinaudio.com/download.php?quality=320&submit=Download+MP3&youtubeURL=' + 'http://www.youtube.com/watch?v=' + event.data;
		}, false);
		
		location.assign('javascript:void(' + function () {
			typeof yt !== 'undefined' && window.postMessage(yt.getConfig('VIDEO_ID'), '*');
		}.toString() + '());');
	}
}());