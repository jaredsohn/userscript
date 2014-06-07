// ==UserScript==
// @name webm redirect
// @namespace webm-redirect
// @description Redirect 4chan webms to loopvid
// @version 0.2.0
// @include *://i.4cdn.org/*
// @include *://a.pomf.se/*
// ==/UserScript==

var url = document.location.toString();
if(url.match(/\.webm$|\.mp4$/)){
  if(document.title != '4chan - 404 Not Found'){
    window.location.replace("https://loopvid.appspot.com/?url=" + url);
  }
}