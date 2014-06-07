// ==UserScript==
// @name         SoundCloud Embedded Player - Hide Comments
// @description  On all websites, attempts to hide comments in embedded SoundCloud players.
// @namespace    Splark
// @copyright    Allosaurus 150my BCE
// @include      http*://*
// @version      1
// ==/UserScript==

function disableComments(tag) {
  var els = document.getElementsByTagName(tag);

  /* Pattern: contains "soundcloud.com/player", then maybe some stuff, then a "?", then maybe some stuff, then a "url=" */
  var scpatt = /soundcloud\.com\/player\S*\?\S*url=/gi;

  for (var i = 0; i < els.length; i++) {
    var srcatt = els[i].getAttribute("src");
	
    /* Check to see if the embed element is a soundcloud player */
    if ( scpatt.test(srcatt) ) {
      /* add the parameter to the URL to disable comments */
      els[i].setAttribute("src", srcatt + "&show_comments=false");
    }
  }
}

/* Run the function for these element names... if there are other ways of embedding a soundcloud player, they can be added here */
disableComments("iframe");
disableComments("embed");