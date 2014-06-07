// ==UserScript==
// @name           Download YouTube Videos as MP4
// @description    Adds an option to download YouTube videos.
// @namespace      http://googlesystem.blogspot.com
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        0.95
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
    var args=null;
    try{
      args = unsafeWindow.yt.getConfig('SWF_ARGS');
    }
    catch(e){}
    if (args) {
      video_id = args['video_id'];
      video_hash = args['t'];  
    }
  }
  
  if (video_id==null || video_hash==null) return;
 
   var div_embed = document.getElementById('watch-embed-div');
   if (div_embed) {
     var div_download = document.createElement('div');
     var div_download_code = '<br /> <span id=\'download-youtube-video\'> <a href=\''+'http://www.youtube.com/get_video?fmt=18&amp;video_id='+video_id+'&amp;t='+video_hash+'\' onclick=\'blur(this);\'>Download as MP4</a>';     
     try{
       if (unsafeWindow.yt.getConfig('IS_HD_AVAILABLE')) 
          div_download_code = div_download_code + ' <br /> <a href=\''+'http://www.youtube.com/get_video?fmt=22&amp;video_id='+video_id+'&amp;t='+video_hash+'\' onclick=\'blur(this);\'>Download as MP4 720p</a>';
       if (unsafeWindow.yt.getConfig('IS_HD_AVAILABLE')) 
          div_download_code = div_download_code + ' <br /> <a href=\''+'http://www.youtube.com/get_video?fmt=37&amp;video_id='+video_id+'&amp;t='+video_hash+'\' onclick=\'blur(this);\'>Download as MP4 1080p</a>';
     }
     catch(e){}      
     div_download.innerHTML = div_download_code + '</span>';
     div_embed.appendChild(div_download);
  }
  
})();