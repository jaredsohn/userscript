// ==UserScript==
// @name        WebM Embedder (Non-Auto Play Edition) for NeoGAF
// @namespace   http://userscripts.org/users/637069
// @description Andrex's WebM embedding code in Greasemonkey, with one minor tweak: auto play is off, so you'll have to click to play. Much less taxing on yer CPU. Now with .mp4 support, thanks to zhorkat. Still no support, since I don't know anything about JavaScript.
// @include     http://www.neogaf.com/*
// @include     http://www.tigerdroppings.com/*
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