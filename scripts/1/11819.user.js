// ==UserScript==
// @name          YouTube Video Downloader
// @namespace     Ryan Zimmerman - http://userscripts.org/users/33345
// @description   Allows you to download videos from YouTube.com
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// YouTube URL: http://www.youtube.com/watch?v=[video_id]
// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]

var download_url = 'http://youtube.com/get_video?video_id=';

  GM_xmlhttpRequest({

  method: 'GET',
  url: window.location.href,
  headers: {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
    'Accept': 'text/xml',
  },
  onload: function(responseTextDetails) {
  	///check content
	   var responseHTML = responseTextDetails.responseText;
	StartPos = responseHTML.indexOf("watch_fullscreen?video_id=");
	EndPos = responseHTML.indexOf("\"",StartPos);
	Content = responseHTML.substring(StartPos,EndPos);
	var t_id = Content.match(/t=([^(\&|$)]*)/)[1];

var url_vars = window.location.href.split("?")[1];
var video_id = url_vars.match(/v=([^(\&|$)]*)/)[1];
var video_url = download_url + video_id + '&t=' + t_id;

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #FF0000; color: #FFFFFF;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">"Save As" to download Flash video</a>' +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

document.body.style.margin = '0px';
  }})d