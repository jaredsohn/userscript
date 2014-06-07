// ==UserScript==
// @name                Youtube to MP3 by alike
// @version             2.4
// @namespace      http://userscripts.org/users/alike03
// @icon      http://imageshack.us/a/img546/5426/hgqq.png
// @description		Converts videos to mp3 via youtube-mp3.org
// @include        http*youtube.com/watch*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var url = window.location.href;

var video_id = window.location.search.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

var button = $('<a href="http://www.youtubeinmp3.com/download.php?youtubeURL=http://www.youtube.com/watch?v='+ video_id + '&quality=3&submit=Download+MP3" target="_blank" title="Download as MP3" class="yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-tooltip-reverse"><img src="http://imageshack.us/a/img818/2473/ayte.png"><font color="#000000"> MP3</font></a>');


	if (url.indexOf('youtube') != -1) {
		$('#watch7-sentiment-actions').append(button);
		$(button).click(function(){
			$(this).href('link');
			prepare();
		});
	}