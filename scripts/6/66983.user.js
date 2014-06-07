// ==UserScript==
// @name           add Nico search RSS
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/tag/*
// @include        http://www.nicovideo.jp/search/*
// ==/UserScript==
function evalInPage(fun) {
  location.href = "javascript:void (" + fun + ")()";
}
evalInPage(function() {

  var feed_path = "http://lab.nplll.com/ntag/";
  feed_path += window.q;
  
  // Make meta link in <head>
  var mkLink = document.createElement('link');
  mkLink.rel = "alternate";
  mkLink.type = "application/rss+xml";
  mkLink.href = feed_path;
  document.getElementsByTagName('head')[0].appendChild(mkLink);
})
