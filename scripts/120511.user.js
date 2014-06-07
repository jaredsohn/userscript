// ==UserScript==
// @name        YoutubeFullscreen
// @namespace   http://www.userscripts.org
// @description Redirect to autoplaying fullscreen videos
// @version     0.1
// @date        2011-12-14
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js

// @include    http*://www.youtube.com/watch?v=*
// @include    http*://*youtube.com/watch?v=*
// @exclude    http*://www.youtube.com/v/*
// @exclude    http*://*youtube.com/v/*
// ==/UserScript==

var video_id = location.href.match(/[\?&]+v=([a-zA-Z0-9_-]{11,})/);
if (video_id) {
  location.replace("http://www.youtube.com/v/" + video_id[1] + "?autoplay=1");
}
