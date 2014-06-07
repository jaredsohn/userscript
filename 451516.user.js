// ==UserScript==
// @name        WebM Embedder for NeoGAF
// @namespace   http://userscripts.org/users/637069
// @description Andrex's WebM embedding code, in Greasemonkey flavour. Now with .mp4 support, thanks to zhorkat. Caution: may cause your machine to chug due to CPU usage, and that this script won't be supported because I don't know a thing about JavaScript.
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
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.width = '500';
    
    videos[i].parentNode.replaceChild(video, videos[i]);
  }
}