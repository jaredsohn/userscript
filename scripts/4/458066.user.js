// ==UserScript==
// @name        WebM Embedder For Beyond Entertainment
// @namespace   Ripped By Ov Thy Demise
// @description A userscript that will auto embed webm files on Beyond Entertainment

// @include     http://teambeyond.net/*
// @version     4
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
    video.loop = true;
    video.muted = true;
    video.width = '720';
    video.controls= "true";
    
    videos[i].parentNode.replaceChild(video, videos[i]);
  }
}