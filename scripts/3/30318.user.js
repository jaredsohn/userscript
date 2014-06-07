// ==UserScript==
// @name           Download YouTube Videos as FLV, MP4, and MP3
// @description    Adds an option to download YouTube videos in three different formats.
// @namespace      http://jwvmods.com/blog
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        1.0 BETA
// ==/UserScript==

(function () {


  if (document.getElementById('download-youtube-video')) return;

  var video_id = null;
  var video_hash = null;
  var video_player = document.getElementById('movie_player');
  
  if (video_player) {

    var flash_variables = video_player.attributes.getNamedItem('flashvars');  
    if (flash_variables) {
      var flash_values = flash_variables.value;
      if (flash_values) {
        var video_id_match = flash_values.match(/[^a-z]video_id=([^(\&|$)]*)/);
        if (video_id_match!=null) video_id = video_id_match[1];
        var video_hash_match = flash_values.match(/[^a-z]t=([^(\&|$)]*)/);
        if (video_hash_match!=null) video_hash = video_hash_match[1];        
      }
    }

  }
  
  if (video_id==null || video_hash==null) {
    var args = unsafeWindow.swfArgs;
    if (args) {
      video_id = args['video_id'];
      video_hash = args['t'];  
    }
  }
  
  if (video_id==null || video_hash==null) return;
 
   var yt_mp4_path ='http://www.youtube.com/get_video?fmt=18&amp;video_id='+video_id+'&amp;t='+video_hash;
   var yt_flv_path ='http://www.youtube.com/get_video?fmt=6&amp;video_id='+video_id+'&amp;t='+video_hash;
   var yt_hd_path ='http://www.youtube.com/get_video?fmt=22&amp;video_id='+video_id+'&amp;t='+video_hash;
   var div_embed = document.getElementById('watch-embed-div');
   if (div_embed) {      
     var div_download = document.createElement('div');
     div_download.innerHTML = '<br /> <span id=\'download-youtube-video\'> <a href=\''+yt_flv_path+'\' onclick=\'blur(this);\'>Download as FLV</a> <br /> <a href=\''+yt_mp4_path+'\' onclick=\'blur(this);\'>Download as MP4</a> <br /><a href=\''+yt_hd_path+'\' onclick=\'blur(this);\'>Download in High Resolution</a></span><center>';
     div_embed.appendChild(div_download);
  }
  
})();