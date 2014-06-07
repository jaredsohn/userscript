// ==UserScript==
// @name           TrailerAddict Auto-HDPlus
// @version        1.1
// @namespace      http://ligature.me
// @description    Makes TrailerAddict links default to HDPlus quality
// @include        http://www.traileraddict.com/*
// @require        http://usocheckup.redirectme.net/86660.js
// ==/UserScript==

(function(){
  anchors = document.getElementsByTagName("a");
  for (lcv=0; lcv < anchors.length; lcv++) {
    if (anchors[lcv].href.indexOf("/trailer") > 0) {
      anchors[lcv].href += "/hdplus";
    }
  }
})();
