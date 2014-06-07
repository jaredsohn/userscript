// ==UserScript==
// @name        Embedder Thingy
// @namespace   http://userscripts.org/users/637069
// @description Embedder Thingy
// @include     http://www.neogaf.com/*
// @version     2
// @grant       none
// ==/UserScript==
'use strict';

var videos = document.querySelectorAll('.post a'),
  link, video;

for (var i = 0; i < videos.length; i++) {
  link = videos[i].href;
  if (link.indexOf('.webm') === link.length - 5 || link.indexOf('.mp4') === link.length - 4) {
    video = document.createElement('video');
    video.src = link;
    video.autoplay = false;
    video.loop = false;
    video.muted = true;
    video.width = '720';
    video.controls= "true";
    videos[i].parentNode.replaceChild(video, videos[i]);
  }
}