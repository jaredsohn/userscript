// ==UserScript==
// @name           Peanut Gallery Buster: Youtube
// @namespace      shutupshutupshutup
// @description    If it's my tube, I don't want to see all the idiotic comments.
// @include        http://www.youtube.com/*
// ==/UserScript==

var commentDivs = ['recent_comments','commentsDiv','watch-comments-stats'];

for(var i = 0; i < commentDivs.length; i++) {
  var theDiv = document.getElementById(commentDivs[i]);
  if(theDiv) {
    theDiv.style.display = 'none';
  }
}

