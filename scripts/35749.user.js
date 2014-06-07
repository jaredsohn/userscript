// ==UserScript==
// @name           Download YouTube Videos
// @description    Adds an option to download YouTube videos.
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        0.6b
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
        var video_id_match = flash_values.match(/video_id=([^(\&|$)]*)/);
        if (video_id_match!=null) video_id = video_id_match[1];
        var video_hash_match = flash_values.match(/t=([^(\&|$)]*)/);
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
   var yt_mp4hd_path ='http://www.youtube.com/get_video?fmt=22&amp;video_id='+video_id+'&amp;t='+video_hash;
   var yt_h263_path ='http://www.youtube.com/get_video?fmt=13&amp;video_id='+video_id+'&amp;t='+video_hash;
   var yt_mp4v_path ='http://www.youtube.com/get_video?fmt=17&amp;video_id='+video_id+'&amp;t='+video_hash;
   var yt_flv1_path ='http://www.youtube.com/get_video?fmt=35&amp;video_id='+video_id+'&amp;t='+video_hash;
   var yt_flv_path ='http://www.youtube.com/get_video?amp;video_id='+video_id+'&amp;t='+video_hash;

   var div_embed = document.getElementById('watch-embed-div');
   if (div_embed) {      
     var div_download = document.createElement('div');
     div_download.innerHTML = '<span>'+ ((navigator.userAgent.indexOf('Safari')!=-1)?'(control-click and select <i>Download linked file as</i>)' : ('<b><span style="color: #707070">Download as:</b> (hover over links for more details)<span><br />')) + '</span> <div style="text-align: center !important; margin: 1px 0px 1px 0px !important; font-size: 50%;"><span id=\'download-youtube-video\'> <a title="(H.264, 1280x720/AAC stereo)" href=\''+yt_mp4_path+'\'><b>MP4 HQ</b></span> | <span id=\'download-youtube-video-flv1\'> <a title="(H.264, 480x270/AAC stereo)" href=\''+yt_mp4_path+'\'><b>MP4</b> </a></span> | <span id=\'download-youtube-video-flv2\'> <a title="(XviD, 176x144/AAC mono)" href=\''+yt_mp4v_path+'\'><b>3GP</b> </a></span> | <span id=\'download-youtube-video-flv3\'> <a title="(H.263, 176x144/AMR mono)" href=\''+yt_h263_path+'\'><b>3GP</b> </a></span> | <span id=\'download-youtube-video-flv4\'> <a title="(H.264, 640x360/AAC stereo)" href=\''+yt_flv1_path+'\'><b>FLV HQ</b> </a></span> | <span id=\'download-youtube-video-flv5\'> <a title="(FLV1, 320x180/MP3 mono)" href=\''+yt_flv_path+'\'><b>FLV</b></a></span><br /><i>(Note: Not all formats may be available)</i></div>';
	 
     div_embed.appendChild(div_download);
  }
  
})();