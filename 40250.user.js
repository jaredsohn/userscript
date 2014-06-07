// ==UserScript==
// @author	Slider2k
// @name	KISS YouTube Downloader
// @description	Lightweight, simple script (FF/Opera compatible. Does not require Flash plug-in.) that adds direct-download links to videos in all supplied by YouTube formats.
// @include	http://*.youtube.com/watch?*
// @include	http://youtube.com/watch?*
// @license	BSD
// @version	1.06
// ==/UserScript==

(function () {

if(typeof(yt) != "undefined")
	var video_config = yt.config_;
else
	var video_config = unsafeWindow.yt.config_;

if(video_config['SWF_ARGS']){
	var video_args = video_config['SWF_ARGS'];
	var video_is_hd = video_config['IS_HD_AVAILABLE'];
	var video_is_wide = video_config['IS_WIDESCREEN'];
}else{
	var arg_pairs = document.getElementById('movie_player').getAttribute("flashvars").split("&");
	var video_args = new Array();
	for (i in arg_pairs){
		key_value = arg_pairs[i].split("=");
		video_args[key_value[0]] = unescape(key_value[1]);
	}
}
if((fmt_slashes = unescape(video_args['fmt_map']).split(",")) || (fmt_slashes = unescape(video_args['fmt_list']).split(","))){
	var fmt_map = new Array();
	for (i in fmt_slashes){
		index = fmt_slashes[i].indexOf("/");
		fmt_map[fmt_slashes[i].substring(0, index)] = true;
		}
	}

var video_id = video_args['video_id'];
var video_hash = video_args['t'];

var video_formats = new Array();
video_formats[13] = {'key' : '1', 'vformat' : '3GP', 'wxh' : '176x144', 'wxh_w' : '176x144', 'vcodec' : 'H263/SAMR', 'audio' : 'mono 8KHz'};
video_formats[17] = {'key' : '2', 'vformat' : '3GP', 'wxh' : '176x144', 'wxh_w' : '176x144', 'vcodec' : 'MPEG4/AAC', 'audio' : 'mono 44KHz'};
video_formats[36] = {'key' : '3', 'vformat' : '3GP', 'wxh' : '320x240', 'wxh_w' : '320x240', 'vcodec' : 'MPEG4/AAC', 'audio' : 'mono 44KHz'};
video_formats[0] = {'key' : '4', 'vformat' : 'FLV', 'wxh' : '320x240', 'wxh_w' : '400x226', 'vcodec' : 'FLV/MP3', 'audio' : 'stereo 22KHz'};
if (fmt_map[34]) video_formats[34] = {'key' : '5', 'vformat' : 'FLV', 'wxh' : '320x240', 'wxh_w' : '640x360', 'vcodec' : 'H264/AAC', 'audio' : 'stereo 44khz'};
if (fmt_map[35]) video_formats[35] = {'key' : '6', 'vformat' : 'FLV', 'wxh' : '640x480', 'wxh_w' : '854x480', 'vcodec' : 'H264/AAC', 'audio' : 'stereo 44khz'};
video_formats[18] = {'key' : '7', 'vformat' : 'MP4', 'wxh' : '480x360', 'wxh_w' : '480x270', 'vcodec' : 'H264/AAC', 'audio' : 'stereo 44khz'};
if (fmt_map[22]) video_formats[22] = {'key' : '8', 'vformat' : 'MP4', 'wxh' : '1280x720', 'wxh_w' : '1280x720', 'vcodec' : 'H264/AAC', 'audio' : 'stereo 44khz'};
if (fmt_map[37]) video_formats[37] = {'key' : '9', 'vformat' : 'MP4', 'wxh' : '1920x1080', 'wxh_w' : '1920x1080', 'vcodec' : 'H264/AAC', 'audio' : 'stereo 44khz'};
for(i in fmt_map){
	if(video_formats[i] || i == 5) continue;
	video_formats[i] = {'key' : '0', 'vformat' : i, 'wxh' : '', 'wxh_w' : '', 'vcodec' : 'NEW', 'audio' : ''};
}

	
var dl_path ='http://'+ document.location.host +'/get_video?video_id=' + video_id + '&t=' + video_hash; 

if(!(div_embed = document.getElementById('watch-url-embed-wrapper'))){
	if(div_embed = document.getElementById('vd'))
		var feather = true;
	}
if (div_embed){      
	var div_download = document.createElement('div');
	div_download.id = 'download-video';
	div_download.style.listStyleType = 'none';
	div_download.style.textAlign = 'center';
	div_download.style.borderTop = '1px solid #ccc';
	div_download.style.padding = '5px 0 7px 0';
	div_download.style.margin = '4px 5px 0 5px';
	if(feather){
		div_download.style.padding = '3px 0 0 0';
		div_download.style.marginTop = '9px';
	}
	div_download.innerHTML = '<style type="text/css">.vcodec {font-size: 75%; background-color: #cccccc} .wxh {font-size: 125%; font-weight: bold} #download-list {list-style-type: none; margin: 0; padding: 0} .download-video-link {text-decoration: none} .download-video-link:hover {text-decoration: underline} .audio {font-size: 75%; font-style: italic} .download-video-link:before{content: attr(accesskey)" "; font-size: 75%; color: gray}</style>';
	div_download.innerHTML += '<a id="download-as" href="#download-video" title="Download as:"></a><span style="font-size: smaller">Download as:</span>';
	div_download.innerHTML += '<ul id="download-list">';

	var vwxh = video_is_wide ? 'wxh_w' : 'wxh';
	for (v_fmt in video_formats){
		vlink_text = '<span class="vformat">' + video_formats[v_fmt]['vformat'] + '</span>: <span class="wxh">' + video_formats[v_fmt][vwxh] + '</span> <span class="vcodec">' + video_formats[v_fmt]['vcodec'] + '</span> <span class="audio">' + video_formats[v_fmt]['audio'] + '</span>';
		div_download.innerHTML += '<li><a id="fmt'+ v_fmt +'"name="shortcuts" class="download-video-link" href="' + dl_path + (v_fmt==0 ? '' : '&fmt=' + v_fmt) + '" title="' + vlink_text.replace(/<[^>]*>/gi,'') + '">' + vlink_text + '</a></li>';
		}
	div_download.innerHTML += '</ul>';
	div_embed.appendChild(div_download);

	var download_links = document.getElementsByName('shortcuts');
	for(i = 0; i < download_links.length; i++)
		download_links[i].accessKey = video_formats[download_links[i].id.substring(3)]['key'];
	document.getElementById('download-as').accessKey = 'D';
	}
})();