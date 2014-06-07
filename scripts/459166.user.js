// ==UserScript==
// @name        WebM Coli Traditional
// @namespace   http://www.thecoli.com/
// @description WebM Traditional
// @include     http://www.thecoli.com/*
// @version     1
// @grant       none
// ==/UserScript==



'use strict';

function main()
{

var videos = document.querySelectorAll('a'),
  link, video;

for (var i = 0; i < videos.length; i++)
{
  link = videos[i].href;
  if (link.indexOf('.webm') === link.length - 5 || link.indexOf('.mp4') === link.length - 4)
  {
  video = document.createElement('video');
  video.src = link;
  video.autoplay = false;
  video.loop = true;
  video.muted = true;
  video.width = '720';
  video.controls= true;


  videos[i].parentNode.replaceChild(video, videos[i]);
  }
}



  var vid = document.getElementsByTagName("video");
  for(var i=0; i < vid.length; i++)
  {

  vid[i].onmouseover = vid[i].play;
  vid[i].onclick = vid[i].pause;

  }

}
window.onload = main;