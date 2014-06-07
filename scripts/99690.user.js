// ==UserScript==
// @name           reddit youtube frame remover
// @namespace      com.choibean.monkey.youtubeframe
// @description    remove frames from reddit youtube links, if you're using reddit toolbar
// @include        http://www.reddit.com/*
// ==/UserScript==

if ( top != self ) {
  var regex = /youtube.com|twitter.com|facebook.com|flickr.com|google.com/i;
  var frames = [];
  var frameElements = document.getElementsByTagName('frame');
  var length = frameElements.length;
  for (var i = 0; i < length; i++) {
    var frame = frameElements[i];
    console.log(frame, frame.document);
    if (frame.getAttribute('name') == 'reddit_link' && frame.src.split('/')[2].match(regex)) {
      GM_openInTab(frame.src);
    }
  }
}
