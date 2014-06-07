// ==UserScript==
// @name           Shoutbox Auto Close
// @namespace      GreaseVZ
// @description    Schließt alle Shoutboxes automatisch anch 5 Sekunden
// @include        http://www.schuelervz.net/*
// ==/UserScript==        
//Let Things get started
jqueryCheck = setInterval(function() {
  if(typeof($ = unsafeWindow.jQuery) != "undefined") {
    clearInterval(jqueryCheck);
    setTimeout(function() {
      $(".obj-shoutbox").fadeOut(1000);   
    }, 500);
  }
}, 100);