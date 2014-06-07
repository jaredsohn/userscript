// ==UserScript==
// @name           Reddit light district
// @namespace      http://greasemonkey.jaredmcateer.com
// @description    Highlights NSFW labelled articles. (Slightly modified from Unit92's script. Only highlights the subreddit tag itself.)
// @include        http://*reddit.com/*
// ==/UserScript==

window.addEventListener("load", function(e){
  // Get all page div tags
  var links = document.getElementsByTagName("a")

  // Find the News Feed Section
  for (var i=0; i < links.length; i++){
    if (links[i].className.match(/hover/) &&
        links[i].innerHTML.match(/nsfw|NSFW/)) {
      links[i].style.color="red";
    }
  }
}, false)