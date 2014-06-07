// ==UserScript==
// @name                Uploaded By Playlist on YouTube by Mortimer Grim
// @version             1.0
// @description		Links to Uploaded by playlist on YouTube
// @include        http://*.youtube.com/watch?v=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var url = window.location.href;

var video_id = window.location.search.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

var button = $('<button href="http://www.youtube.com/watch?v='+ video_id + "&list=UL" + '" target="_blank" class="yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute(&#39;href&#39;);return false;"> Uploaded By</button>');

	if (url.indexOf('youtube') != -1) {
		$('#watch-headline-user-info').append(button);
		$(button).click(function(){
			$(this).href('link');
			prepare();
		});
	}