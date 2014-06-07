// ==UserScript==
// @name           MegaUploadTimerKiller
// @namespace      zm
// @include        http://www.megaupload.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {

  if( unsafeWindow.countdown ){
  
    for(i=0; i<45; i++){
      unsafeWindow.countdown();
    }
  }

}, false);