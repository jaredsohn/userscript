// ==UserScript==
// @name           Nico Nico Seiga Fullsize Links
// @description    Adds direct links to fullsize images on image listing pages
// @author         Kapow
// @include        http://seiga.nicovideo.jp/*
// ==/UserScript==


var titles = document.getElementsByClassName("thumb_title");
for (var i=0; i<titles.length; i++) {
  var link = titles[i].firstChild
  var id = link.getAttribute("href").match(/im([0-9]+)/)[1]
  link.setAttribute("href", "/image/source?id="+id)
}
