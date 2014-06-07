// ==UserScript==
// @name        Tumblr: Hide 'Not Found' Background GIFs
// @namespace   Jason Tank/Druidic
// @description Get rid of the annoying full-page background GIFs on Tumblr 404 pages.
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @match       *://*.tumblr.com/*
// ==/UserScript==

$(document).ready(function() {
  if(document.title === "Not found.") {
    function killTheWabbit(BG, x) {
      BG.css("background-image", "none");
      if(x >= 0) {
        setTimeout(function() { killTheWabbit(BG, x - 100); }, 100);
      }
    }
    // Run for a full minute. Just to be REALLY safe.
    killTheWabbit($("div#fullscreen_post_bg"), 60000);
  }
});