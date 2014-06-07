// ========================== DO NOT EDIT! ============================
//
// ==UserScript==
// @name        Fullscreen Quicktime for YouTube
// @version	v1.0
// @author      Andrew Faden
// @description Fullscreen Quicktime for YouTube is a script that adds links to open a YouTube video in Quicktime in fullscreen mode
// @include     http://*.youtube.com*
// ==/UserScript==
//
// ======================= END OF DO NOT EDIT! ========================

var download = document.createElement('div');
var video = document.getElementById('watch-embed-div');

var qtlURL = '"http://qtlmaker.appspot.com/make.qtl?target='+escape("http://208.65.153.238/get_video?&fmt=18"+"&video_id="+swfArgs["video_id"]+"&t="+swfArgs["t"]) + '"';
var qtlURLHQ = '"http://qtlmaker.appspot.com/make.qtl?target='+escape("http://208.65.153.238/get_video?&fmt=22"+"&video_id="+swfArgs["video_id"]+"&t="+swfArgs["t"]) + '"';
var qtlURLFS = '"http://qtlmaker.appspot.com/make.qtl?fullscreen=true&target='+escape("http://208.65.153.238/get_video?&fmt=18"+"&video_id="+swfArgs["video_id"]+"&t="+swfArgs["t"]) + '"';
var qtlURLHQFS = '"http://qtlmaker.appspot.com/make.qtl?fullscreen=true&target='+escape("http://208.65.153.238/get_video?&fmt=22"+"&video_id="+swfArgs["video_id"]+"&t="+swfArgs["t"]) + '"';

download.innerHTML = '<center><div style="background:#FFFFCC none repeat scroll 0 0; border:1px solid #FFCC33; margin:5px 0; padding:5px; font-size:1.5em;"><b>Open in Quicktime</b><br/>Normal: <a href='+qtlURL+'>SD</a> | <a href='+qtlURLHQ+'>HD</a><br/>Full Screen: <a href='+qtlURLFS+'>SD</a> | <a href='+qtlURLHQFS+'>HD</a></div></center>';video.appendChild(download);

with(document.getElementById('movie_player'))
{
	setAttribute("flashvars","autoplay=0&"+getAttribute("flashvars"));
	src+="#";
}