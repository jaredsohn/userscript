// ==UserScript==
// @name           4Chan /v/ music removal
// @namespace      And its GONE!
// @include        http://boards.4chan.org/v/*
// @match          http://boards.4chan.org/v/*
// @version        1.0
// ==/UserScript==


vids=document.getElementsByTagName('EMBED');

if (vids.length > 0) {
  vid=vids[0];
  if(vid.src.match(/http:\/\/www.youtube.com\//)) {
    vid.parentNode.removeChild(vid);
  }
}