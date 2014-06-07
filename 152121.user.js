// ==UserScript==
// @name           YouTube MP3 Button
// @namespace      http://www.youtubeinaudio.com
// @description    A MP3 download button to Youtube
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @updateURL	   http://userscripts.org/scripts/source/152121.user.js
// @version        0.5
// ==/UserScript==

var url = window.location.href;

var video_id = window.location.search.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

var button = $('<a href="http://www.youtubeinaudio.com/download.php?youtubeURL=http://www.youtube.com/watch?v='+ video_id + '&quality=320&submit=Download+MP3" target="_blank" class="yt-uix-button yt-uix-button-default"><img height = "17" width = "15" src="http://i1223.photobucket.com/albums/dd515/TheDuceCat/Icons/DownloadArrow.png"> Download MP3</a>');


	if (url.indexOf('youtube') != -1) {
		$('#watch-headline-user-info').append(button);
		$(button).click(function(){
			$(this).href('link');
			prepare();
		});
	}

var url = window.location.href;

var video_id = window.location.search.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

var button = $('<a href="http://www.youtubeinaudio.com/download.php?youtubeURL=http://www.youtube.com/watch?v='+ video_id + '&quality=320&submit=Download+MP3" target="_blank" title="Download as MP3" class="yt-uix-button yt-uix-button-hh-text yt-uix-tooltip"><img height = "17" width = "15" src="http://i1223.photobucket.com/albums/dd515/TheDuceCat/Icons/DownloadArrow.png"> MP3</a>');


	if (url.indexOf('youtube') != -1) {
		$('#watch7-sentiment-actions').append(button);
		$(button).click(function(){
			$(this).href('link');
			prepare();
		});
	}