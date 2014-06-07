// ==UserScript==
// @name           YouTube Video permanent MP4-Link 
// @description    Creates a permanent link to YouTube videos' MP4 version for use with eg. SecondLife (This version creates a link that is more permanent, but also relies on a third party site).
// @namespace      http://hiconic.de
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        1.0
// ==/UserScript==

(function () {

  if (document.getElementById('youtube-video-mp4-link')) return;

  var video_id = null;
  var video_player = document.getElementById('movie_player');
  
  if (video_player) {
    var flash_variables = video_player.attributes.getNamedItem('flashvars');  
    if (flash_variables) {
      var flash_values = flash_variables.value;
      if (flash_values) {
        var video_id_match = flash_values.match(/video_id=([^(\&|$)]*)/);
        if (video_id_match!=null) video_id = video_id_match[1];
      }
    }
  }
  
  if (video_id==null) {
    var args = unsafeWindow.swfArgs;
    if (args) {
      video_id = args['video_id'];
    }
  }
  
  if (video_id==null) return;
 
	 var yt_mp4_path ='http://www.youtubemp4.com/video/'+video_id+'.mp4'; 
   var div_embed = document.getElementById('watch-embed-div');
   if (div_embed) {      
     var div_download = document.createElement('div');
     div_download.innerHTML = '<br /> <span id=\'youtube-video-mp4-link\'> <a href=\''+yt_mp4_path+'\'>Link to HQ MP4-Version</a> (<i>save as...</i> or copy link)</span>';
     div_embed.appendChild(div_download);
  }
  
})();