// ==UserScript==
// @name        YT720HD
// @namespace   UbuJedrzej
// @include     https://www.youtube.com/watch?*
// @include     https://youtube.com/watch?*
// @include     http://www.youtube.com/watch?*
// @include     http://youtube.com/watch?*
// @version     2.3
// ==/UserScript==
// https://developers.google.com/youtube/js_api_reference#Playback_status
var yt720hdmainfunc = function() {
   var __timerID = null;
   function yt720hd()
   {
      var player = document.getElementById("movie_player") || document.getElementById("video_player");
      if((typeof player.getPlayerState()) !== 'undefined') {
		 document.getElementById('watch-video').className += 'medium';
		 document.getElementById('watch-video-container').style.backgroundColor = '#444444';
		 document.getElementById('watch-video-container').style.MozLinearGradient = 'center top , #555555, #333333';
         player.setPlaybackQuality("hd720");
         clearInterval(__timerID);
      }
   }
   __timerID = setInterval(yt720hd, 100);
};
var script = document.createElement('script');
script.textContent = '('+yt720hdmainfunc.toString()+')()';
document.body.appendChild(script);
