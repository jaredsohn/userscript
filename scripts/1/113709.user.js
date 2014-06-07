// ==UserScript==
// @name           4chon gif animator
// @namespace      http://4chon.net/
// @description    makes the gifs on 4chon animate
// @include        http://4chon.net/*   https://4chon.net/*
// ==/UserScript==

var links=document.getElementsByTagName('a');
for(index = 0; index < links.length; index++) {
  var current_link = links[index];
  var link_href = current_link.href;
  if(current_link.target=='_blank' &&
     link_href.match(/gif$/)) {
    var thumbnail = current_link.childNodes[0];
    // makes the thumbnail use the gif in the link for its source.
    thumbnail.src = link_href;
  }
}
