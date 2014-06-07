// ==UserScript==
// @name           TPB access keys
// @namespace      user.squall@gmail.com
// @description    Adds HTML access keys ('n' - next; 'p' - previous) to TPB's torrent lists
// @include        http://thepiratebay.org/recent
// @include        http://thepiratebay.org/browse/*
// @include        http://thepiratebay.org/user/*
// ==/UserScript==

// version 0.1
// 2009/02/04

function scanDocument() {
  var links = document.links;
  var images = document.images;
  for (var i = 0; i < images.length; i++) {
    if (images[i].alt == "Previous") {
      images[i].parentNode.setAttribute("accesskey", "p");
    }
    if (images[i].alt == "Next") {
      images[i].parentNode.setAttribute("accesskey", "n");
    }
  }
}

// Start here
scanDocument();