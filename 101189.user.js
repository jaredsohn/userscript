// ==UserScript==
// @name           Youtube liked
// @namespace      utube
// @description    change inbox to liked
// @include        http://www.youtube.com/*
// ==/UserScript==


var links = document.getElementsByTagName("a");
  for (var i=0; i < links.length; i++) {
    if (links[i].className.match("yt-uix-button-menu-item") && links[i].getAttribute('href')== "/inbox?feature=mhum&folder=messages&action_message=1") {
      links[i].setAttribute('href','http://www.youtube.com/my_liked_videos');  //link hacia videos que me han gustado
	  links[i].innerHTML='Liked';     //nombre del link
    }
}
