// ==UserScript==
// @name           Chart Adapter
// @namespace      User
// @include        http://www.last.fm/user/*
// @include 	   http://www.lastfm.de/user/*
// @include 	   http://www.lastfm.*/user/*
// ==/UserScript== 





var links = document.querySelectorAll('.chartyear a');
for(var i = 0; i < links.length; i++) {
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);
  links[i].dispatchEvent(evt);
}


