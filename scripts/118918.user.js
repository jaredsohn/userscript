// ==UserScript==
// @name           BetfairLiveVideoEvent
// @namespace      BetfairLiveVideoEvent
// @description    Lock event(Tennis) on betfair livevideo
// @include        http://livevideo.betfair.com/*
// ==/UserScript==

window.addEventListener('load', function(){

  var filter=document.getElementById("sportFilter");
  //Football=1, Tennis=2, Horse Racing=3, etc
  filter.selectedIndex = 2;
  writeClipsTables();

}, false);