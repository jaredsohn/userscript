// ==UserScript==
// @name       YouTube Elegant Downloader
// @namespace  http://rix.li/
// @version    0.1
// @description  Add download buttons for different resolutions in video discription.
// @match      *://*.youtube.com/watch?*
// @copyright  2013+, RixTox
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

GM_addStyle(".download_links {   padding: 15px;  border: 1px solid #e6e6e6;  border-top-width: 0;  border-bottom-width: 0;  border-color: rgba(0,0,0,.098); }.download_links li { margin: 5px; line-height: 40px; display: inline;}.download_links li a {  width: 110px; text-align: center; color: #fefefe;  -moz-box-shadow: 0 1px 0 rgba(0,0,0,0.15);  -ms-box-shadow: 0 1px 0 rgba(0,0,0,0.15);  -webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.15);  box-shadow: 0 1px 0 rgba(0,0,0,0.15);  background-image: -moz-linear-gradient(bottom, #1a82c7 0, #229fe6 100%);  background-image: -ms-linear-gradient(bottom, #1a82c7 0, #229fe6 100%);  background-image: -o-linear-gradient(bottom, #1a82c7 0, #229fe6 100%);  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #1a82c7), color-stop(100%, #229fe6));  background-image: -webkit-linear-gradient(bottom, #1a82c7 0, #229fe6 100%);  background-image: linear-gradient(to top, #1a82c7 0, #229fe6 100%);}");

video_id = document.URL.match(/[&\?]v=([^&]+)/)[1];

video_urls = {};

dirpy_callback = function(err, data) {
  var fmt, vidurl, _ref;
  _ref = data['vidsrc-urls'];
  for (fmt in _ref) {
    vidurl = _ref[fmt];
    video_urls[fmt] = "http://" + data['handler-hostname'] + "/p/dlvid/?vid=" + data.metadata.videoid + "&prov=" + data.metadata.provider + "&fmt=" + fmt + "&request-ipaddr=" + (escape(data.requestipaddr)) + "&redirect-domain=dirpy.com&vidurl=" + (escape(vidurl)) + "&fname=" + (escape(data.metadata.title));
  }
  add_download_links();
};

add_download_links = function() {
  fmt_map = {
    '5': {
      title: 'Low - 240p',
      format: '.flv'
    },
    '17': {
      title: 'Mobile - 144p',
      format: '.3gp'
    },
    '18': {
      title: 'High - 360p',
      format: '.mp4'
    },
    '22': {
      title: 'HD - 720p',
      format: '.mp4'
    },
    '34': {
      title: 'High - 360p',
      format: '.flv'
    },
    '35': {
      title: 'High - 480p',
      format: '.flv'
    },
    '37': {
      title: 'HD - 1080p',
      format: '.mp4'
    },
    '38': {
      title: 'HD - Original',
      format: '.mp4'
    }
  };
  var $, a, ctn, fmt, li, span, ul, url;
  $ = jQuery;
  ctn = document.createElement('div');
  $(ctn).addClass('clearfix download_links').hide();
  ul = document.createElement('ul');
  for (fmt in fmt_map) {
    if (video_urls[fmt]) {
      var url = video_urls[fmt];
      li = document.createElement('li');
      a = document.createElement('a');
      $(a).addClass('yt-uix-button');
      a.href = url;
      a.innerText = fmt_map[fmt].title;
      span = document.createElement('span');
      span.innerText = fmt_map[fmt].format;
      a.appendChild(span);
      li.appendChild(a);
      $(ul).prepend(li);
    }
  }
  ctn.appendChild(ul);
  $('#watch7-user-header').after(ctn);
  $(ctn).slideDown('ease-out');
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://dirpy.com/p/vidinfo/" + video_id + "?provider=youtube&callback=dirpy_callback"
script.async = 'async';
document.body.appendChild(script);